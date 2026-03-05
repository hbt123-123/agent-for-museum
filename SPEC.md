# Museum Assistant - 博物馆介绍助手

## 1. Project Overview

**Project Name**: Museum Assistant  
**Type**: Web Application (Next.js 14 + AI Chat)  
**Core Functionality**: 博物馆展品图集浏览与智能问答助手  
**Target Users**: 博物馆访客、艺术爱好者、学生

---

## 2. UI/UX Specification

### Layout Structure

**Desktop (≥1024px)**:
- 左右分栏布局
- 左侧：聊天区域 (宽度 40%，最小 400px)
- 右侧：图集区域 (宽度 60%)

**Tablet (768px - 1023px)**:
- 左右分栏，比例调整为 45:55

**Mobile (<768px)**:
- 上下布局
- 顶部：图集区域（可折叠）
- 底部：聊天区域（固定高度）

### Visual Design

**Color Palette**:
- Background: `#0D0D0D` (深黑)
- Surface: `#1A1A1A` (卡片背景)
- Surface Elevated: `#252525` (输入框、悬停态)
- Primary Accent: `#D4AF37` (金色 - 博物馆典雅感)
- Primary Hover: `#E5C158`
- Text Primary: `#F5F5F5`
- Text Secondary: `#A0A0A0`
- Border: `#333333`
- Success: `#4ADE80`
- Error: `#F87171`

**Typography**:
- Headings: `Playfair Display` (典雅衬线体)
- Body: `Inter` (清晰易读)
- Sizes:
  - H1: 32px / 2rem
  - H2: 24px / 1.5rem
  - Body: 16px / 1rem
  - Small: 14px / 0.875rem

**Spacing System**:
- Base unit: 4px
- Component padding: 16px (4 units)
- Section gap: 24px (6 units)
- Card gap: 12px (3 units)

**Visual Effects**:
- Cards: `box-shadow: 0 4px 20px rgba(0,0,0,0.3)`
- Hover: scale(1.02) with 200ms ease transition
- Selected image: 2px solid #D4AF37 border
- Smooth scroll behavior

### Components

**1. Chat Area (左侧)**
- 标题栏：博物馆名称 + AI 图标
- 消息列表：滚动区域，显示用户/AI消息
- 消息气泡：
  - 用户消息：右对齐，金色背景
  - AI消息：左对齐，深灰背景
- 输入区域：
  - 文本输入框 (textarea，支持多行)
  - 发送按钮 (金色)
  - 附加上下文指示器 (当前附加的图片缩略图)

**2. Gallery Area (右侧)**
- 标题栏："展品图集"
- 搜索/筛选栏 (可选)
- 网格布局：3列 (desktop), 2列 (tablet), 2列 (mobile)
- 图片卡片：
  - 图片预览 (aspect-ratio: 1/1 或 4/3)
  - 悬停效果：放大 + 标题显现
  - 点击效果：选中态 (金色边框)

**3. Image Modal (大图查看)**
- 全屏遮罩
- 大图展示
- 关闭按钮
- 可选：图片描述信息

---

## 3. Functionality Specification

### Core Features

**F1: 固定图集浏览**
- 从 `public/images/` 目录加载静态图片
- 支持的图片格式: jpg, jpeg, png, webp
- 瀑布流/网格布局展示
- 点击图片放大查看
- 点击选中图片作为聊天上下文

**F2: 智能体对话**
- 流式输出 (streaming)
- 多模态理解 (可识别图片内容)
- 支持附加图片到对话
- 默认系统提示：博物馆助手，了解所有展品信息

**F3: 图片上下文附加**
- 点击图集中图片 → 附加到输入框
- 显示当前附加的图片缩略图
- 可清除附加的图片
- 附加图片时自动构建多模态消息

### User Interactions

1. **浏览图片**: 滚动图集，点击查看大图
2. **选择图片**: 点击图片，选中态，金色边框
3. **发送消息**: 输入文字 → 点击发送 或 按 Enter (Shift+Enter 换行)
4. **附加图片**: 点击图片后，图片信息带入输入框
5. **查看历史**: 滚动聊天记录

### Data Handling

**前端**:
- 图片列表：静态 import 或 glob 导入
- 聊天记录：React state (useState)
- 图片元数据：可配置的 JSON 文件

**后端 (API Route)**:
- `/api/chat`: 处理聊天请求
- 流式响应
- 调用 DashScope API (qwen3.5-plus)

### Edge Cases

- API key 未配置: 显示错误提示
- API 请求失败: 显示错误消息，提供重试
- 图片加载失败: 显示占位图
- 空消息: 禁用发送按钮
- 长消息: 自动滚动到底部

---

## 4. Technical Implementation

### API Integration

**DashScope API**:
- Endpoint: `https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions`
- Model: `qwen3.5-plus` (或 `qwen3.5-flash`)
- 支持多模态 (vision)

**Vercel AI SDK**:
- 使用 `ai` 包
- 自定义 provider 适配 DashScope

### Project Structure

```
museum-assistant/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       └── chat/
│           └── route.ts
├── components/
│   ├── ChatArea.tsx
│   ├── Gallery.tsx
│   ├── ImageModal.tsx
│   ├── MessageBubble.tsx
│   └── InputArea.tsx
├── lib/
│   ├── chat-config.ts
│   └── images.ts
├── public/
│   └── images/
│       └── [exhibit images]
├── package.json
├── tailwind.config.ts
├── next.config.js
└── .env.local
```

---

## 5. Acceptance Criteria

- [ ] Next.js 14 项目成功运行
- [ ] Tailwind CSS 样式正确应用
- [ ] 图集显示所有 public/images 中的图片
- [ ] 点击图片可查看大图
- [ ] 点击图片可选中并附加到聊天
- [ ] 聊天界面可发送消息
- [ ] AI 响应流式输出
- [ ] 支持多模态图片理解
- [ ] 响应式布局适配移动端
- [ ] 可部署到 Vercel
- [ ] 环境变量配置正确

---

## 6. Environment Variables

```
DASHSCOPE_API_KEY=your_dashscope_api_key
```

> 注意：API 密钥必须仅在后端 API 路由中使用
