import { createContext } from 'react'
import type { TemplateConfig } from '../types/template'

export interface TemplateContextType {
  selectedTemplate: TemplateConfig | null
  setSelectedTemplate: (id: string) => void
}

export const TemplateContext = createContext<TemplateContextType | undefined>(undefined)
