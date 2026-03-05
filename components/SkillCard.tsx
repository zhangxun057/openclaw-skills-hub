'use client'

import { Skill } from '@/lib/github'
import { useState } from 'react'

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

  const displayName = skill.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold">
            🦜
          </div>
          <h3 className="font-semibold text-gray-800 line-clamp-1">
            {displayName}
          </h3>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {skill.description || 'No description'}
      </p>

      <div class="flex gap-2">
        <a
          href={/home/}
          className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition text-center"
        >
          View
        </a>
        
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition disabled:opacity-50"
        >
          {isDownloading ? 'Downloading...' : 'Download'}
        </button>
      </div>
    </div>
  )
}
