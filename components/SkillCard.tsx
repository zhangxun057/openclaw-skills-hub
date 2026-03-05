'use client'

import { useState } from 'react'

interface Skill {
  name: string
  path: string
  download_url: string
  description?: string
}

interface SkillCardProps {
  skill: Skill
}

// Skill metadata for visuals
const skillVisuals: Record<string, {icon: string, color: string, gradient: string, tags: string[], scene: string, capability: string[]}> = {
  'wechat-analyzer': {
    icon: '馃搳',
    color: 'from-green-500 to-emerald-600',
    gradient: 'bg-gradient-to-br from-green-50 to-emerald-100',
    tags: ['寰俊', '鏁版嵁鍒嗘瀽', '瀹㈡埛鐢诲儚'],
    scene: '涓€閿鍑哄井淇″ソ鍙嬨€佽亰澶╄褰曪紝AI 娣卞害鍒嗘瀽绀句氦鍏崇郴缃?,
    capability: ['濂藉弸鍒嗘瀽', '鑱婂ぉ缁熻', '鏈嬪弸鍦堝鍑?, '鏅鸿兘鏍囩']
  },
  'browser-automation': {
    icon: '馃寪',
    color: 'from-blue-500 to-indigo-600',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    tags: ['娴忚鍣?, '鑷姩鍖?, '鐖櫕'],
    scene: '妯℃嫙鐪熶汉鎿嶄綔娴忚鍣紝鑷姩鐐瑰嚮銆佽緭鍏ャ€佹埅鍥俱€佹姄鍙栫綉椤靛唴瀹?,
    capability: ['缃戦〉鎴浘', '鑷姩鐐瑰嚮', '琛ㄥ崟濉啓', '鏁版嵁鎶撳彇']
  },
  'ai-image-generation': {
    icon: '馃帹',
    color: 'from-purple-500 to-pink-600',
    gradient: 'bg-gradient-to-br from-purple-50 to-pink-100',
    tags: ['AI缁樼敾', '鍥惧儚鐢熸垚', 'FLUX'],
    scene: '鐢ㄦ枃瀛楁弿杩扮敓鎴愮簿缇庡浘鐗囷紝鏀寔 FLUX銆丟rok銆丟emini 绛?50+ 妯″瀷',
    capability: ['鏂囩敓鍥?, '椋庢牸杩佺Щ', '鎵归噺鐢熸垚', '楂樻竻杈撳嚭']
  },
  'ai-video-generation': {
    icon: '馃幀',
    color: 'from-rose-500 to-red-600',
    gradient: 'bg-gradient-to-br from-rose-50 to-red-100',
    tags: ['AI瑙嗛', '瑙嗛鐢熸垚', '鏁板瓧浜?],
    scene: 'AI 鐢熸垚瑙嗛鍐呭锛屽浘鐗?闊抽鑷姩鐢熸垚鍙ｆ挱鏁板瓧浜?,
    capability: ['瑙嗛鐢熸垚', '鏁板瓧浜?, '鍙ｆ挱鍚堟垚', '鎵归噺鍒朵綔']
  }
}

function getSkillVisual(skillName: string) {
  const key = skillName.toLowerCase().replace(/\s+/g, '-')
  return skillVisuals[key] || {
    icon: '馃',
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-50 to-red-100',
    tags: ['OpenClaw'],
    scene: skill.description || '涓€涓己澶х殑 OpenClaw 鎶€鑳?,
    capability: ['鑷姩鍖?, '鏁堢巼鎻愬崌']
  }
}

export default function SkillCard({ skill }: SkillCardProps) {
  const [isDownloading, setIsDownloading] = useState(false)
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
    <div className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-lg ${visual.gradient}`}>
      <div className={`h-2 bg-gradient-to-r ${visual.color}`} />
      
      <div className="p-6">
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
        </div>

        <div className="mb-4">
          <p className="text-gray-700 text-sm leading-relaxed">
            {visual.scene}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {visual.capability.slice(0, 3).map((cap, idx) => (
            <span key={idx} className="text-xs px-2 py-1 rounded-lg bg-white/60 text-gray-700 font-medium">
              {cap}
            </span>
          ))}
        </div>

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
            className="flex-1 bg-white/80 hover:bg-white text-gray-700 text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 border border-gray-200 hover:border-gray-300 disabled:opacity-50"
          >
            {isDownloading ? '涓嬭浇涓?..' : '涓嬭浇'}
          </button>
        </div>
      </div>
    </div>
  )
}
