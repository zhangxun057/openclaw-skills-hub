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
    <main className="min-h-screen relative overflow-hidden">
      {/* 背景 */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl flex items-center justify-center text-4xl shadow-2xl shadow-orange-500/50 transform hover:scale-110 transition-transform duration-300">
              🦞
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-orange-100 to-orange-200 bg-clip-text text-transparent tracking-tight">
            OpenClaw Skills
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto font-light">
            探索强大的 AI 技能库，让你的助手无所不能
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/zhangxun057/openclaw-skills" 
               target="_blank" 
               rel="noopener noreferrer"
               className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl font-bold text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub 仓库
              </span>
            </a>
            
            <div className="px-6 py-4 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-xl">
              <span className="text-slate-500 text-sm mr-2">共</span>
              <span className="text-white font-bold text-2xl">{skills.length}</span>
              <span className="text-slate-500 text-sm ml-2">个技能</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-16">
          <SearchBox />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsWithDesc.map((skill) => (
            <SkillCard key={skill.path} skill={skill} />
          ))}
        </div>
      </div>
    </main>
  )
}
