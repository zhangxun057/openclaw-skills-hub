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
        return { ...skill, description: 'No description' }
      }
    })
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold mb-4">
          OpenClaw <span className="text-orange-500">Skills Hub</span>
        </h1>
        <p className="text-xl text-gray-600">Hub for sharing OpenClaw skills</p>
      </div>
      <div className="max-w-6xl mx-auto px-4">
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
