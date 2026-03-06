# AGENTS.md - 开发者指南

本文档为 AI 代理提供在本项目中开发的标准指南。

## 项目概述

- **项目名称**: Museum Assistant (中央革命根据地历史博物馆智能助手)
- **技术栈**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Jest
- **主要功能**: 基于阿里云 DashScope API 的中央革命根据地历史博物馆展品智能问答助手

## 核心命令

### 开发与构建

```bash
# 开发服务器 (热重载)
npm run dev

# 生产构建
npm run build

# 生产启动
npm run start

# 代码检查
npm run lint
```

### 测试

```bash
# 运行所有测试
npm test

# 监听模式 (文件变化时重新运行)
npm run test:watch

# 运行单个测试文件
npm test -- sample.test.ts

# 运行单个测试用例
npm test -- --testNamePattern="测试名称"
```

## 代码规范

### TypeScript

- **严格模式**: 项目已启用 `strict: true`，必须显式声明类型
- **接口定义**: 使用 `interface` 而非 `type` 定义对象结构
- **类型推断**: 变量类型可推断时省略类型标注

```typescript
// ✅ 正确
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  images?: string[];
}

// ❌ 错误 - 禁止使用 any
const msg: any = ...
```

### 导入规范

- **路径别名**: 使用 `@/` 代替相对路径
- **顺序**: React → 外部库 → 内部组件/工具

```typescript
// 标准导入顺序
import { useState, useCallback } from "react";
import ChatArea from "@/components/ChatArea";
import { ExhibitImage, exhibitImages } from "@/lib/images";
```

### 组件规范

- **客户端组件**: 使用 `"use client"` 标记
- **函数式组件**: 使用箭头函数或函数声明
- **事件处理**: 使用 `useCallback` 包装

```typescript
"use client";

import { useState, useCallback } from "react";

export default function HomeClient() {
  const [state, setState] = useState<string>("");

  const handleClick = useCallback(() => {
    // 处理逻辑
  }, [dependencies]);

  return <div>...</div>;
}
```

### 命名约定

| 类型 | 规则 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `ChatArea.tsx`, `HomeClient.tsx` |
| 工具文件 | camelCase | `images.ts`, `chat-config.ts` |
| 接口 | PascalCase + 语义化后缀 | `ChatMessage`, `ExhibitImage` |
| 变量/函数 | camelCase | `handleSendMessage`, `exhibitImages` |
| 常量 | camelCase | `apiMessages` |

### Tailwind CSS

- **自定义颜色**: 使用设计系统颜色而非硬编码
- **响应式**: 移动优先 `mobile → lg: →`

```tsx
// ✅ 正确 - 使用设计系统颜色
<div className="bg-background text-text-primary">

// ❌ 错误 - 避免硬编码颜色
<div className="bg-[#0D0D0D]">
```

**可用设计变量**:
- 背景: `background`, `surface`, `surface-elevated`
- 文字: `text-primary`, `text-secondary`
- 强调: `primary`, `primary-hover`
- 状态: `success`, `error`, `border`

### 错误处理

- **异步操作**: 必须使用 try/catch
- **用户反馈**: 错误时提供友好提示
- **日志**: 使用 `console.error` 记录错误

```typescript
try {
  const response = await fetch("/api/chat", options);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  // 处理响应
} catch (error) {
  console.error("Chat error:", error);
  // 显示用户友好的错误信息
}
```

### 目录结构

```
├── app/                 # Next.js App Router 页面
│   ├── api/            # API 路由
│   ├── layout.tsx      # 根布局
│   ├── page.tsx        # 主页面
│   └── globals.css     # 全局样式
├── components/         # React 组件
├── lib/                # 工具函数和配置
├── public/images/      # 静态资源
├── __tests__/          # 测试文件
└── jest.setup.ts       # Jest 配置
```

### API 路由规范

- 使用 Next.js Route Handlers (`app/api/*/route.ts`)
- 遵循 REST 风格
- 返回 JSON 响应

```typescript
// app/api/chat/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // 处理逻辑
    return NextResponse.json({ data: ... });
  } catch (error) {
    return NextResponse.json(
      { error: "错误描述" },
      { status: 500 }
    );
  }
}
```

## 环境变量

创建 `.env.local` 文件:

```env
DASHSCOPE_API_KEY=your_api_key_here
```

## 测试规范

- **测试文件位置**: `__tests__/*.test.ts` 或 `*.test.tsx`
- **命名**: `组件名.test.tsx`
- **依赖**: `@testing-library/react`, `jest-environment-jsdom`

```typescript
import { render, screen } from "@testing-library/react";

describe("ComponentName", () => {
  it("should render correctly", () => {
    render(<ComponentName />);
    expect(screen.getByText("预期文本")).toBeInTheDocument();
  });
});
```

## Lint 检查

项目使用 ESLint + Next.js + TypeScript 配置:

```bash
# 运行 lint
npm run lint

# 自动修复
npm run lint -- --fix
```

## 注意事项

1. **禁止类型抑制**: 禁止使用 `as any`、`@ts-ignore`、`@ts-expect-error`
2. **严格空检查**: 启用 `strictNullChecks`，处理可能的 undefined
3. **图片路径**: 展品图片放 `public/images/`，在 `lib/images.ts` 中注册
4. **API Key**: 不要提交真实 API Key 到版本控制
