import { useState, useEffect } from 'react'

const STORAGE_KEY = 'comparison_selected'
const MAX_SELECTED = 3

function loadFromStorage(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as string[]
  } catch {}
  return []
}

function saveToStorage(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {}
}

interface UseComparisonReturn {
  selected: string[]
  toggle: (id: string) => void
  remove: (id: string) => void
  clear: () => void
  isSelected: (id: string) => boolean
  isFull: boolean
}

export function useComparison(validIds: string[]): UseComparisonReturn {
  const [selected, setSelected] = useState<string[]>(() => {
    const stored = loadFromStorage()
    return stored.filter((id) => validIds.includes(id))
  })

  useEffect(() => {
    saveToStorage(selected)
  }, [selected])

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX_SELECTED) return prev
      return [...prev, id]
    })
  }

  const remove = (id: string) => {
    setSelected((prev) => prev.filter((x) => x !== id))
  }

  const clear = () => setSelected([])

  const isSelected = (id: string) => selected.includes(id)

  return {
    selected,
    toggle,
    remove,
    clear,
    isSelected,
    isFull: selected.length >= MAX_SELECTED,
  }
}
