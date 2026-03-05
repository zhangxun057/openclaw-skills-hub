'use client'

import { useState } from 'react'

export default function SearchBox() {
  const [query, setQuery] = useState('')

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
        
        <div className="relative">
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
            className="w-full pl-14 pr-6 py-5 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-lg shadow-xl"
          />
          <svg
            className="absolute left-5 top-5 w-6 h-6 text-slate-500"
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
  )
}
