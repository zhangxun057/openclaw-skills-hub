'use client'

interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
}

const categoryColors: Record<string, string> = {
  '鍏ㄩ儴': 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  'AI鐢熸垚': 'bg-purple-100 text-purple-700 hover:bg-purple-200',
  '寰俊': 'bg-green-100 text-green-700 hover:bg-green-200',
  '娴忚鍣?: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
  '閮ㄧ讲': 'bg-orange-100 text-orange-700 hover:bg-orange-200',
  '宸ュ叿': 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200',
  '绠＄悊': 'bg-amber-100 text-amber-700 hover:bg-amber-200',
}

export default function CategoryFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeCategory === category
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
              : categoryColors[category] || 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    惆瞗iv>
  )
}
