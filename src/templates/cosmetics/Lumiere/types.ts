import type { MarketplaceTemplate } from '../../../types'

export interface LumiereProduct {
  title: string
  price: string
  tag: string
  img: string
}

export interface LumiereStorefrontProps {
  template?: MarketplaceTemplate | null
  device?: 'desktop' | 'mobile' | 'fullscreen'
  customAccentColor?: string | null
  onColorChange?: (color: string) => void
  onUseTemplate?: (templateId: string) => void
  onClose?: () => void
}
