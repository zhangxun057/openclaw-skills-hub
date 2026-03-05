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
        return { ...skill, description: '' }
      }
    })
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-orange-500/30">
              🦞
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            OpenClaw Skills Hub
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            发现、安装、分享 OpenClaw 技能 · 让 AI 助手更强大
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <a href="https://github.com/zhangxun057/openclaw-skills" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub 仓库
            </a>
            
            <div className="px-4 py-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700">
              <span className="text-slate-400 text-sm">共 </span>
              <span className="text-white font-bold text-lg">{skills.length}</span>
              <span className="text-slate-400 text-sm"> 个技能</span>
            </div>
          </div>
        </div>

        <SearchBox />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {skillsWithDesc.map((skill) => (
            <SkillCard key={skill.path} skill={skill} />
          ))}
        </div>
      </div>
    </main>
  )
}
