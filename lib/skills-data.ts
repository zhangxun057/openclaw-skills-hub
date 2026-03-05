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
  },
  'ai-marketing-videos': {
    icon: '馃摴',
    color: 'from-orange-500 to-amber-600',
    gradient: 'bg-gradient-to-br from-orange-50 to-amber-100',
    tags: ['钀ラ攢', '鐭棰?, '鎵归噺鐢熸垚'],
    scene: '涓撲负钀ラ攢鍦烘櫙璁捐鐨?AI 瑙嗛鐢熸垚宸ュ叿锛屾壒閲忓埗浣滃甫璐ц棰?,
    capability: ['钀ラ攢瑙嗛', '鎵归噺鐢熸垚', '妯℃澘鍖栧埗浣?, '鑷姩閰嶉煶']
  },
  'ai-product-photography': {
    icon: '馃摳',
    color: 'from-cyan-500 to-teal-600',
    gradient: 'bg-gradient-to-br from-cyan-50 to-teal-100',
    tags: ['浜у搧鎽勫奖', 'AI淇浘', '鐢靛晢'],
    scene: 'AI 鐢熸垚涓撲笟绾т骇鍝佺収鐗囷紝鑳屾櫙鏇挎崲銆佸厜褰变紭鍖栥€佸満鏅惌寤?,
    capability: ['浜у搧鍥剧敓鎴?, '鑳屾櫙鏇挎崲', '鍏夊奖浼樺寲', '鍦烘櫙鎼缓']
  },
  'flux-image': {
    icon: '鉁?,
    color: 'from-violet-500 to-purple-600',
    gradient: 'bg-gradient-to-br from-violet-50 to-purple-100',
    tags: ['FLUX', '楂樿川閲?, '鍥惧儚鐢熸垚'],
    scene: '浣跨敤 FLUX 妯″瀷鐢熸垚楂樿川閲忓浘鍍忥紝缁嗚妭涓板瘜銆侀鏍煎鏍?,
    capability: ['FLUX妯″瀷', '楂樿川閲忚緭鍑?, '缁嗚妭涓板瘜', '椋庢牸鎺у埗']
  },
  'jimeng-digital-human': {
    icon: '馃懁',
    color: 'from-pink-500 to-rose-600',
    gradient: 'bg-gradient-to-br from-pink-50 to-rose-100',
    tags: ['鍗虫ⅵ', '鏁板瓧浜?, '鍙ｆ挱'],
    scene: '鍩轰簬鍗虫ⅵ OmniHuman锛屼竴寮犲浘鐗?涓€娈甸煶棰戠敓鎴愰€肩湡鏁板瓧浜哄彛鎾?,
    capability: ['鏁板瓧浜虹敓鎴?, '鍙ｆ挱瑙嗛', '鍔ㄤ綔鍚屾', '琛ㄦ儏鑷劧']
  },
  'remotion-render': {
    icon: '馃帪锔?,
    color: 'from-indigo-500 to-blue-600',
    gradient: 'bg-gradient-to-br from-indigo-50 to-blue-100',
    tags: ['Remotion', '绋嬪簭鍖栬棰?, 'React'],
    scene: '鐢?React 浠ｇ爜缂栧啓瑙嗛锛岀▼搴忓寲鐢熸垚楂樿川閲忚棰戝唴瀹?,
    capability: ['浠ｇ爜鐢熸垚瑙嗛', 'React缁勪欢', '绋嬪簭鍖栧埗浣?, '鏁版嵁椹卞姩']
  },
  'baoyu-post-to-wechat': {
    icon: '馃摑',
    color: 'from-lime-500 to-green-600',
    gradient: 'bg-gradient-to-br from-lime-50 to-green-100',
    tags: ['鐖嗘枃', '寰俊', '鑷姩鍙戝竷'],
    scene: '鎶撳彇鐖嗘枃鑷姩鍙戝竷鍒板井淇″叕浼楀彿锛屾敮鎸佸畾鏃躲€佸璐﹀彿绠＄悊',
    capability: ['鐖嗘枃鎶撳彇', '鑷姩鍙戝竷', '瀹氭椂浠诲姟', '澶氳处鍙?]
  },
  'wechat-send-message': {
    icon: '馃挰',
    color: 'from-green-400 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-50 to-emerald-100',
    tags: ['寰俊', '娑堟伅鍙戦€?, '鑷姩鍖?],
    scene: 'macOS 寰俊鑷姩鍙戦€佹秷鎭紝鏀寔鎵归噺鍙戦€併€佸畾鏃跺彂閫?,
    capability: ['鑷姩鍙戞秷鎭?, '鎵归噺鍙戦€?, '瀹氭椂鍙戦€?, '缇ょ鐞?]
  },
  'weflow': {
    icon: '馃摫',
    color: 'from-teal-400 to-cyan-500',
    gradient: 'bg-gradient-to-br from-teal-50 to-cyan-100',
    tags: ['WeFlow', '鑱婂ぉ璁板綍', '瀵煎嚭'],
    scene: '寰俊鑱婂ぉ璁板綍瀵煎嚭宸ュ叿锛屾敮鎸佹秷鎭€佸浘鐗囥€佽棰戙€佹枃浠舵壒閲忓鍑?,
    capability: ['鑱婂ぉ璁板綍瀵煎嚭', '澶氬獟浣撳浠?, '鏁版嵁鍒嗘瀽', '鏍煎紡杞崲']
  },
  'feishu': {
    icon: '馃搵',
    color: 'from-blue-400 to-indigo-500',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    tags: ['椋炰功', '鏂囨。', '澶氱淮琛ㄦ牸'],
    scene: '椋炰功鏂囨。銆佸缁磋〃鏍笺€佷簯鐩樻搷浣滆嚜鍔ㄥ寲锛屼紒涓氬崗浣滄晥鐜囨彁鍗?,
    capability: ['鏂囨。鎿嶄綔', '琛ㄦ牸绠＄悊', '鏂囦欢鍚屾', '鏉冮檺绠＄悊']
  },
  'cloudflare-deploy': {
    icon: '馃殌',
    color: 'from-orange-400 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-50 to-red-100',
    tags: ['Cloudflare', '閮ㄧ讲', 'CI/CD'],
    scene: '涓€閿儴缃茬綉绔欏埌 Cloudflare Pages锛岃嚜鍔ㄩ厤缃?GitHub Actions',
    capability: ['鑷姩閮ㄧ讲', 'CI/CD閰嶇疆', '鍩熷悕绠＄悊', '缂撳瓨浼樺寲']
  },
  'gateway-restart': {
    icon: '馃攧',
    color: 'from-gray-500 to-slate-600',
    gradient: 'bg-gradient-to-br from-gray-50 to-slate-100',
    tags: ['Gateway', '鏈嶅姟绠＄悊', '鏁呴殰鎭㈠'],
    scene: 'OpenClaw Gateway 鏈嶅姟閲嶅惎锛屽揩閫熸仮澶嶆祻瑙堝櫒銆佸伐鍏疯繛鎺?,
    capability: ['鏈嶅姟閲嶅惎', '鏁呴殰鎭㈠', '閰嶇疆閲嶈浇', '鐘舵€佹鏌?]
  },
  'browser-use': {
    icon: '馃枼锔?,
    color: 'from-sky-500 to-blue-600',
    gradient: 'bg-gradient-to-br from-sky-50 to-blue-100',
    tags: ['娴忚鍣?, 'AI浠ｇ悊', '鑷姩鍖?],
    scene: 'AI 浠ｇ悊鎿嶄綔娴忚鍣紝鍍忎汉涓€鏍锋祻瑙堢綉椤点€佸～鍐欒〃鍗曘€佹彁鍙栦俊鎭?,
    capability: ['AI娴忚鍣ㄤ唬鐞?, '鏅鸿兘鎿嶄綔', '淇℃伅鎻愬彇', '浠诲姟鎵ц']
  },
  'capability-evolver': {
    icon: '馃К',
    color: 'from-fuchsia-500 to-purple-600',
    gradient: 'bg-gradient-to-br from-fuchsia-50 to-purple-100',
    tags: ['杩涘寲', '鍏冩妧鑳?, '鑷敼杩?],
    scene: '鍒嗘瀽杩愯鍘嗗彶锛岃嚜鍔ㄦ彁鍙栧彲澶嶇敤鑳藉姏锛屾寔缁嚜鎴戣繘鍖?,
    capability: ['鑳藉姏鎻愬彇', '妯″紡璇嗗埆', '鑷垜杩涘寲', '鐭ヨ瘑绠＄悊']
  },
  'conversation-save': {
    icon: '馃捑',
    color: 'from-amber-500 to-yellow-600',
    gradient: 'bg-gradient-to-br from-amber-50 to-yellow-100',
    tags: ['瀛樻。', '瀵硅瘽璁板綍', '澶囦唤'],
    scene: '鑷姩淇濆瓨姣忔棩瀵硅瘽璁板綍鍒版湰鍦帮紝鏀寔鎼滅储銆佸洖椤俱€佸鍑?,
    capability: ['鑷姩瀛樻。', '瀵硅瘽鎼滅储', '鍘嗗彶鍥為【', '鏍煎紡瀵煎嚭']
  },
  'skill-creator': {
    icon: '馃洜锔?,
    color: 'from-red-500 to-rose-600',
    gradient: 'bg-gradient-to-br from-red-50 to-rose-100',
    tags: ['鎶€鑳藉紑鍙?, '妯℃澘', '鏈€浣冲疄璺?],
    scene: '鍒涘缓 OpenClaw 鎶€鑳界殑瀹屾暣鎸囧崡锛屾ā鏉裤€佽鑼冦€佺ず渚嬩竴搴斾勘鍏?,
    capability: ['鎶€鑳芥ā鏉?, '寮€鍙戣鑼?, '绀轰緥浠ｇ爜', '鏈€浣冲疄璺?]
  },
  'swap': {
    icon: '馃攣',
    color: 'from-emerald-500 to-teal-600',
    gradient: 'bg-gradient-to-br from-emerald-50 to-teal-100',
    tags: ['鎶€鑳戒氦鎹?, '鏂囦欢浼犺緭', '澶氳澶?],
    scene: '鍦ㄤ笉鍚?OpenClaw 瀹炰緥闂翠氦鎹㈡妧鑳芥枃浠讹紝璺ㄨ澶囨妧鑳藉叡浜?,
    capability: ['鎶€鑳戒氦鎹?, '鏂囦欢浼犺緭', '澶氳澶囧悓姝?, '鐗堟湰绠＄悊']
  },
  'task-monitor': {
    icon: '馃搱',
    color: 'from-cyan-500 to-blue-600',
    gradient: 'bg-gradient-to-br from-cyan-50 to-blue-100',
    tags: ['鐩戞帶', '浠诲姟绠＄悊', '浠〃鏉?],
    scene: '瀹炴椂鐩戞帶 OpenClaw 浠诲姟鐘舵€侊紝鍙鍖栦华琛ㄦ澘灞曠ず杩愯鐘舵€?,
    capability: ['瀹炴椂鐩戞帶', '浠诲姟杩借釜', '鍙鍖?, '鍛婅閫氱煡']
  },
  'agent-tools': {
    icon: '馃О',
    color: 'from-violet-400 to-indigo-500',
    gradient: 'bg-gradient-to-br from-violet-50 to-indigo-100',
    tags: ['AI宸ュ叿', '鎺ㄧ悊鏈嶅姟', '鍥惧儚瑙嗛'],
    scene: '150+ AI 搴旂敤涓€閿繍琛岋紝鍥惧儚鐢熸垚銆佽棰戝鐞嗐€丩LM 鎺ㄧ悊',
    capability: ['鍥惧儚鐢熸垚', '瑙嗛澶勭悊', 'LLM鎺ㄧ悊', '璇煶鍚堟垚']
  },
  'api-manager': {
    icon: '馃攽',
    color: 'from-yellow-500 to-amber-600',
    gradient: 'bg-gradient-to-br from-yellow-50 to-amber-100',
    tags: ['API绠＄悊', '瀵嗛挜绠＄悊', '鍑瘉'],
    scene: '缁熶竴绠＄悊 API 瀵嗛挜鍜屽嚟璇侊紝瀹夊叏瀛樺偍銆佸揩閫熸绱?,
    capability: ['瀵嗛挜绠＄悊', '瀹夊叏瀛樺偍', '鑷姩妫€绱?, '鏉冮檺鎺у埗']
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

export async function fetchSkillContent(downloadUrl: string): Promise<string> {
  const response = await fetch(downloadUrl, { next: { revalidate: 3600 } })
  
  if (!response.ok) {
    throw new Error('Failed to fetch skill content')
  }
  
  return response.text()
}

export function extractDescription(content: string): string {
  const frontmatterMatch = content.match(/description:\s*"([^"]+)"/)
  if (frontmatterMatch) {
    return frontmatterMatch[1].substring(0, 150) + (frontmatterMatch[1].length > 150 ? '...' : '')
  }
  
  const lines = content.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line && !line.startsWith('#') && !line.startsWith('---') && !line.startsWith('name:') && !line.startsWith('description:')) {
      return line.replace(/^[-*>]+\s*/, '').substring(0, 150) + '...'
    }
  }
  return '鏆傛棤鎻忚堪'
}

export function getSkillVisual(skillName: string): SkillVisual {
  const key = skillName.toLowerCase().replace(/\s+/g, '-')
  return skillVisuals[key] || {
    icon: '馃',
    color: 'from-orange-500 to-red-500',
    gradient: 'bg-gradient-to-br from-orange-50 to-red-100',
    tags: ['OpenClaw', '鎶€鑳?],
    scene: '涓€涓己澶х殑 OpenClaw 鎶€鑳?,
    capability: ['鑷姩鍖?, '鏁堢巼鎻愬崌']
  }
}
