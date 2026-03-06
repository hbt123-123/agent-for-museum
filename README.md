# Museum Assistant - 中央革命根据地历史博物馆智能助手

基于 Next.js 14 和阿里云 DashScope API 的中央革命根据地历史博物馆展品智能问答助手。

## 功能特性

- **展品图集浏览** - 网格/瀑布流展示博物馆展品
- **AI 智能对话** - 基于 qwen3.5-plus 多模态大模型
- **图片理解能力** - AI 可理解展品图片内容
- **流式响应** - 实时流式输出，带来流畅体验
- **响应式设计** - 完美适配桌面端和移动端
- **一键部署** - 直接部署到 Vercel

## 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd museum-assistant
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

创建 `.env.local` 文件：

```env
DASHSCOPE_API_KEY=your_api_key_here
```

获取 API Key: [阿里云 DashScope 控制台](https://dashscope.console.aliyun.com/)

### 4. 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看。

## 添加展品图片

将图片放入 `public/images/` 目录，然后在 `lib/images.ts` 中添加对应的展品信息。

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 登录 [Vercel](https://vercel.com)
3. 导入 GitHub 仓库
4. 添加环境变量 `DASHSCOPE_API_KEY`
5. 部署

## 技术栈

- Next.js 14 (App Router)
- Tailwind CSS
- Vercel AI SDK
- 阿里云 DashScope (qwen3.5-plus)

## 项目结构

```
museum-assistant/
├── app/
│   ├── api/chat/route.ts   # AI 对话 API
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 主页面
│   └── globals.css         # 全局样式
├── components/
│   ├── ChatArea.tsx        # 聊天区域
│   ├── Gallery.tsx         # 图集区域
│   └── HomeClient.tsx      # 主组件
├── lib/
│   ├── chat-config.ts      # 聊天配置
│   └── images.ts           # 展品图片配置
├── public/images/          # 静态展品图片
└── .env.local              # 环境变量
```
