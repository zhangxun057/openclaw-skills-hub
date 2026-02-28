'use client'

import { useState } from 'react'

export default function SearchBox() {
  const [query, setQuery] = useState('')

  // Client-side search will be handled by filtering the DOM
  // In a real app, you might want to use a more sophisticated approach
  
  return (
    <div className="mb-8">
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="搜索技能..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            // Filter logic would go here
            const cards = document.querySelectorAll('[data-skill-card]')
            cards.forEach((card) => {
              const title = card.querySelector('h3')?.textContent?.toLowerCase() || ''
              const desc = card.querySelector('p')?.textContent?.toLowerCase() || ''
              const match = title.includes(e.target.value.toLowerCase()) || 
                           desc.includes(e.target.value.toLowerCase())
              ;(card as HTMLElement).style.display = match ? 'block' : 'none'
            })
          }}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
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
