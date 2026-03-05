'use client'

import { useState, useMemo } from 'react'
import { Skill, getSkillVisual } from '@/lib/skills-data'
import SkillCard from '@/components/SkillCard'
import CategoryFilter from '@/components/CategoryFilter'

interface SkillsClientWrapperProps {
  skills: Skill[]
}

const categories = ['鍏ㄩ儴', 'AI鐢熸垚', '寰俊', '娴忚鍣?, '閮ㄧ讲', '宸ュ叿', '绠＄悊']

function categorizeSkill(skillName: string): string {
  const visual = getSkillVisual(skillName)
  const tags = visual.tags.map(t => t.toLowerCase())
  
  if (tags.some(t => ['ai缁樼敾', 'ai瑙嗛', '鍥惧儚鐢熸垚', '瑙嗛鐢熸垚', '鏁板瓧浜?, 'fl'].includes(t))) {
    return 'AI鐢熸垚'
  }
  if (tags.some(t => ['寰俊', 'wechat', 'weflow'].includes(t))) {
    return '寰俊'
  }
  if (tags.some(t => ['娴忚鍣?, '鑷姩鍖?, '鐖櫕'].includes(t))) {
    return '娴忚鍣?
  }
  if (tags.some(t => ['cloudflare', '閮ㄧ讲'].includes(t))) {
    return '閮ㄧ讲'
  }
  if (tags.some(t => ['绠＄悊', '鐩戞帶', '瀛樻。'].includes(t))) {
    return '绠＄悊'
  }
  return '宸ュ叿'
}

export default function SkillsClientWrapper({ skills }: SkillsClientWrapperProps) {
  const [activeCategory, setActiveCategory] = useState('鍏ㄩ儴')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchesCategory = activeCategory === '鍏ㄩ儴' || categorizeSkill(skill.name) === activeCategory
      const matchesSearch = searchQuery === '' || 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.description && skill.description.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesCategory && matchesSearch
    })
  }, [skills, activeCategory, searchQuery])

  return (
    <>
      {/* Search Box */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="鎼滅储鎶€鑳藉悕绉般€佸姛鑳芥弿杩?.."
              className="w-full px-6 py-4 pl-14 pr-6 text-gray-700 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-orange-300 focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-lg shadow-sm"
            />
            
            <svg 
              className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* Results Count */}
      <div className="mb-6 text-center">
        <span className="text-gray-500">
          鍏?<span className="font-semibold text-gray-700">{filteredSkills.length}</span> 涓妧鑳?          {searchQuery && <span> 鍖归厤 &quot;{searchQuery}&quot;</span>}
          {activeCategory !== '鍏ㄩ儴' && <span> 鍦?&quot;{activeCategory}&quot; 鍒嗙被</span>}
        </span>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <SkillCard key={skill.path} skill={skill} />
        ))}
      </div>

      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">馃攳</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">娌℃湁鎵惧埌鍖归厤鐨勬妧鑳?/h3>
          <p className="text-gray-500">璇曡瘯鍏朵粬鍏抽敭璇嶆垨鍒嗙被</p>
        </div>
      )}
    </>
  )
}
