import { useContext } from 'react'
import { TemplateContext } from '../lib/templateContextDef'
import type { TemplateContextType } from '../lib/templateContextDef'

export function useTemplate(): TemplateContextType {
  const context = useContext(TemplateContext)
  if (!context) {
    throw new Error('useTemplate must be used within TemplateProvider')
  }
  return context
}
