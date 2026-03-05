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

  const displayName = skill.name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold">🦞</div>
        <h3 className="font-semibold text-gray-800">{displayName}</h3>
      </div>

      <p className="text-gray-600 text-sm mb-4">{skill.description || 'No description'}</p>

      <div className="flex gap-2">
        <a href={`/skill/${encodeURIComponent(skill.path.replace('.md', ''))}`}
           className="flex-1 bg-orange-50 hover:bg-orange-100 text-orange-600 text-sm font-medium py-2 px-4 rounded-lg transition-colors text-center">
          View Details
        </a>

        <button onClick={handleDownload} disabled={isDownloading}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
          {isDownloading ? 'Downloading...' : 'Download'}
        </button>
      </div>
    </div>
  )
}