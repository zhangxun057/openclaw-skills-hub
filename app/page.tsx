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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">OpenClaw Skills Hub</h1>
          <p className="text-xl text-gray-600 mb-8">发现、下载、分享 OpenClaw 技能</p>
          <a href="https://github.com/zhangxun057/openclaw-skills" target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            GitHub 仓库
          </a>
        </div>

        <SearchBox />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {skillsWithDesc.map((skill) => (
            <SkillCard key={skill.path} skill={skill} />
          ))}
        </div>
      </div>
    </main>
  )
}