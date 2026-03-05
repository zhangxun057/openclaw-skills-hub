'use client'

import { useState } from 'react'

export default function SearchBox() {
  const [query, setQuery] = useState('')

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="搜索技能..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            const cards = document.querySelectorAll('[data-skill-card]')
            cards.forEach((card) => {
              const text = card.textContent?.toLowerCase() || ''
              const match = text.includes(e.target.value.toLowerCase())
              ;(card as HTMLElement).style.display = match ? 'block' : 'none'
            })
          }}
          className="w-full pl-12 pr-4 py-4 bg-slate-900/50 backdrop-blur border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all"
        />
        <svg className="absolute left-4 top-4 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  )
}
