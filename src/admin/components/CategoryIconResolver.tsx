import type { ReactNode } from 'react'

/**
 * Resolves the appropriate icon identifier from a category string or full breadcrumb path.
 * Hierarchical: splits by '>' or '/' and inspects from the most specific leaf node up to root.
 */
export function getCategoryIconName(categoryPath?: string): string {
  if (!categoryPath || !categoryPath.trim()) return 'package'

  const normalized = categoryPath.toLowerCase()

  // 1. Specific leaf checks first (Most specific -> General)
  // Shoes & Footwear
  if (
    /\b(shoe|shoes|sneaker|sneakers|boot|boots|sandal|sandals|slipper|slippers|footwear|heels|loafers)\b/.test(
      normalized,
    )
  ) {
    return 'shoe'
  }

  // Bags, Handbags & Luggage
  if (
    /\b(bag|bags|handbag|handbags|tote|totes|backpack|backpacks|clutch|clutches|wallet|wallets|crossbody|purse|purses|luggage)\b/.test(
      normalized,
    )
  ) {
    return 'bag'
  }

  // Jewelry
  if (
    /\b(jewelry|jewellery|ring|rings|necklace|necklaces|earring|earrings|bracelet|bracelets|pendant|gemstone|diamond)\b/.test(
      normalized,
    )
  ) {
    return 'jewelry'
  }

  // Watches
  if (
    /\b(watch|watches|smartwatch|smartwatches|timepiece)\b/.test(normalized)
  ) {
    return 'watch'
  }

  // Clothing / Apparel
  if (
    /\b(t-shirt|t-shirts|shirt|shirts|polo|tank|blouse|hoodie|hoodies|sweater|sweaters|tunic|crop top|top|tops|clothing|apparel|dress|dresses|jacket|jackets|coat|coats|blazer|blazers|suit|suits|activewear|swimwear|sleepwear|underwear|socks|jeans|trousers|pants|shorts|skirts|leggings|sweatpants)\b/.test(
      normalized,
    )
  ) {
    return 'shirt'
  }

  // Electronics & Devices
  if (
    /\b(electronic|electronics|phone|phones|mobile|computer|computers|laptop|laptops|audio|headphone|headphones|camera|cameras|tablet|tablets|wearable|wearables|gaming|tv|smarthome|gadget|gadgets)\b/.test(
      normalized,
    )
  ) {
    return 'laptop'
  }

  // Beauty, Personal Care & Cosmetics
  if (
    /\b(beauty|personal care|cosmetics|makeup|skincare|haircare|fragrance|perfume|cologne|bath|body|lipstick)\b/.test(
      normalized,
    )
  ) {
    return 'sparkles'
  }

  // Home & Garden
  if (
    /\b(home|garden|furniture|homedecor|decor|bedding|kitchen|dining|lighting|patio|storage)\b/.test(
      normalized,
    )
  ) {
    return 'home'
  }

  // Sports & Recreation
  if (
    /\b(sport|sports|recreation|fitness|exercise|gym|outdoor|cycling|teamsports|watersports|workout)\b/.test(
      normalized,
    )
  ) {
    return 'sports'
  }

  // Toys & Games
  if (
    /\b(toy|toys|game|games|action figure|action-figures|board game|board-games|doll|dolls|plush|puzzle|puzzles|educational)\b/.test(
      normalized,
    )
  ) {
    return 'gamepad'
  }

  // Food & Beverages
  if (
    /\b(food|beverage|beverages|snack|snacks|pantry|coffee|tea|sweet|sweets|chocolate|grocery|drink|drinks)\b/.test(
      normalized,
    )
  ) {
    return 'coffee'
  }

  // Automotive
  if (
    /\b(automotive|car|cars|auto|vehicle|vehicles|motorcycle|detailing)\b/.test(
      normalized,
    )
  ) {
    return 'car'
  }

  // Pet Supplies
  if (
    /\b(pet|pets|dog|dogs|cat|cats|fish|aquatic|bird|birds|animal|animals)\b/.test(
      normalized,
    )
  ) {
    return 'paw'
  }

  // Books & Stationery
  if (
    /\b(book|books|stationery|notebook|notebooks|planner|planners|writing|art supplies|magazine|fiction)\b/.test(
      normalized,
    )
  ) {
    return 'book'
  }

  return 'package'
}

