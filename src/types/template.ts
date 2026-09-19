export interface TemplateCategory {
  id: string
  name: string
}

export interface StoreMenuFeature {
  id: string
  label: string
  description?: string
  icon?: string
  action?: string
}

export interface TemplateStyleTag {
  id: string
  name: string
}

export interface TemplateSectionConfig {
  id: string
  type: string
  props: Record<string, any>
}

export interface TemplateTheme {
  fonts: {
    heading: string
    body: string
  }
  colors: {
    primary: string
    background: string
    accent: string
    [key: string]: string
  }
}

export interface TemplateConfig {
  id: string
  name: string
  description: string
  categories: TemplateCategory[]
  tags: TemplateStyleTag[]
  thumbnailUrl: string
  previewImages: string[]
  isFeatured: boolean
  theme: TemplateTheme
  sections: TemplateSectionConfig[]
  navigation?: { label: string; href: string }[]
  features?: StoreMenuFeature[]
}
