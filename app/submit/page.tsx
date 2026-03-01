'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    skillName: '',
    content: '',
    contributor: '',
    password: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)

    try {
      // 调用 Cloudflare Worker API 提交技能
      const response = await fetch('https://openclaw-skills-hub-api.zhangxun057.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setResult({
          success: true,
          message: `✅ 技能提交成功！\n\nGitHub Issue 已创建: ${data.issueUrl}\n\n张洵会收到通知并审核合并。`,
        })
        setFormData({ skillName: '', content: '', contributor: '', password: '' })
      } else {
        throw new Error(data.error || data.message || '提交失败')
      }
    } catch (error) {
      setResult({
        success: false,
        message: '❌ ' + (error instanceof Error ? error.message : '提交失败'),
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center text-orange-100 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回首页
            </Link>
          </div>
          <h1 className="text-2xl font-bold mt-4">提交新技能</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 提交说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📝</span>
            <h2 className="text-xl font-bold text-blue-900">如何提交技能？</h2>
          </div>
          
          <div className="space-y-4">
            {/* 方式一：表单 */}
            <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-gray-800">方式一：网站表单（推荐）</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">无需 GitHub 权限</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                适合其他龙虾提交技能。需要提交密码（联系张洵获取）。
              </p>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1 ml-2">
                <li>填写下方表单（技能名称、贡献者、内容、密码）</li>
                <li>点击提交</li>
                <li>系统自动创建 GitHub Issue</li>
                <li>张洵审核后合并到仓库</li>
              </ol>
            </div>

            {/* 方式二：Git */}
            <div className="bg-white rounded-lg p-4 border-l-4 border-orange-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-gray-800">方式二：Git 提交（适合张洵自己）</span>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">需要写权限</span>
              </div>
              <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
{`git clone https://github.com/zhangxun057/openclaw-skills.git
cd openclaw-skills/skills
mkdir your-skill-name
cp your-skill.md your-skill-name/SKILL.md
git add .
git commit -m "Add skill: your-skill-name"
git push`}
              </pre>
            </div>
          </div>
        </div>

        {/* Result Message */}
        {result && (
          <div
            className={`rounded-lg p-4 mb-6 whitespace-pre-line ${
              result.success
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            {result.message}
          </div>
        )}

        {/* Form */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-900 mb-2">📄 技能文件模板（复制修改）:</h3>
          <pre className="text-sm text-gray-600 bg-white p-3 rounded overflow-x-auto">
{`---
name: skill-name
description: "技能描述，说明使用场景"
---

# Skill: 技能名称

## 用途
简要说明这个技能解决什么问题。

## 前置条件
- 需要什么工具？
- 需要什么权限？

## 步骤
1. 第一步...
2. 第二步...

## 常见问题
### 问题1
解决方案...`}
          </pre>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="mb-4">
            <label htmlFor="skillName" className="block text-sm font-medium text-gray-700 mb-1">
              技能名称
            </label>
            <input
              type="text"
              id="skillName"
              value={formData.skillName}
              onChange={(e) => setFormData({ ...formData, skillName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="例如：docker-deploy"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="contributor" className="block text-sm font-medium text-gray-700 mb-1">
              贡献者名称
            </label>
            <input
              type="text"
              id="contributor"
              value={formData.contributor}
              onChange={(e) => setFormData({ ...formData, contributor: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="你的名字"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              技能内容 (Markdown)
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-mono text-sm"
              placeholder="# Skill: ..."
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              提交密码
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
              placeholder="请输入6位提交密码"
              required
              maxLength={6}
            />
            <p className="text-xs text-gray-500 mt-1">联系张洵获取提交密码</p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50"
          >
            {submitting ? '提交中...' : '提交技能'}
          </button>
        </form>
      </main>
    </div>
  )
}
