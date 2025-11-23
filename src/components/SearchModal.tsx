'use client'

import { useState, useEffect, useRef } from 'react'
import { MdSearch, MdClose } from 'react-icons/md'
import { useRouter } from 'next/navigation'

interface Work {
  id: string
  title: string
  titleEn: string | null
  catalogNumber: string | null
  year: number | null
  genre: string | null
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<Work[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Search for works
  useEffect(() => {
    const searchWorks = async () => {
      if (searchQuery.trim().length === 0) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/works?search=${encodeURIComponent(searchQuery)}&limit=10`
        )
        if (response.ok) {
          const data = await response.json()
          setResults(data.data?.works || [])
          setSelectedIndex(0)
        }
      } catch (error) {
        console.error('Search failed:', error)
      } finally {
        setIsLoading(false)
      }
    }

    const debounce = setTimeout(searchWorks, 300)
    return () => clearTimeout(debounce)
  }, [searchQuery])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[selectedIndex]) {
        navigateToWork(results[selectedIndex].id)
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  const navigateToWork = (workId: string) => {
    router.push(`/works/${workId}`)
    onClose()
    setSearchQuery('')
    setResults([])
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm pt-20"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <MdSearch className="text-gray-400 text-2xl flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="작품 제목 또는 영문 제목 검색..."
            className="flex-1 outline-none text-lg placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <MdClose className="text-xl" />
            </button>
          )}
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading && (
            <div className="p-8 text-center text-gray-500">
              검색 중...
            </div>
          )}

          {!isLoading && searchQuery && results.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <ul className="divide-y divide-gray-100">
              {results.map((work, index) => (
                <li key={work.id}>
                  <button
                    onClick={() => navigateToWork(work.id)}
                    className={`w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors ${
                      index === selectedIndex ? 'bg-gray-50' : ''
                    }`}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {work.title}
                        </h3>
                        {work.titleEn && (
                          <p className="text-sm text-gray-600 truncate mt-0.5">
                            {work.titleEn}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {work.catalogNumber && (
                          <span className="text-sm text-gray-500 font-mono">
                            {work.catalogNumber}
                          </span>
                        )}
                        {work.year && (
                          <span className="text-sm text-gray-500">
                            {work.year}
                          </span>
                        )}
                      </div>
                    </div>
                    {work.genre && (
                      <p className="text-xs text-gray-500 mt-1">
                        {work.genre}
                      </p>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Search Tips */}
          {!searchQuery && (
            <div className="p-8 text-center text-gray-500 text-sm">
              <p>작품의 한글 제목 또는 영문 제목으로 검색하세요</p>
              <p className="mt-2 text-xs text-gray-400">
                화살표 키로 이동, Enter로 선택, ESC로 닫기
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
