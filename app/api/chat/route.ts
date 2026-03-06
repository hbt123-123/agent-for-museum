import { NextRequest, NextResponse } from "next/server";
import { chatConfig } from "@/lib/chat-config";

export async function POST(req: NextRequest) {
  try {
    const { messages, model = chatConfig.model } = await req.json();

    // Get API key from environment
    const apiKey = process.env.DASHSCOPE_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: "DASHSCOPE_API_KEY is not configured" },
        { status: 500 }
      );
    }

    // Build messages for DashScope API
    const systemMessage = {
      role: "system",
      content: chatConfig.systemPrompt
    };

    // Convert messages to DashScope format
    const formattedMessages = [
      systemMessage,
      ...messages.map((msg: { role: string; content: string; images?: string[] }) => {
        if (msg.images && msg.images.length > 0) {
          // Multimodal message with images
          return {
            role: msg.role,
            content: [
              { type: "text", text: msg.content },
              ...msg.images.map((img: string) => ({
                type: "image_url",
                image_url: { url: img }
              }))
            ]
          };
        }
        return {
          role: msg.role,
          content: msg.content
        };
      })
    ];

    // Call DashScope API with streaming
    const response = await fetch(
      `${chatConfig.apiBaseUrl}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: formattedMessages,
          temperature: chatConfig.temperature,
          max_tokens: chatConfig.maxTokens,
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DashScope API error:", errorText);
      return NextResponse.json(
        { error: `API error: ${response.status}` },
        { status: response.status }
      );
    }

    // Create a streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            // Process the stream data
            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split("\n").filter((line) => line.trim() !== "");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                  continue;
                }
                
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content || "";
                  if (content) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                    );
                  }
                } catch {
                  // Skip malformed JSON
                }
              }
            }
          }
        } catch (error) {
          console.error("Stream error:", error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
