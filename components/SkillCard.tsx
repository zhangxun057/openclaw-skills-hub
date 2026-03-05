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
    <div data-skill-card className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 hover:border-orange-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            🦞
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-xl mb-2 group-hover:text-orange-400 transition-colors">{displayName}</h3>
            <div className="text-xs text-slate-600 font-mono truncate">{skill.name}</div>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3 min-h-[4.5rem]">
          {skill.description || '暂无描述'}
        </p>

        <div className="flex gap-3">
          <a href={`/skill/${encodeURIComponent(skill.path.replace('.md', ''))}`}
             className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-semibold py-3 px-5 rounded-xl transition-all text-center shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105">
            查看详情
          </a>

          <button onClick={handleDownload} disabled={isDownloading}
                  className="flex-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-semibold py-3 px-5 rounded-xl transition-all disabled:opacity-50 border border-slate-600 hover:border-slate-500 hover:scale-105">
            {isDownloading ? '下载中...' : '下载'}
          </button>
        </div>
      </div>
    </div>
  )
}
