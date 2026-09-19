import { createContext, useContext, useState, useEffect } from 'react'
import type { TemplateConfig } from '../types/template'
import { templates } from '../data/templates'

interface TemplateContextType {
  selectedTemplate: TemplateConfig | null
  setSelectedTemplate: (id: string) => void
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined)

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    return localStorage.getItem('willovate_selected_template') || 'template-01'
  })

  useEffect(() => {
    if (selectedId) {
      localStorage.setItem('willovate_selected_template', selectedId)
    }
  }, [selectedId])

  const selectedTemplate = templates.find(t => t.id === selectedId) || templates[0]

  return (
    <TemplateContext.Provider value={{ selectedTemplate, setSelectedTemplate: setSelectedId }}>
      {children}
    </TemplateContext.Provider>
  )
}

export function useTemplate() {
  const context = useContext(TemplateContext)
  if (!context) throw new Error('useTemplate must be used within TemplateProvider')
  return context
}

