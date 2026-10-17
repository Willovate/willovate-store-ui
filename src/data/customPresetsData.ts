import type { CategoryData, Template } from '../types'
import { ALL_SPORTS_MARKETPLACE_TEMPLATES } from './sportsTemplatesData'

export interface CustomPreset {
  keywords: string[]
  displayName: string
  badgeIcon: string
  description: string
  filterTags: string[]
  templates: Template[]
}

export const CUSTOM_PRESETS: CustomPreset[] = []

export function getCustomTemplatesForPrompt(_promptText: string): CategoryData {
  return {
    displayName: 'Sports Store',
    badgeIcon: '⚡',
    description: 'High-energy performance athletic wear, running shoes, and competition gear.',
    filterTags: ['All', 'Performance Sports', 'Athletic', 'Footwear'],
    templates: ALL_SPORTS_MARKETPLACE_TEMPLATES,
  }
}