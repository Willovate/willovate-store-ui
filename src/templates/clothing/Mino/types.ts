import type { MarketplaceTemplate } from '../../../types'

export interface MinoProduct {
  id: string
  title: string
  price: string
  compareAtPrice?: string
  tag: string
  img: string
  colors?: string[]
}

export interface MinoStorefrontProps {
  template?: MarketplaceTemplate | null
  device?: 'desktop' | 'mobile' | 'fullscreen'
  customAccentColor?: string | null
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
}
