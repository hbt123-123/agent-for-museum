export const chatConfig = {
  systemPrompt: `你是博物馆智能助手，专门为访客提供关于博物馆展品的咨询服务。

## 你的能力
1. 理解并分析图片内容 - 当用户发送展品图片时，你可以描述和解读
2. 回答关于博物馆藏品的问题
3. 提供艺术、历史和文化相关的知识
4. 讲解展品背后的故事和意义

## 展品图集
博物馆目前有以下展品可供咨询：
- 古代青铜器
- 陶瓷艺术品
- 书画作品
- 玉器
- 织绣品
- 金银器
- 漆器
- 石刻
- 木雕
- 文房四宝

## 回复要求
- 使用友好的语气
- 回答要准确、专业
- 如果不确定某些信息，请诚实说明
- 可以适当延伸相关知识
- 使用中文回复

请根据用户的问题，结合展品信息，提供有价值的回答。`,
  
  model: "qwen3.5-plus",
  
  temperature: 0.7,
  
  maxTokens: 2000,
  
  // DashScope API configuration
  apiBaseUrl: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  
  // Message role types
  roles: {
    system: "system",
    user: "user", 
    assistant: "assistant"
  } as const
};

export type MessageRole = "system" | "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  images?: string[]; // URLs of images attached to this message
}
