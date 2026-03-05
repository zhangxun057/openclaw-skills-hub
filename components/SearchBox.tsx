'use client'

import { useState } from 'react'

export default function SearchBox() {
  const [query, setQuery] = useState('')

  return (
    <div className="mb-8">
      <div className="relative max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="搜索技能名称或描述..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            const cards = document.querySelectorAll('[data-skill-card]')
            cards.forEach((card) => {
              const title = card.querySelector('h3')?.textContent?.toLowerCase() || ''
              const desc = card.querySelector('p')?.textContent?.toLowerCase() || ''
              const match = title.includes(e.target.value.toLowerCase()) || 
                           desc.includes(e.target.value.toLowerCase())
              ;(card as HTMLElement).style.display = match ? 'block' : 'none'
            })
          }}
          className="w-full pl-12 pr-4 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
        />
        <svg
          className="absolute left-4 top-4 w-6 h-6 text-slate-500"
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
  )
}