export interface VariantColorStyle {
  iconColor: string
  bg: string
  borderColor?: string
}

/**
 * Dynamically resolves icon color, thumbnail background and border from variant combination.
 * Returns null if no Color option is present, prompting neutral default styling.
 */
export function getVariantColorInfo(combination?: Record<string, string>): VariantColorStyle | null {
  if (!combination) return null

  // Find color key dynamically (Color, Colour, color, colour, etc.)
  const colorKey = Object.keys(combination).find((k) =>
    /^(colou?r)$/i.test(k.trim()) || /colou?r/i.test(k),
  )
  if (!colorKey) return null

  const rawVal = combination[colorKey]?.trim()
  if (!rawVal) return null

  const lower = rawVal.toLowerCase()

  // Map of known common color names with optimal contrast pairs
  const COLOR_PALETTE: Record<string, VariantColorStyle> = {
    white: { iconColor: '#94A3B8', bg: '#FFFFFF', borderColor: '#CBD5E1' },
    'off-white': { iconColor: '#94A3B8', bg: '#FAFAF9', borderColor: '#E7E5E4' },
    'off white': { iconColor: '#94A3B8', bg: '#FAFAF9', borderColor: '#E7E5E4' },
    ivory: { iconColor: '#94A3B8', bg: '#FFFFF0', borderColor: '#E2E8F0' },
    cream: { iconColor: '#A8A29E', bg: '#FFFDD0', borderColor: '#E7E5E4' },
    snow: { iconColor: '#94A3B8', bg: '#FFFAFA', borderColor: '#E2E8F0' },
    pearl: { iconColor: '#94A3B8', bg: '#F8F8FF', borderColor: '#E2E8F0' },
    black: { iconColor: '#0F172A', bg: '#E2E8F0', borderColor: '#CBD5E1' },
    dark: { iconColor: '#1E293B', bg: '#E2E8F0', borderColor: '#CBD5E1' },
    charcoal: { iconColor: '#334155', bg: '#F1F5F9', borderColor: '#CBD5E1' },
    onyx: { iconColor: '#0F172A', bg: '#E2E8F0', borderColor: '#CBD5E1' },
    blue: { iconColor: '#2563EB', bg: '#EFF6FF', borderColor: '#BFDBFE' },
    navy: { iconColor: '#1E3A8A', bg: '#EFF6FF', borderColor: '#BFDBFE' },
    'navy blue': { iconColor: '#1E3A8A', bg: '#EFF6FF', borderColor: '#BFDBFE' },
    'royal blue': { iconColor: '#1D4ED8', bg: '#EFF6FF', borderColor: '#BFDBFE' },
    'sky blue': { iconColor: '#0284C7', bg: '#F0F9FF', borderColor: '#BAE6FD' },
    'light blue': { iconColor: '#0284C7', bg: '#F0F9FF', borderColor: '#BAE6FD' },
    red: { iconColor: '#DC2626', bg: '#FEF2F2', borderColor: '#FECACA' },
    maroon: { iconColor: '#800000', bg: '#FEF2F2', borderColor: '#FECACA' },
    crimson: { iconColor: '#BE123C', bg: '#FFF1F2', borderColor: '#FECDD3' },
    burgundy: { iconColor: '#800020', bg: '#FEF2F2', borderColor: '#FECACA' },
    wine: { iconColor: '#722F37', bg: '#FEF2F2', borderColor: '#FECACA' },
    green: { iconColor: '#16A34A', bg: '#F0FDF4', borderColor: '#BBF7D0' },
    'forest green': { iconColor: '#15803D', bg: '#F0FDF4', borderColor: '#BBF7D0' },
    'dark green': { iconColor: '#14532D', bg: '#F0FDF4', borderColor: '#BBF7D0' },
    mint: { iconColor: '#059669', bg: '#ECFDF5', borderColor: '#A7F3D0' },
    sage: { iconColor: '#4D7C0F', bg: '#F7FEE7', borderColor: '#D9F99D' },
    olive: { iconColor: '#65A30D', bg: '#F7FEE7', borderColor: '#D9F99D' },
    lime: { iconColor: '#65A30D', bg: '#F7FEE7', borderColor: '#D9F99D' },
    teal: { iconColor: '#0D9488', bg: '#F0FDFA', borderColor: '#99F6E4' },
    turquoise: { iconColor: '#0D9488', bg: '#F0FDFA', borderColor: '#99F6E4' },
    emerald: { iconColor: '#059669', bg: '#ECFDF5', borderColor: '#A7F3D0' },
    yellow: { iconColor: '#D97706', bg: '#FEFCE8', borderColor: '#FEF08A' },
    gold: { iconColor: '#D97706', bg: '#FEFCE8', borderColor: '#FEF08A' },
    mustard: { iconColor: '#B45309', bg: '#FEFCE8', borderColor: '#FEF08A' },
    lemon: { iconColor: '#CA8A04', bg: '#FEFCE8', borderColor: '#FEF08A' },
    orange: { iconColor: '#EA580C', bg: '#FFF7ED', borderColor: '#FED7AA' },
    coral: { iconColor: '#EA580C', bg: '#FFF7ED', borderColor: '#FED7AA' },
    peach: { iconColor: '#EA580C', bg: '#FFF7ED', borderColor: '#FED7AA' },
    purple: { iconColor: '#9333EA', bg: '#FAF5FF', borderColor: '#E9D5FF' },
    violet: { iconColor: '#7C3AED', bg: '#F5F3FF', borderColor: '#DDD6FE' },
    indigo: { iconColor: '#4F46E5', bg: '#EEF2FF', borderColor: '#C7D2FE' },
    lavender: { iconColor: '#7C3AED', bg: '#F5F3FF', borderColor: '#DDD6FE' },
    lilac: { iconColor: '#9333EA', bg: '#FAF5FF', borderColor: '#E9D5FF' },
    pink: { iconColor: '#DB2777', bg: '#FDF2F8', borderColor: '#FBCFE8' },
    rose: { iconColor: '#E11D48', bg: '#FFF1F2', borderColor: '#FECDD3' },
    blush: { iconColor: '#DB2777', bg: '#FDF2F8', borderColor: '#FBCFE8' },
    salmon: { iconColor: '#EA580C', bg: '#FFF7ED', borderColor: '#FED7AA' },
    magenta: { iconColor: '#C026D3', bg: '#FDF4FF', borderColor: '#F5D0FE' },
    fuchsia: { iconColor: '#C026D3', bg: '#FDF4FF', borderColor: '#F5D0FE' },
    cyan: { iconColor: '#0891B2', bg: '#ECFEFF', borderColor: '#A5F3FC' },
    aqua: { iconColor: '#0891B2', bg: '#ECFEFF', borderColor: '#A5F3FC' },
    sky: { iconColor: '#0284C7', bg: '#F0F9FF', borderColor: '#BAE6FD' },
    brown: { iconColor: '#78350F', bg: '#FDF8F6', borderColor: '#E7E5E4' },
    chocolate: { iconColor: '#78350F', bg: '#FDF8F6', borderColor: '#E7E5E4' },
    coffee: { iconColor: '#78350F', bg: '#FDF8F6', borderColor: '#E7E5E4' },
    mocha: { iconColor: '#78350F', bg: '#FDF8F6', borderColor: '#E7E5E4' },
    camel: { iconColor: '#92400E', bg: '#FDF8F6', borderColor: '#E7E5E4' },
    beige: { iconColor: '#78716C', bg: '#F5F5DC', borderColor: '#E7E5E4' },
    sand: { iconColor: '#78716C', bg: '#FDF8F6', borderColor: '#E7E5E4' },
    nude: { iconColor: '#78716C', bg: '#FDF8F6', borderColor: '#E7E5E4' },
    taupe: { iconColor: '#78716C', bg: '#FDF8F6', borderColor: '#E7E5E4' },
    tan: { iconColor: '#78716C', bg: '#FDF8F6', borderColor: '#E7E5E4' },
    gray: { iconColor: '#4B5563', bg: '#F3F4F6', borderColor: '#E5E7EB' },
    grey: { iconColor: '#4B5563', bg: '#F3F4F6', borderColor: '#E5E7EB' },
    silver: { iconColor: '#64748B', bg: '#F8FAFC', borderColor: '#E2E8F0' },
    slate: { iconColor: '#475569', bg: '#F1F5F9', borderColor: '#CBD5E1' },
  }

  if (COLOR_PALETTE[lower]) {
    return COLOR_PALETTE[lower]
  }

  // If it's a hex color (e.g. #ff0000 or #f00)
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(rawVal)) {
    return {
      iconColor: rawVal,
      bg: '#F8FAFC',
      borderColor: '#E2E8F0',
    }
  }

  // Dynamic fallback: CSS color string
  return {
    iconColor: rawVal,
    bg: '#F8FAFC',
    borderColor: '#E2E8F0',
  }
}

