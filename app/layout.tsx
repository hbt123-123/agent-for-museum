import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "博物馆助手 - Museum Assistant",
  description: "博物馆智能导览助手，提供展品咨询和 AI 对话服务",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
