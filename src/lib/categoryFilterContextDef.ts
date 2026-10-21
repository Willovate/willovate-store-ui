import { createContext } from 'react'

export interface CategoryFilterContextValue {
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
}

export const CategoryFilterContext = createContext<CategoryFilterContextValue>({
  selectedCategory: null,
  setSelectedCategory: () => {},
})

