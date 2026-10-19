import { useState, useCallback } from 'react'

export function useHistory<T>(initialState: T) {
  const [history, setHistory] = useState<T[]>([initialState])
  const [currentIndex, setCurrentIndex] = useState(0)

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  const pushState = useCallback((newState: T) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, currentIndex + 1)
      newHistory.push(newState)
      // Keep only last 50 states
      if (newHistory.length > 50) {
        return newHistory.slice(newHistory.length - 50)
      }
      return newHistory
    })
    setCurrentIndex((prev) => Math.min(prev + 1, 49))
  }, [currentIndex])

  const undo = useCallback(() => {
    if (canUndo) {
      setCurrentIndex((prev) => prev - 1)
    }
  }, [canUndo])

  const redo = useCallback(() => {
    if (canRedo) {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [canRedo])

  return {
    state: history[currentIndex],
    pushState,
    undo,
    redo,
    canUndo,
    canRedo,
  }
}
