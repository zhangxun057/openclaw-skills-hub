'use client'

import { useState } from 'react'
import { Skill } from '@/lib/github'

interface SkillCardProps {
  skill: Skill
}

export default function SkillCard({ skill }: SkillCardProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch(skill.download_url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = skill.path
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } finally {
      setIsDownloading(false)
    }
  }

  const displayName = skill.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return (
    <div data-skill-card className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-6 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
          🦞
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-lg mb-1 truncate">{displayName}</h3>
          <div className="text-xs text-slate-500">{skill.name}</div>
        </div>
      </div>

      <p className="text-slate-400 text-sm mb-6 line-clamp-3 min-h-[3.6rem]">
        {skill.description || '暂无描述'}
      </p>

      <div className="flex gap-2">
        <a href={`/skill/${encodeURIComponent(skill.path.replace('.md', ''))}`}
           className="flex-1 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-sm font-medium py-2.5 px-4 rounded-lg transition-all text-center border border-orange-500/20 hover:border-orange-500/40">
          查看详情
        </a>

        <button onClick={handleDownload} disabled={isDownloading}
                className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-sm font-medium py-2.5 px-4 rounded-lg transition-all disabled:opacity-50 border border-slate-600 hover:border-slate-500">
          {isDownloading ? '下载中...' : '下载'}
        </button>
      </div>
    </div>
  )
}
