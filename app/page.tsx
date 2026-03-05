import { fetchSkills, extractDescription } from '@/lib/skills-data'
import SkillsClientWrapper from '@/components/SkillsClientWrapper'
import Link from 'next/link'

export const revalidate = 3600

export default async function Home() {
  const skills = await fetchSkills()
  
  const skillsWithDesc = await Promise.all(
    skills.map(async (skill) => {
      try {
        const response = await fetch(skill.download_url, { next: { revalidate: 3600 } })
        const content = await response.text()
        return { ...skill, description: extractDescription(content) }
      } catch {
        return { ...skill, description: '鏆傛棤鎻忚堪' }
      }
    })
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 via-red-400/5 to-purple-400/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-300/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-2xl transform rotate-3">
              <span className="text-4xl">馃</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
              OpenClaw
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Skills Hub</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-4">
              寮犳吹鐨勫榫欒櫨鎶€鑳藉叡浜腑蹇?            </p>
            
            <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
              鍙戠幇銆佷笅杞姐€佸垎浜?OpenClaw 鎶€鑳姐€備粠 AI 鐢熸垚鍒板井淇¤嚜鍔ㄥ寲锛?              <br className="hidden md:block" />
              璁╂瘡涓緳铏鹃兘鑳藉揩閫熻幏寰楀己澶ц兘鍔涖€?            </p>
            
            <div className="flex justify-center gap-8 md:gap-16 mb-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900">{skills.length}</div>
                <div className="text-sm text-gray-500 mt-1">鍙敤鎶€鑳?/div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900">7</div>
                <div className="text-sm text-gray-500 mt-1">鍒嗙被</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900">1</div>
                <div className="text-sm text-gray-500 mt-1">鍛戒护瀹夎</div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://github.com/zhangxun057/openclaw-skills"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub 浠撳簱
              </Link>
              
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                鎻愪氦鎶€鑳?              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            鎶€鑳藉競鍦?          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            姣忎釜鎶€鑳介兘閰嶆湁鍙鍖栨弿杩帮紝涓€鐪肩湅鎳傝兘鍋氫粈涔堛€?            鐐瑰嚮涓嬭浇鑾峰彇 .skill 鏂囦欢锛岀敤 npx clawhub install 瀹夎銆?          </p>
        </div>

        <SkillsClientWrapper skills={skillsWithDesc} />
      </section>

      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">濡備綍浣跨敤</h2>
            <p className="text-gray-400">绠€鍗曚笁姝ワ紝蹇€熶笂鎵?/p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-2xl">
                1锔忊儯
              </div>
              <h3 className="text-xl font-semibold mb-3">娴忚 & 閫夋嫨</h3>
              <p className="text-gray-400">
                娴忚鎶€鑳藉崱鐗囷紝闃呰浣跨敤鍦烘櫙鎻忚堪锛屾壘鍒颁綘闇€瑕佺殑鎶€鑳?              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-2xl">
                2锔忊儯
              </div>
              <h3 className="text-xl font-semibold mb-3">涓嬭浇鎶€鑳芥枃浠?/h3>
              <p className="text-gray-400">
                鐐瑰嚮涓嬭浇鎸夐挳鑾峰彇 .skill 鏂囦欢锛屾垨鐐瑰嚮鏌ョ湅璇︽儏闃呰鏂囨。
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-2xl">
                3锔忊儯
              </div>
              <h3 className="text-xl font-semibold mb-3">瀹夎 & 浣跨敤</h3>
              <p className="text-gray-400">
                杩愯 npx clawhub install xxx.skill 瀹夎锛屽紑濮嬩娇鐢?              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 mb-2">
            漏 2026 寮犳吹鐨勫榫欒櫨鎶€鑳藉叡浜腑蹇?          </p>
          <p className="text-sm text-gray-500">
            鐢?OpenClaw 寮哄姏椹卞姩 馃
          </p>
        </div>
      </footer>
    </main>
  )
}
