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

const skillData: Record<string, {icon: string, color: string, tags: string[], scene: string, caps: string[]}> = {
  'wechat-analyzer': {
    icon: '馃搳',
    color: 'from-green-500 to-emerald-600',
    tags: ['寰俊', '鏁版嵁鍒嗘瀽'],
    scene: '涓€閿鍑哄井淇″ソ鍙嬨€佽亰澶╄褰曪紝AI娣卞害鍒嗘瀽绀句氦鍏崇郴缃?,
    caps: ['濂藉弸鍒嗘瀽', '鑱婂ぉ缁熻', '鏈嬪弸鍦堝鍑?]
  },
  'browser-automation': {
    icon: '馃寪',
    color: 'from-blue-500 to-indigo-600',
    tags: ['娴忚鍣?, '鑷姩鍖?],
    scene: '妯℃嫙鐪熶汉鎿嶄綔娴忚鍣紝鑷姩鐐瑰嚮銆佽緭鍏ャ€佹埅鍥俱€佹姄鍙栫綉椤?,
    caps: ['缃戦〉鎴浘', '鑷姩鐐瑰嚮', '鏁版嵁鎶撳彇']
  },
  'ai-image-generation': {
    icon: '馃帹',
    color: 'from-purple-500 to-pink-600',
    tags: ['AI缁樼敾', '鍥惧儚鐢熸垚'],
    scene: '鐢ㄦ枃瀛楁弿杩扮敓鎴愮簿缇庡浘鐗囷紝鏀寔FLUX銆丟emini绛?0+妯″瀷',
    caps: ['鏂囩敓鍥?, '椋庢牸杩佺Щ', '鎵归噺鐢熸垚']
  },
  'ai-video-generation': {
    icon: '馃幀',
    color: 'from-rose-500 to-red-600',
    tags: ['AI瑙嗛', '鏁板瓧浜?],
    scene: 'AI鐢熸垚瑙嗛鍐呭锛屽浘鐗?闊抽鑷姩鐢熸垚鍙ｆ挱鏁板瓧浜?,
    caps: ['瑙嗛鐢熸垚', '鏁板瓧浜?, '鍙ｆ挱鍚堟垚']
  },
  'ai-marketing-videos': {
    icon: '馃摴',
    color: 'from-orange-500 to-amber-600',
    tags: ['钀ラ攢', '鐭棰?],
    scene: '涓撲负钀ラ攢鍦烘櫙璁捐锛屾壒閲忓埗浣滃甫璐ц棰?,
    caps: ['钀ラ攢瑙嗛', '鎵归噺鐢熸垚', '鑷姩閰嶉煶']
  },
  'ai-product-photography': {
    icon: '馃摳',
    color: 'from-cyan-500 to-teal-600',
    tags: ['浜у搧鎽勫奖', '鐢靛晢'],
    scene: 'AI鐢熸垚涓撲笟绾т骇鍝佺収鐗囷紝鑳屾櫙鏇挎崲銆佸厜褰变紭鍖?,
    caps: ['浜у搧鍥?, '鑳屾櫙鏇挎崲', '鍏夊奖浼樺寲']
  },
  'flux-image': {
    icon: '鉁?,
    color: 'from-violet-500 to-purple-600',
    tags: ['FLUX', '楂樿川閲?],
    scene: '浣跨敤FLUX妯″瀷鐢熸垚楂樿川閲忓浘鍍忥紝缁嗚妭涓板瘜銆侀鏍煎鏍?,
    caps: ['FLUX妯″瀷', '楂樻竻杈撳嚭', '椋庢牸鎺у埗']
  },
  'jimeng-digital-human': {
    icon: '馃懁',
    color: 'from-pink-500 to-rose-600',
    tags: ['鍗虫ⅵ', '鏁板瓧浜?],
    scene: '鍩轰簬鍗虫ⅵOmniHuman锛屽浘鐗?闊抽鐢熸垚閫肩湡鏁板瓧浜?,
    caps: ['鏁板瓧浜?, '鍙ｆ挱瑙嗛', '鍔ㄤ綔鍚屾']
  },
  'remotion-render': {
    icon: '馃帪锔?,
    color: 'from-indigo-500 to-blue-600',
    tags: ['Remotion', '绋嬪簭鍖?],
    scene: '鐢≧eact浠ｇ爜缂栧啓瑙嗛锛岀▼搴忓寲鐢熸垚楂樿川閲忓唴瀹?,
    caps: ['浠ｇ爜鐢熸垚瑙嗛', 'React缁勪欢', '鏁版嵁椹卞姩']
  },
  'baoyu-post-to-wechat': {
    icon: '馃摑',
    color: 'from-lime-500 to-green-600',
    tags: ['鐖嗘枃', '寰俊'],
    scene: '鎶撳彇鐖嗘枃鑷姩鍙戝竷鍒板井淇″叕浼楀彿锛屾敮鎸佸畾鏃躲€佸璐﹀彿',
    caps: ['鐖嗘枃鎶撳彇', '鑷姩鍙戝竷', '瀹氭椂浠诲姟']
  },
  'wechat-send-message': {
    icon: '馃挰',
    color: 'from-green-400 to-emerald-500',
    tags: ['寰俊', '娑堟伅鍙戦€?],
    scene: 'macOS寰俊鑷姩鍙戦€佹秷鎭紝鏀寔鎵归噺銆佸畾鏃跺彂閫?,
    caps: ['鑷姩鍙戞秷鎭?, '鎵归噺鍙戦€?, '瀹氭椂鍙戦€?]
  },
  'weflow': {
    icon: '馃摫',
    color: 'from-teal-400 to-cyan-500',
    tags: ['WeFlow', '鑱婂ぉ璁板綍'],
    scene: '寰俊鑱婂ぉ璁板綍瀵煎嚭锛屾敮鎸佹秷鎭€佸浘鐗囥€佽棰戞壒閲忓鍑?,
    caps: ['鑱婂ぉ瀵煎嚭', '澶氬獟浣撳浠?, '鏍煎紡杞崲']
  },
  'feishu': {
    icon: '馃搵',
    color: 'from-blue-400 to-indigo-500',
    tags: ['椋炰功', '鏂囨。'],
    scene: '椋炰功鏂囨。銆佸缁磋〃鏍笺€佷簯鐩樻搷浣滆嚜鍔ㄥ寲',
    caps: ['鏂囨。鎿嶄綔', '琛ㄦ牸绠＄悊', '鏂囦欢鍚屾']
  },
  'cloudflare-deploy': {
    icon: '馃殌',
    color: 'from-orange-400 to-red-500',
    tags: ['Cloudflare', '閮ㄧ讲'],
    scene: '涓€閿儴缃茬綉绔欏埌Cloudflare Pages锛岃嚜鍔ㄩ厤缃瓹I/CD',
    caps: ['鑷姩閮ㄧ讲', 'CI/CD', '鍩熷悕绠＄悊']
  },
  'gateway-restart': {
    icon: '馃攧',
    color: 'from-gray-500 to-slate-600',
    tags: ['Gateway', '鏈嶅姟绠＄悊'],
    scene: 'OpenClaw Gateway鏈嶅姟閲嶅惎锛屽揩閫熸仮澶嶆祻瑙堝櫒杩炴帴',
    caps: ['鏈嶅姟閲嶅惎', '鏁呴殰鎭㈠', '鐘舵€佹鏌?]
  },
  'capability-evolver': {
    icon: '馃К',
    color: 'from-fuchsia-500 to-purple-600',
    tags: ['杩涘寲', '鍏冩妧鑳?],
    scene: '鍒嗘瀽杩愯鍘嗗彶锛岃嚜鍔ㄦ彁鍙栧彲澶嶇敤鑳藉姏锛屾寔缁嚜鎴戣繘鍖?,
    caps: ['鑳藉姏鎻愬彇', '妯″紡璇嗗埆', '鐭ヨ瘑绠＄悊']
  },
  'conversation-save': {
    icon: '馃捑',
    color: 'from-amber-500 to-yellow-600',
    tags: ['瀛樻。', '瀵硅瘽璁板綍'],
    scene: '鑷姩淇濆瓨姣忔棩瀵硅瘽璁板綍鍒版湰鍦帮紝鏀寔鎼滅储銆佸洖椤?,
    caps: ['鑷姩瀛樻。', '瀵硅瘽鎼滅储', '鍘嗗彶鍥為【']
  },
  'skill-creator': {
    icon: '馃洜锔?,
    color: 'from-red-500 to-rose-600',
    tags: ['鎶€鑳藉紑鍙?, '妯℃澘'],
    scene: '鍒涘缓OpenClaw鎶€鑳界殑瀹屾暣鎸囧崡锛屾ā鏉裤€佽鑼冦€佺ず渚?,
    caps: ['鎶€鑳芥ā鏉?, '寮€鍙戣鑼?, '鏈€浣冲疄璺?]
  },
  'swap': {
    icon: '馃攣',
    color: 'from-emerald-500 to-teal-600',
    tags: ['鎶€鑳戒氦鎹?, '鏂囦欢浼犺緭'],
    scene: '鍦ㄤ笉鍚孫penClaw瀹炰緥闂翠氦鎹㈡妧鑳芥枃浠讹紝璺ㄨ澶囧叡浜?,
    caps: ['鎶€鑳戒氦鎹?, '鏂囦欢浼犺緭', '澶氳澶囧悓姝?]
  },
  'task-monitor': {
    icon: '馃搱',
    color: 'from-cyan-500 to-blue-600',
    tags: ['鐩戞帶', '浠诲姟绠＄悊'],
    scene: '瀹炴椂鐩戞帶OpenClaw浠诲姟鐘舵€侊紝鍙鍖栦华琛ㄦ澘',
    caps: ['瀹炴椂鐩戞帶', '浠诲姟杩借釜', '鍙鍖?]
  },
  'agent-tools': {
    icon: '馃О',
    color: 'from-violet-400 to-indigo-500',
    tags: ['AI宸ュ叿', '鎺ㄧ悊鏈嶅姟'],
    scene: '150+ AI搴旂敤涓€閿繍琛岋紝鍥惧儚鐢熸垚銆佽棰戝鐞嗐€丩LM',
    caps: ['鍥惧儚鐢熸垚', '瑙嗛澶勭悊', '璇煶鍚堟垚']
  },
  'wechat-analyzer-weflow': {
    icon: '馃搳',
    color: 'from-green-500 to-emerald-600',
    tags: ['寰俊', '鏁版嵁鍒嗘瀽'],
    scene: '寰俊濂藉弸鑷姩鍖栧垎鏋愪笌妗ｆ鐢熸垚宸ュ叿',
    caps: ['濂藉弸鍒嗘瀽', '妗ｆ鐢熸垚', '鏁版嵁瀵煎嚭']
  }
}

function getVisual(name: string) {
  const key = name.toLowerCase().replace(/\s+/g, '-')
  return skillData[key] || {
    icon: '馃',
    color: 'from-orange-500 to-red-500',
    tags: ['OpenClaw'],
    scene: '涓€涓己澶х殑OpenClaw鎶€鑳?,
    caps: ['鑷姩鍖?, '鏁堢巼鎻愬崌']
  }
}

export default function SkillCard({ skill }: SkillCardProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const v = getVisual(skill.name)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const res = await fetch(skill.download_url)
      const blob = await res.blob()
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
    <div className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-lg bg-gradient-to-br from-white to-gray-50`}>
      <div className={`h-1.5 bg-gradient-to-r ${v.color}`} />
      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center text-2xl shadow-md`}>
            {v.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-800 text-base leading-tight truncate">{displayName}</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {v.tags.map((t, i) => (
                <span key={i} className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 leading-relaxed">{v.scene}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {v.caps.map((c, i) => (
            <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-lg">{c}</span>
          ))}
        </div>

        <div className="flex gap-2">
          <a href={`/skill/${encodeURIComponent(skill.path.replace('.md', ''))}`}
             className={`flex-1 bg-gradient-to-r ${v.color} text-white text-sm font-semibold py-2 px-3 rounded-lg text-center hover:opacity-90 transition-opacity`}>
            璇︽儏
          </a>
          <button onClick={handleDownload} disabled={isDownloading}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold py-2 px-3 rounded-lg transition-colors disabled:opacity-50">
            {isDownloading ? '...' : '涓嬭浇'}
          </button>
        </div>
      </div>
    </div>
  )
}
