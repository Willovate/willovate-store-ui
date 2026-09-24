import type { MarketplaceTemplate } from '../../../types'

export interface AureliaStorefrontProps {
  template?: MarketplaceTemplate
  device?: 'desktop' | 'mobile' | 'fullscreen'
  customAccentColor?: string
  onUseTemplate?: (template: MarketplaceTemplate) => void
}

export interface AureliaProduct {
  id: string
  title: string
  price: string
  tag: string
  img: string
}

export interface AureliaValueProp {
  icon: string
  title: string
  sub: string
}
