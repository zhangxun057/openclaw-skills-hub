'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    skillName: '',
    content: '',
    contributor: '',
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
        setFormData({ skillName: '', content: '', contributor: '' })
      } else {
        throw new Error(data.error || '提交失败')
      }
    } catch (error) {
      setResult({
        success: false,
        message: '❌ 提交失败: ' + (error instanceof Error ? error.message : '未知错误') + '\n\n请检查网络连接，或通过 GitHub 直接提交。',
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
        {/* Alternative Methods */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">📝 如何提交技能？</h2>
          <div className="space-y-3 text-blue-800">
            <p>
              <strong>方式一：填写下方表单（推荐，30秒完成）</strong>
            </p>
            <p>
              填写技能名称、贡献者姓名、技能内容，点击提交即可。
              系统会自动创建 GitHub Issue，张洵会收到通知并审核。
            </p>
            <p>
              <strong>方式二：通过 GitHub 提交</strong>
            </p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>
                Fork 
                <a
                  href="https://github.com/zhangxun057/openclaw-skills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-medium"
                >
                  GitHub 仓库
                </a>
              </li>
              <li>在 <code>skills/</code> 目录下创建你的技能文件夹</li>
              <li>提交 Pull Request</li>
            </ol>
          </div>
        </div>

        {/* Result Message */}
        {result && (
          <div
            className={`rounded-lg p-4 mb-6 ${
              result.success
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
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
              placeholder="例如：GitHub CLI 登录"
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

          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              技能内容 (Markdown)
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={15}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none font-mono text-sm"
              placeholder="# Skill: ..."
              required
            />
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
