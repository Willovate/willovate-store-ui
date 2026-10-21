import { useState, useEffect } from 'react'
import { templates } from '../data/templates'
import { TemplateContext } from './templateContextDef'
export type { TemplateContextType } from './templateContextDef'

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const saved = localStorage.getItem('willovate_selected_template')
    if (saved && templates.some(t => t.id === saved)) {
      return saved
    }
    return 'template-01'
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


