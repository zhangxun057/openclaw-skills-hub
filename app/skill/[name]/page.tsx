import { notFound } from 'next/navigation'
import Link from 'next/link'
import { fetchSkills, fetchSkillContent } from '@/lib/github'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

interface SkillPageProps {
  params: {
    name: string
  }
}

export async function generateStaticParams() {
  // 硬编码技能列表以确保静态生成成功
  return [
    { name: 'gateway-restart' },
    { name: 'browser-automation' },
    { name: 'cloudflare-deploy' },
  ]
}

export default async function SkillPage({ params }: SkillPageProps) {
  const skills = await fetchSkills()
  const skillName = decodeURIComponent(params.name)
  
  const skill = skills.find((s) => s.path === `${skillName}/SKILL.md`)
  
  if (!skill) {
    notFound()
  }

  const content = await fetchSkillContent(skill.download_url)
  
  // Convert markdown to HTML
  const processedContent = await remark()
    .use(gfm)
    .use(html)
    .process(content)
  
  const contentHtml = processedContent.toString()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回列表
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Title Bar */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🦞</span>
                <h1 className="text-xl font-bold">
                  {skill.name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </h1>
              </div>
              
              <a
                href={skill.download_url}
                download={skill.path}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition text-sm font-medium"
              >
                下载技能文件
              </a>
            </div>
          </div>

          {/* Markdown Content */}
          <div
            className="prose prose-slate max-w-none p-6"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </article>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-500">
        <p>© 2026 张洵的龙虾团队 | OpenClaw Skills Hub</p>
      </footer>
    </main>
  )
}
