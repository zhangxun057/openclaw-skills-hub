import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OpenClaw Skills Hub - 龙虾技能共享中心',
  description: '张洵的多龙虾技能共享平台，查看和下载 OpenClaw 技能',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}
