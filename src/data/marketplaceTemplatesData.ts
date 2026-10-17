import type { MarketplaceTemplate } from '../types'
import { ALL_SPORTS_MARKETPLACE_TEMPLATES } from './sportsTemplatesData'

export const FLAGSHIP_MARKETPLACE_TEMPLATES: MarketplaceTemplate[] = [
  ...ALL_SPORTS_MARKETPLACE_TEMPLATES,
]

export function getAllMarketplaceTemplates(): MarketplaceTemplate[] {
  return FLAGSHIP_MARKETPLACE_TEMPLATES
}