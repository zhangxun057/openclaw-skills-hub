'use client'

interface SkillCardProps {
  skill: {
    name: string
    desc: string
  }
}

export default function SkillCard({ skill }: SkillCardProps) {
  const displayName = skill.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return (
    <div data-skill-card className="group relative bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/10">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform">
          🦞
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-lg mb-1 group-hover:text-orange-400 transition-colors">{displayName}</h3>
          <div className="text-xs text-slate-600 font-mono truncate">{skill.name}</div>
        </div>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 min-h-[2.5rem]">
        {skill.desc}
      </p>

      <div className="flex gap-3">
        <a href={`https://github.com/zhangxun057/openclaw-skills/tree/master/skills/${skill.name}`}
           target="_blank"
           className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all text-center">
          查看
        </a>
        <button onClick={() => window.open(`https://raw.githubusercontent.com/zhangxun057/openclaw-skills/master/skills/${skill.name}/SKILL.md`)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold py-2.5 px-4 rounded-xl transition-all border border-slate-700">
          下载
        </button>
      </div>
    </div>
  )
}