interface CategoryIconProps {
  categoryPath?: string
  size?: number
  color?: string
  className?: string
}

export function CategoryIcon({
  categoryPath,
  size = 16,
  color = 'currentColor',
  className,
}: CategoryIconProps): ReactNode {
  const iconName = getCategoryIconName(categoryPath)

  switch (iconName) {
    case 'shoe':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M2 17h20v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z" />
          <path d="M2 17l4-9 4 1 3 5h9v3" />
          <line x1="7" y1="12" x2="11" y2="12" />
        </svg>
      )

    case 'bag':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <rect x="3" y="8" width="18" height="13" rx="2" />
          <path d="M8 8V6a4 4 0 0 1 8 0v2" />
          <line x1="12" y1="12" x2="12" y2="15" />
        </svg>
      )

    case 'jewelry':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <polygon points="6 3 18 3 22 9 12 21 2 9 6 3" />
          <line x1="2" y1="9" x2="22" y2="9" />
          <line x1="12" y1="21" x2="6" y2="9" />
          <line x1="12" y1="21" x2="18" y2="9" />
        </svg>
      )

    case 'watch':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="7" />
          <polyline points="12 9 12 12 14 14" />
          <path d="M9 5V2h6v3" />
          <path d="M9 19v3h6v-3" />
        </svg>
      )

    case 'shirt': {
      const isBlack = color === '#0F172A' || color?.toLowerCase() === '#000000' || color?.toLowerCase() === '#1e293b' || color?.toLowerCase() === '#1e2133' || color?.toLowerCase() === 'black'
      const isWhite = color === '#94A3B8' || color?.toLowerCase() === '#ffffff' || color?.toLowerCase() === 'white'
      const fillColor = isBlack ? '#1E2133' : isWhite ? '#FFFFFF' : (color || '#64748B')
      const strokeColor = isBlack ? '#1E2133' : isWhite ? '#CBD5E1' : (color || '#64748B')
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
        </svg>
      )
    }

    case 'laptop':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )

    case 'sparkles':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
        </svg>
      )

    case 'home':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )

    case 'sports':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24" />
        </svg>
      )

    case 'gamepad':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <line x1="6" y1="12" x2="10" y2="12" />
          <line x1="8" y1="10" x2="8" y2="14" />
          <line x1="15" y1="13" x2="15.01" y2="13" />
          <line x1="18" y1="11" x2="18.01" y2="11" />
          <rect x="2" y="6" width="20" height="12" rx="2" />
        </svg>
      )

    case 'coffee':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      )

    case 'car':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="7" rx="2" />
          <path d="M5 11l2-5h10l2 5" />
          <circle cx="7.5" cy="18" r="1.5" />
          <circle cx="16.5" cy="18" r="1.5" />
        </svg>
      )

    case 'paw':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <circle cx="11" cy="4" r="2" />
          <circle cx="18" cy="8" r="2" />
          <circle cx="4" cy="8" r="2" />
          <path d="M12 10c-3.5 0-6 2.5-6 6a4 4 0 0 0 4 4c1.5 0 2.5-.5 2.5-1.5s1 1.5 2.5 1.5a4 4 0 0 0 4-4c0-3.5-2.5-6-6-6z" />
        </svg>
      )

    case 'book':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )

    case 'package':
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M16.5 9.4 7.55 4.24a1.78 1.78 0 0 0-2.5 1.55v12.42a1.78 1.78 0 0 0 .86 1.53l9 5.2a1.78 1.78 0 0 0 1.78 0l9-5.2a1.78 1.78 0 0 0 .86-1.53V5.79a1.78 1.78 0 0 0-2.5-1.55L16.5 9.4z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
  }
}
