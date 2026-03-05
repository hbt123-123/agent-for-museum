"use client";

import { useState, useCallback } from "react";
import ChatArea from "@/components/ChatArea";
import Gallery from "@/components/Gallery";
import { ExhibitImage, exhibitImages } from "@/lib/images";
import { chatConfig } from "@/lib/chat-config";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  images?: string[];
}

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ExhibitImage | null>(null);

  // Build image context for AI
  const buildImageContext = useCallback(() => {
    return exhibitImages
      .map((img) => `【${img.title}】图片路径: ${img.src} - ${img.description || ""}`)
      .join("\n");
  }, []);

  // Send message to API
  const handleSendMessage = useCallback(
    async (content: string, images?: string[]) => {
      if (!content.trim() && !images) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content,
        images,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setSelectedImage(null);

      try {
        // Build messages for API (include image context in first message if no images attached)
        const apiMessages = messages.length === 0
          ? [
              {
                role: "system",
                content: `${chatConfig.systemPrompt}\n\n展品图片列表:\n${buildImageContext()}`,
              },
            ]
          : [];

        const conversationMessages = messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
          images: msg.images,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...apiMessages, ...conversationMessages, userMessage],
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        // Handle streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let assistantContent = "";

        // Add empty assistant message
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "",
          },
        ]);

        while (reader) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  assistantContent += parsed.content;
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    const lastMsg = newMessages[newMessages.length - 1];
                    if (lastMsg && lastMsg.role === "assistant") {
                      lastMsg.content = assistantContent;
                    }
                    return newMessages;
                  });
                }
              } catch {
                // Skip malformed JSON
              }
            }
          }
        }
      } catch (error) {
        console.error("Chat error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "抱歉，我现在无法回答您的问题。请稍后重试。",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, buildImageContext]
  );

  // Handle image selection from gallery
  const handleImageSelect = useCallback((image: ExhibitImage) => {
    setSelectedImage(image);
  }, []);

  // Clear selected image
  const handleClearSelectedImage = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row h-screen lg:h-[calc(100vh-64px)]">
        {/* Chat Area - Left */}
        <div className="w-full lg:w-2/5 h-1/2 lg:h-full border-r border-border">
          <ChatArea
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            selectedImage={selectedImage}
            onClearSelectedImage={handleClearSelectedImage}
          />
        </div>

        {/* Gallery Area - Right */}
        <div className="w-full lg:w-3/5 h-1/2 lg:h-full">
          <Gallery
            onImageSelect={handleImageSelect}
            selectedImageId={selectedImage?.id}
          />
        </div>
      </div>

      {/* Mobile Toggle (optional enhancement) */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button className="w-14 h-14 rounded-full bg-primary text-black shadow-lg flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
