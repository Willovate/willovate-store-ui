// ============================================================
// GAMEDAY THEME — TYPES
// Stadium Fan | Jerseys | Match Day
// ============================================================

export type GameDaySport = 'football' | 'cricket' | 'basketball' | 'tennis' | 'running'

export type GameDayCategory = 'jersey' | 'fan-gear' | 'footwear' | 'accessories' | 'collections'

export type GameDayKitEdition = 'home' | 'away' | 'third' | 'limited'

export interface GameDayProductColor {
  name: string
  hex: string
  image?: string
}

export interface GameDayProduct {
  id: string
  name: string
  sport: GameDaySport
  category: GameDayCategory
  kitEdition?: GameDayKitEdition
  price: number
  compareAtPrice?: number
  image: string
  hoverImage: string
  badge?: string
  rating: number
  reviewCount: number
  inStock: boolean
  isNew?: boolean
  isLimited?: boolean
  isTrending?: boolean
  isMatchDay?: boolean
  teamName?: string
  playerName?: string
  playerNumber?: string
  sizes: string[]
  colors: GameDayProductColor[]
  description: string
  features: string[]
  canCustomize?: boolean
}

export interface GameDaySportCategory {
  id: GameDaySport
  name: string
  tagline: string
  image: string
  itemCount: string
  badge?: string
}

export interface GameDayFanEssential {
  id: string
  name: string
  image: string
  itemCount: string
  tag?: string
}

export interface GameDayMatchStory {
  id: string
  title: string
  excerpt: string
  image: string
  tag: string
  readTime: string
  author: string
  date: string
}

export interface GameDayFanReview {
  id: string
  author: string
  avatar: string
  team: string
  rating: number
  quote: string
  matchAttended?: string
  verified: boolean
}

export interface GameDayCartItem {
  product: GameDayProduct
  quantity: number
  selectedSize: string
  selectedColor: GameDayProductColor
  customName?: string
  customNumber?: string
}

export interface GameDayMegaMenuColumn {
  heading: string
  links: { label: string; sport?: GameDaySport; category?: GameDayCategory; badge?: string }[]
}

export interface GameDayMegaMenu {
  title: string
  columns: GameDayMegaMenuColumn[]
  featured?: {
    title: string
    subtitle: string
    image: string
    tag: string
  }
}
