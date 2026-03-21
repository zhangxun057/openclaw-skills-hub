'use client'

interface SkillCardProps {
  skill: {
    name: string
    desc: string
    icon: string
    source: string
  }
}

const sourceColors: Record<string, string> = {
  '官方': 'from-blue-500 to-blue-600',
  '飞书官方': 'from-blue-400 to-blue-600',
  'Vercel官方': 'from-black to-slate-800',
  '原创': 'from-orange-500 to-red-600',
  '社区': 'from-slate-600 to-slate-700',
  'github': 'from-gray-700 to-gray-900',
  '虾评Skill': 'from-pink-500 to-rose-600',
  'clawhub': 'from-cyan-500 to-blue-600',
  '开源社区': 'from-purple-500 to-indigo-600',
};

const sourceBadgeColors: Record<string, string> = {
  '官方': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  '飞书官方': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Vercel官方': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  '原创': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  '社区': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  'github': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  '虾评Skill': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  'clawhub': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  '开源社区': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

export default function SkillCard({ skill }: SkillCardProps) {
  const displayName = skill.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const gradient = sourceColors[skill.source] || 'from-slate-600 to-slate-700';
  const badgeColor = sourceBadgeColors[skill.source] || 'bg-slate-500/10 text-slate-400 border-slate-500/20';

  return (
    <div data-skill-card className="group relative bg-slate-900/40 backdrop-blur border border-slate-800 rounded-2xl p-5 hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/10">
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-11 h-11 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
          {skill.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-base mb-1 group-hover:text-orange-400 transition-colors truncate">{displayName}</h3>
          <span className={`inline-block px-2 py-0.5 rounded text-xs border ${badgeColor}`}>
            {skill.source}
          </span>
        </div>
      </div>

      <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
        {skill.desc}
      </p>

      <div className="flex gap-2">
        <a href={`https://github.com/zhangxun057/openclaw-skills/tree/master/skills/${skill.name}`}
           target="_blank"
           className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-all text-center">
          查看
        </a>
        <button onClick={() => window.open(`https://raw.githubusercontent.com/zhangxun057/openclaw-skills/master/skills/${skill.name}/SKILL.md`)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold py-2 px-3 rounded-lg transition-all border border-slate-700">
          下载
        </button>
      </div>
    </div>
  )
}
