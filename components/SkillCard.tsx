'use client'

import { Skill, SkillVisual, getSkillVisual } from '@/lib/skills-data'
import { useState } from 'react'

interface SkillCardProps {
  skill: Skill
}

export default function SkillCard({ skill }: SkillCardProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const visual = getSkillVisual(skill.name)

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

  const displayName = skill.name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <div 
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isHovered ? 'transform -translate-y-1 shadow-2xl' : 'shadow-lg'
      } ${visual.gradient}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Color Bar */}
      <div className={`h-2 bg-gradient-to-r ${visual.color}`} />
      
      <div className="p-6">
        {/* Header with Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${visual.color} flex items-center justify-center text-3xl shadow-lg transform transition-transform duration-300 group-hover:scale-110`}>
              {visual.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg leading-tight">
                {displayName}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{visual.tags[0]}</p>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 justify-end max-w-[100px]">
            {visual.tags.slice(1, 3).map((tag, idx) => (
              <span 
                key={idx}
                className="text-xs px-2 py-0.5 bg-white/60 backdrop-blur-sm rounded-full text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Scene Description - The Visual Story */}
        <div className="mb-4">
          <p className="text-gray-700 text-sm leading-relaxed">
            {visual.scene}
          </p>
        </div>

        {/* Capabilities */}
        <div className="flex flex-wrap gap-2 mb-5">
          {visual.capability.slice(0, 3).map((cap, idx) => (
            <span 
              key={idx}
              className={`text-xs px-2 py-1 rounded-lg bg-gradient-to-r ${visual.color} bg-opacity-10 text-gray-700 font-medium`}
              style={{ background: 'rgba(255,255,255,0.6)' }}
            >
              鉁?{cap}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <a
            href={`/skill/${encodeURIComponent(skill.path.replace('.md', ''))}`}
            className={`flex-1 bg-gradient-to-r ${visual.color} text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:opacity-90 text-center`}
          >
            鏌ョ湅璇︽儏
          </a>
          
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 disabled:opacity-50"
          >
            {isDownloading ? '涓嬭浇涓?..' : '涓嬭浇'}
          </button>
        </div>
      </div>
      
      {/* Hover Glow Effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${visual.color} opacity-0 transition-opacity duration-300 pointer-events-none`}
        style={{ opacity: isHovered ? 0.05 : 0 }}
      />
    </div>
  )
}
