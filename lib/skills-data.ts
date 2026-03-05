// Skill metadata with visual descriptions and icons
export interface Skill {
  name: string
  path: string
  download_url: string
  content?: string
  description?: string
}

export interface SkillVisual {
  icon: string
  color: string
  gradient: string
  tags: string[]
  scene: string
  capability: string[]
}

// Visual metadata for each skill
export const skillVisuals: Record<string, SkillVisual> = {
  'wechat-analyzer': {
    icon: '📊',
    color: 'from-green-500 to-emerald-600',
    gradient: 'bg-gradient-to-br from-green-50 to-emerald-100',
    tags: ['微信', '数据分析', '客户画像'],
    scene: '一键导出微信好友、聊天记录，AI 深度分析社交关系网',
    capability: ['好友分析', '聊天统计', '朋友圈导出', '智能标签']
  },
  'browser-automation': {
    icon: '🌐',
    color: 'from-blue-500 to-indigo-600',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    tags: ['浏览器', '自动化'],
    scene: '空础期度取的浏览器，自动点击、输入、截盾、抓取 单飁 API，高消值点击于物徇 Kimi性理自动重设运行内容',
    capability: ['反行截图', '启动评组图承']
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  const response = await fetch(
    'https://api.github.com/repos/zhangxun057/openclaw-skills/contents/skills',
    { next: { revalidate: 3600 } }
  )
  
  if (!response.ok) {
    throw new Error('Failed to fetch skills')
  }
  
  const items = await response.json()
  
  const skillDirs = items.filter((item: any) => item.type === 'dir')
  
  return skillDirs.map((dir: any) => ({
    name: dir.name.replace(/-/g, ' '),
    path: `${dir.name}/SKILL.md`,
    download_url: `https://raw.githubusercontent.com/zhangxun057/openclaw-skills/master/skills/${dir.name}/SKILL.md`,
  }))
}

(asert: export const a: 1}