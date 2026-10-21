import { useContext } from 'react'
import { CategoryFilterContext, type CategoryFilterContextValue } from '../lib/categoryFilterContextDef'

export function useCategoryFilter(): CategoryFilterContextValue {
  return useContext(CategoryFilterContext)
}
