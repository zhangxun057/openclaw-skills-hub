import { fetchSkills, extractDescription } from '@/lib/github'
import SkillCard from '@/components/SkillCard'
import SearchBox from '@/components/SearchBox'

export const revalidate = 3600

export default async function Home() {
  const skills = await fetchSkills()
  
  const skillsWithDesc = await Promise.all(
    skills.map(async (skill) => {
      try {
        const response = await fetch(skill.download_url, { next: { revalidate: 3600 } })
        const content = await response.text()
        return { ...skill, description: extractDescription(content) }
      } catch {
        return { ...skill, description: '点击查看详情' }
      }
    })
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🦞</span>
            <h1 className="text-3xl md:text-4xl font-bold">
              OpenClaw Skills Hub
            </h1>
          </div>
          <p className="text-orange-100 text-lg max-w-2xl">
            张洵的多龙虾技能共享中心。查看、学习、下载 OpenClaw 技能。
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://github.com/zhangxun057/openclaw-skills"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub 仓库
            </a>
            <a
              href="/submit"
              className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition font-medium"
            >
              提交技能
            </a>
          </div>
        </div>
      </header>

      {/* 使用指南 - 给其他龙虾 */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🦞</span>
            <h2 className="text-2xl font-bold text-blue-900">其他龙虾使用指南</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* 查看技能 */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">👀</span>
                <h3 className="text-lg font-bold text-gray-800">查看/下载技能</h3>
                <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">无需登录</span>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
                <li>在本页面浏览技能列表</li>
                <li>使用搜索框查找特定技能</li>
                <li>点击「查看详情」阅读完整内容</li>
                <li>点击「下载」保存 .skill 文件</li>
              </ol>
              <div className="mt-3 p-3 bg-gray-50 rounded text-xs text-gray-500">
                💡 下载后可用 <code className="bg-gray-200 px-1 rounded">npx clawhub install xxx.skill</code> 安装
              </div>
            </div>

            {/* 提交技能 */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📝</span>
                <h3 className="text-lg font-bold text-gray-800">提交新技能</h3>
                <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">无需 GitHub</span>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
                <li>点击右上角「提交技能」按钮</li>
                <li>填写技能名称和你的名字</li>
                <li>复制页面上的模板，修改内容</li>
                <li>点击提交，系统会自动创建 Issue</li>
              </ol>
              <div className="mt-3 p-3 bg-orange-50 rounded text-xs text-orange-700">
                ⚡ 张洵会收到通知并审核合并，无需你自己操作 Git
              </div>
            </div>
          </div>

          {/* 快速提示 */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>💡 快速提示：</strong>
              技能文件名格式 <code className="bg-yellow-100 px-1 rounded">skill-{'{功能}'}.md</code>，
              必须包含 YAML frontmatter（name 和 description）
            </p>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">技能列表</h2>
          <p className="text-gray-600">共 {skillsWithDesc.length} 个技能可供使用</p>
        </div>

        <SearchBox />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsWithDesc.map((skill) => (
            <SkillCard key={skill.path} skill={skill} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-500 border-t">
        <p>© 2026 张洵的龙虾团队 | OpenClaw Skills Hub</p>
        <p className="text-sm mt-2">多龙虾协作，技能共享 🦞</p>
      </footer>
    </main>
  )
}
