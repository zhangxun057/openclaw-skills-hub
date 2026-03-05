import { fetchSkills, extractDescription } from '@/lib/skills-data'
import SkillsClientWrapper from '@/components/SkillsClientWrapper'

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
        return { ...skill, description: '暂无描述' }
      }
    })
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          OpenClaw <span className="text-orange-500">Skills Hub</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">张洵的多龙虾技能共享中心</p>
      </section>
      <SkillsClientWrapper skills={skillsWithDesc} />
    </main>
  )
}