import { useEffect, useMemo, useState } from 'react'

export interface CategoryNode {
  id: string
  name: string
  icon?: string
  children?: CategoryNode[]
}

export const CATEGORY_TREE: CategoryNode[] = [
  {
    id: 'apparel',
    name: 'Apparel & Accessories',
    icon: 'shirt',
    children: [
      {
        id: 'clothing',
        name: 'Clothing',
        children: [
          {
            id: 'tops',
            name: 'Tops',
            children: [
              { id: 't-shirts', name: 'T-Shirts' },
              { id: 'shirts', name: 'Shirts' },
              { id: 'polo-shirts', name: 'Polo Shirts' },
              { id: 'tank-tops', name: 'Tank Tops' },
              { id: 'blouses', name: 'Blouses' },
              { id: 'hoodies', name: 'Hoodies & Sweatshirts' },
              { id: 'sweaters', name: 'Sweaters & Cardigans' },
              { id: 'tunics', name: 'Tunics' },
              { id: 'crop-tops', name: 'Crop Tops' },
              { id: 'other-tops', name: 'Other Tops' },
              { id: 'tops-other', name: 'Other' },
            ],
          },
          {
            id: 'bottoms',
            name: 'Bottoms',
            children: [
              { id: 'jeans', name: 'Jeans' },
              { id: 'trousers', name: 'Trousers' },
              { id: 'shorts', name: 'Shorts' },
              { id: 'skirts', name: 'Skirts' },
              { id: 'leggings', name: 'Leggings' },
              { id: 'sweatpants', name: 'Sweatpants' },
              { id: 'bottoms-other', name: 'Other' },
            ],
          },
          {
            id: 'dresses',
            name: 'Dresses',
            children: [
              { id: 'casual-dresses', name: 'Casual Dresses' },
              { id: 'party-dresses', name: 'Party Dresses' },
              { id: 'maxi-dresses', name: 'Maxi Dresses' },
              { id: 'mini-dresses', name: 'Mini Dresses' },
              { id: 'dresses-other', name: 'Other' },
            ],
          },
          {
            id: 'outerwear',
            name: 'Outerwear & Jackets',
            children: [
              { id: 'jackets', name: 'Jackets' },
              { id: 'coats', name: 'Coats' },
              { id: 'blazers', name: 'Blazers' },
              { id: 'vests', name: 'Vests' },
              { id: 'outerwear-other', name: 'Other' },
            ],
          },
          {
            id: 'suits',
            name: 'Suits & Blazers',
            children: [
              { id: 'two-piece-suits', name: 'Two-Piece Suits' },
              { id: 'three-piece-suits', name: 'Three-Piece Suits' },
              { id: 'tuxedos', name: 'Tuxedos' },
              { id: 'blazers-sport-coats', name: 'Blazers & Sport Coats' },
              { id: 'suit-trousers', name: 'Suit Trousers' },
              { id: 'waistcoats', name: 'Waistcoats & Vests' },
              { id: 'suits-other', name: 'Other' },
            ],
          },
          {
            id: 'sleepwear',
            name: 'Sleepwear & Loungewear',
            children: [
              { id: 'pajama-sets', name: 'Pajama Sets' },
              { id: 'pajama-bottoms', name: 'Pajama Bottoms' },
              { id: 'pajama-tops', name: 'Pajama Tops' },
              { id: 'robes', name: 'Robes' },
              { id: 'nightgowns', name: 'Nightgowns & Sleepshirts' },
              { id: 'onesies', name: 'Onesies & Rompers' },
              { id: 'sleepwear-other', name: 'Other' },
            ],
          },
          {
            id: 'activewear',
            name: 'Activewear',
            children: [
              { id: 'athletic-shirts', name: 'Athletic Shirts & Tops' },
              { id: 'workout-shorts', name: 'Workout Shorts' },
              { id: 'running-tights', name: 'Running Tights & Leggings' },
              { id: 'sports-bras', name: 'Sports Bras' },
              { id: 'tracksuits', name: 'Tracksuits & Sweatsuits' },
              { id: 'athletic-jackets', name: 'Athletic Jackets' },
              { id: 'activewear-other', name: 'Other' },
            ],
          },
          {
            id: 'swimwear',
            name: 'Swimwear',
            children: [
              { id: 'bikinis', name: 'Bikinis & Two-Piece Sets' },
              { id: 'one-piece', name: 'One-Piece Swimsuits' },
              { id: 'swim-trunks', name: 'Swim Trunks & Boardshorts' },
              { id: 'rashguards', name: 'Rashguards & Swim Shirts' },
              { id: 'cover-ups', name: 'Cover-Ups & Kaftans' },
              { id: 'swimwear-other', name: 'Other' },
            ],
          },
          {
            id: 'underwear',
            name: 'Underwear',
            children: [
              { id: 'boxers', name: 'Boxers & Briefs' },
              { id: 'panties', name: 'Panties & Thongs' },
              { id: 'bras', name: 'Bras & Bralettes' },
              { id: 'shapewear', name: 'Shapewear' },
              { id: 'undershirts', name: 'Undershirts & Camisoles' },
              { id: 'thermal-underwear', name: 'Thermal Underwear' },
              { id: 'underwear-other', name: 'Other' },
            ],
          },
          {
            id: 'socks',
            name: 'Socks & Hosiery',
            children: [
              { id: 'ankle-socks', name: 'Ankle & Low-Cut Socks' },
              { id: 'crew-socks', name: 'Crew Socks' },
              { id: 'knee-high-socks', name: 'Knee-High & Dress Socks' },
              { id: 'tights-pantyhose', name: 'Tights & Pantyhose' },
              { id: 'athletic-socks', name: 'Athletic & Compression Socks' },
              { id: 'invisible-liners', name: 'No-Show & Liner Socks' },
              { id: 'socks-other', name: 'Other' },
            ],
          },
        ],
      },
      {
        id: 'shoes',
        name: 'Shoes',
        children: [
          { id: 'sneakers', name: 'Sneakers' },
          { id: 'formal-shoes', name: 'Formal Shoes' },
          { id: 'boots', name: 'Boots' },
          { id: 'sandals', name: 'Sandals' },
          { id: 'slippers', name: 'Slippers' },
          { id: 'shoes-other', name: 'Other' },
        ],
      },
      {
        id: 'handbags',
        name: 'Handbags, Wallets & Cases',
        children: [
          { id: 'totes', name: 'Tote Bags' },
          { id: 'crossbody', name: 'Crossbody Bags' },
          { id: 'backpacks', name: 'Backpacks' },
          { id: 'clutches', name: 'Clutches' },
          { id: 'wallets', name: 'Wallets' },
          { id: 'handbags-other', name: 'Other' },
        ],
      },
      {
        id: 'jewelry',
        name: 'Jewelry',
        children: [
          { id: 'necklaces', name: 'Necklaces' },
          { id: 'earrings', name: 'Earrings' },
          { id: 'bracelets', name: 'Bracelets' },
          { id: 'rings', name: 'Rings' },
          { id: 'jewelry-other', name: 'Other' },
        ],
      },
      {
        id: 'watches',
        name: 'Watches',
        children: [
          { id: 'analog-watches', name: 'Analog Watches' },
          { id: 'digital-watches', name: 'Digital Watches' },
          { id: 'smartwatches', name: 'Smartwatches' },
          { id: 'watches-other', name: 'Other' },
        ],
      },
      {
        id: 'accessories',
        name: 'Accessories',
        children: [
          { id: 'sunglasses', name: 'Sunglasses' },
          { id: 'belts', name: 'Belts' },
          { id: 'hats', name: 'Hats & Caps' },
          { id: 'scarves', name: 'Scarves & Wraps' },
          { id: 'other-accessories', name: 'Other Accessories' },
          { id: 'accessories-other', name: 'Other' },
        ],
      },
    ],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'laptop',
    children: [
      { id: 'phones', name: 'Phones & Tablets' },
      { id: 'computers', name: 'Computers & Laptops' },
      { id: 'audio', name: 'Audio & Headphones' },
      { id: 'cameras', name: 'Cameras' },
      { id: 'wearables', name: 'Wearable Tech' },
      { id: 'gaming', name: 'Gaming' },
      { id: 'tv', name: 'TV & Home Theater' },
      { id: 'smarthome', name: 'Smart Home' },
      { id: 'electronics-other', name: 'Other' },
    ],
  },
  {
    id: 'home',
    name: 'Home & Garden',
    icon: 'home',
    children: [
      { id: 'furniture', name: 'Furniture' },
      { id: 'homedecor', name: 'Home Decor' },
      { id: 'bedding', name: 'Bedding & Bath' },
      { id: 'kitchen', name: 'Kitchen & Dining' },
      { id: 'lighting', name: 'Lighting' },
      { id: 'garden', name: 'Patio & Garden' },
      { id: 'storage', name: 'Storage & Organization' },
      { id: 'home-other', name: 'Other' },
    ],
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    icon: 'sparkles',
    children: [
      { id: 'skincare', name: 'Skincare' },
      { id: 'makeup', name: 'Makeup' },
      { id: 'haircare', name: 'Haircare' },
      { id: 'fragrance', name: 'Fragrance' },
      { id: 'bath', name: 'Bath & Body' },
      { id: 'personal', name: 'Personal Care' },
      { id: 'beauty-other', name: 'Other' },
    ],
  },
  {
    id: 'sports',
    name: 'Sports & Recreation',
    icon: 'sports',
    children: [
      { id: 'fitness', name: 'Fitness & Exercise' },
      { id: 'outdoor', name: 'Outdoor Recreation' },
      { id: 'cycling', name: 'Cycling' },
      { id: 'teamsports', name: 'Team Sports' },
      { id: 'watersports', name: 'Water Sports' },
      { id: 'sports-other', name: 'Other' },
    ],
  },
  {
    id: 'toys',
    name: 'Toys & Games',
    icon: 'gamepad',
    children: [
      { id: 'action-figures', name: 'Action Figures' },
      { id: 'board-games', name: 'Board Games' },
      { id: 'dolls', name: 'Dolls & Plush' },
      { id: 'educational', name: 'Educational Toys' },
      { id: 'puzzles', name: 'Puzzles' },
      { id: 'toys-other', name: 'Other' },
    ],
  },
  {
    id: 'food',
    name: 'Food & Beverages',
    icon: 'coffee',
    children: [
      { id: 'snacks', name: 'Snacks' },
      { id: 'beverages', name: 'Beverages' },
      { id: 'pantry', name: 'Pantry Staples' },
      { id: 'coffee-tea', name: 'Coffee & Tea' },
      { id: 'sweets', name: 'Sweets & Chocolates' },
      { id: 'food-other', name: 'Other' },
    ],
  },
  {
    id: 'automotive',
    name: 'Automotive',
    icon: 'car',
    children: [
      { id: 'car-accessories', name: 'Car Accessories' },
      { id: 'auto-electronics', name: 'Electronics & Navigation' },
      { id: 'car-care', name: 'Care & Detailing' },
      { id: 'motorcycle', name: 'Motorcycle Parts' },
      { id: 'automotive-other', name: 'Other' },
    ],
  },
  {
    id: 'pets',
    name: 'Pet Supplies',
    icon: 'paw',
    children: [
      { id: 'dogs', name: 'Dogs' },
      { id: 'cats', name: 'Cats' },
      { id: 'fish', name: 'Fish & Aquatic' },
      { id: 'birds', name: 'Birds' },
      { id: 'small-animals', name: 'Small Animals' },
      { id: 'pets-other', name: 'Other' },
    ],
  },
  {
    id: 'books',
    name: 'Books & Stationery',
    icon: 'book',
    children: [
      { id: 'fiction', name: 'Fiction' },
      { id: 'non-fiction', name: 'Non-Fiction' },
      { id: 'notebooks', name: 'Notebooks & Planners' },
      { id: 'writing', name: 'Writing Supplies' },
      { id: 'art-supplies', name: 'Art Supplies' },
      { id: 'books-other', name: 'Other' },
    ],
  },
]

function renderCategoryIcon(type?: string) {
  switch (type) {
    case 'shirt':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
        </svg>
      )
    case 'laptop':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    case 'home':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
        </svg>
      )
    case 'sports':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24" />
        </svg>
      )
    case 'gamepad':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="6" y1="12" x2="10" y2="12" />
          <line x1="8" y1="10" x2="8" y2="14" />
          <line x1="15" y1="13" x2="15.01" y2="13" />
          <line x1="18" y1="11" x2="18.01" y2="11" />
          <rect x="2" y="6" width="20" height="12" rx="2" />
        </svg>
      )
    case 'coffee':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      )
    case 'car':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="7" rx="2" />
          <path d="M5 11l2-5h10l2 5" />
          <circle cx="7.5" cy="18" r="1.5" />
          <circle cx="16.5" cy="18" r="1.5" />
        </svg>
      )
    case 'paw':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="4" r="2" />
          <circle cx="18" cy="8" r="2" />
          <circle cx="4" cy="8" r="2" />
          <path d="M12 10c-3.5 0-6 2.5-6 6a4 4 0 0 0 4 4c1.5 0 2.5-.5 2.5-1.5s1 1.5 2.5 1.5a4 4 0 0 0 4-4c0-3.5-2.5-6-6-6z" />
        </svg>
      )
    case 'book':
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      )
  }
}

interface CategorySelectorModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (categoryPath: string) => void
  currentValue?: string
}

interface FlattenedCategory {
  path: string[]
  displayPath: string
  node: CategoryNode
}

function flattenCategories(tree: CategoryNode[], currentPath: string[] = []): FlattenedCategory[] {
  const result: FlattenedCategory[] = []
  for (const node of tree) {
    const newPath = [...currentPath, node.name]
    result.push({
      path: newPath,
      displayPath: newPath.join(' > '),
      node,
    })
    if (node.children && node.children.length > 0) {
      result.push(...flattenCategories(node.children, newPath))
    }
  }
  return result
}

export function CategorySelectorModal({
  isOpen,
  onClose,
  onSelect,
  currentValue = '',
}: CategorySelectorModalProps) {
  const [search, setSearch] = useState('')
  const [selectedCategoryPath, setSelectedCategoryPath] = useState<string>(currentValue)

  // Set of expanded full paths e.g. "Apparel & Accessories", "Apparel & Accessories > Clothing"
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    if (currentValue) {
      const parts = currentValue.split(' > ').map((p) => p.trim())
      let acc = ''
      for (let i = 0; i < parts.length - 1; i++) {
        acc = acc ? `${acc} > ${parts[i]}` : parts[i]
        initial.add(acc)
      }
    }
    return initial
  })

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedCategoryPath(currentValue)
      if (currentValue) {
        const parts = currentValue.split(' > ').map((p) => p.trim())
        const newExpanded = new Set<string>()
        let acc = ''
        for (let i = 0; i < parts.length - 1; i++) {
          acc = acc ? `${acc} > ${parts[i]}` : parts[i]
          newExpanded.add(acc)
        }
        setExpandedPaths(newExpanded)
      }
      setSearch('')
    }
  }, [isOpen, currentValue])

  const allFlatCategories = useMemo(() => flattenCategories(CATEGORY_TREE), [])

  const searchResults = useMemo(() => {
    if (!search.trim()) return []
    const q = search.toLowerCase()
    return allFlatCategories.filter((item) =>
      item.displayPath.toLowerCase().includes(q) || item.node.name.toLowerCase().includes(q),
    )
  }, [search, allFlatCategories])

  if (!isOpen) return null

  function toggleExpand(path: string) {
    setExpandedPaths((prev) => {
      const next = new Set(prev)
      if (next.has(path)) {
        // Collapse this category and all its nested subcategories
        for (const p of Array.from(next)) {
          if (p === path || p.startsWith(`${path} > `)) {
            next.delete(p)
          }
        }
      } else {
        next.add(path)
      }
      return next
    })
  }

  function handleSelectLeaf(fullPath: string) {
    setSelectedCategoryPath(fullPath)
  }

  function handleConfirm() {
    if (selectedCategoryPath) {
      onSelect(selectedCategoryPath)
    }
    onClose()
  }

  // Recursive Tree Node Renderer
  function renderTreeNode(node: CategoryNode, parentPath: string = '', depth: number = 0) {
    const currentFullPath = parentPath ? `${parentPath} > ${node.name}` : node.name
    const hasChildren = Boolean(node.children && node.children.length > 0)
    const isExpanded = expandedPaths.has(currentFullPath)
    const isSelected = selectedCategoryPath === currentFullPath
    const paddingLeft = 16 + depth * 22

    return (
      <div key={currentFullPath} className="adm-cat-tree-node">
        <button
          type="button"
          className={`adm-cat-tree-row${isSelected ? ' adm-cat-tree-row--selected' : ''}${isExpanded ? ' adm-cat-tree-row--expanded' : ''}${depth === 0 ? ' adm-cat-tree-row--root' : ''}`}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(currentFullPath)
            } else {
              handleSelectLeaf(currentFullPath)
            }
          }}
          onDoubleClick={() => {
            if (!hasChildren) {
              handleSelectLeaf(currentFullPath)
              onSelect(currentFullPath)
              onClose()
            }
          }}
        >
          {/* Root category icon or leaf radio icon */}
          {depth === 0 && node.icon ? (
            <span className="adm-cat-tree-row__icon">
              {renderCategoryIcon(node.icon)}
            </span>
          ) : !hasChildren ? (
            <span className="adm-cat-tree-row__radio">
              {isSelected ? '●' : '○'}
            </span>
          ) : null}

          <span className="adm-cat-tree-row__name">{node.name}</span>

          {/* Chevron for expandable branches */}
          {hasChildren && (
            <span className={`adm-cat-tree-row__chevron${isExpanded ? ' adm-cat-tree-row__chevron--open' : ''}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          )}
        </button>

        {/* Child items rendered directly beneath */}
        {hasChildren && isExpanded && (
          <div className="adm-cat-tree-children">
            {node.children!.map((child) => renderTreeNode(child, currentFullPath, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="adm-modal-backdrop" onClick={onClose}>
      <div className="adm-cat-modal" onClick={(e) => e.stopPropagation()}>
        {/* ── Modal Header ── */}
        <div className="adm-cat-modal__header">
          <h2 className="adm-cat-modal__title">Select category</h2>
          <button
            type="button"
            className="adm-cat-modal__close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* ── Search Bar ── */}
        <div className="adm-cat-modal__search-wrap">
          <div className="adm-cat-modal__search-bar">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="adm-cat-modal__search-icon"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="adm-cat-modal__search-input"
              placeholder="Search categories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                className="adm-cat-modal__clear-search"
                onClick={() => setSearch('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ── Body: Search Mode vs Expandable Tree ── */}
        <div className="adm-cat-modal__body">
          {search.trim() ? (
            /* Search Results */
            <div className="adm-cat-modal__search-results">
              {searchResults.length > 0 ? (
                searchResults.map((item) => {
                  const isSelected = selectedCategoryPath === item.displayPath
                  return (
                    <button
                      key={item.displayPath}
                      type="button"
                      className={`adm-cat-search-item${isSelected ? ' adm-cat-search-item--selected' : ''}`}
                      onClick={() => setSelectedCategoryPath(item.displayPath)}
                      onDoubleClick={() => {
                        setSelectedCategoryPath(item.displayPath)
                        onSelect(item.displayPath)
                        onClose()
                      }}
                    >
                      <span className="adm-cat-search-item__radio">
                        {isSelected ? '●' : '○'}
                      </span>
                      <span className="adm-cat-search-item__text">{item.displayPath}</span>
                    </button>
                  )
                })
              ) : (
                <div className="adm-cat-modal__empty-search">
                  No categories found matching &ldquo;{search}&rdquo;
                </div>
              )}
            </div>
          ) : (
            /* Expandable Tree View */
            <div className="adm-cat-modal__tree">
              {CATEGORY_TREE.map((node) => renderTreeNode(node, '', 0))}
            </div>
          )}
        </div>

        {/* ── Modal Footer ── */}
        <div className="adm-cat-modal__footer">
          <button
            type="button"
            className="adm-btn adm-btn--outline"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="adm-btn adm-btn--primary"
            onClick={handleConfirm}
            disabled={!selectedCategoryPath}
          >
            Select
          </button>
        </div>
      </div>
    </div>
  )
}

export interface CategorySelectorAttachedListProps {
  isOpen: boolean
  search?: string
  onClose: () => void
  onSelect: (categoryPath: string) => void
  currentValue?: string
}

export function CategorySelectorAttachedList({
  isOpen,
  search = '',
  onClose,
  onSelect,
  currentValue = '',
}: CategorySelectorAttachedListProps) {
  const [selectedCategoryPath, setSelectedCategoryPath] = useState<string>(currentValue)

  // Set of expanded full paths
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    if (currentValue) {
      const parts = currentValue.split(' > ').map((p) => p.trim())
      let acc = ''
      for (let i = 0; i < parts.length - 1; i++) {
        acc = acc ? `${acc} > ${parts[i]}` : parts[i]
        initial.add(acc)
      }
    }
    return initial
  })

  // Sync state when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedCategoryPath(currentValue)
      if (currentValue) {
        const parts = currentValue.split(' > ').map((p) => p.trim())
        const newExpanded = new Set<string>()
        let acc = ''
        for (let i = 0; i < parts.length - 1; i++) {
          acc = acc ? `${acc} > ${parts[i]}` : parts[i]
          newExpanded.add(acc)
        }
        setExpandedPaths(newExpanded)
      }
    }
  }, [isOpen, currentValue])

  const allFlatCategories = useMemo(() => flattenCategories(CATEGORY_TREE), [])

  const searchResults = useMemo(() => {
    if (!search.trim()) return []
    const q = search.toLowerCase()
    return allFlatCategories.filter((item) =>
      item.displayPath.toLowerCase().includes(q) || item.node.name.toLowerCase().includes(q),
    )
  }, [search, allFlatCategories])

  if (!isOpen) return null

  function toggleExpand(path: string) {
    setExpandedPaths((prev) => {
      const next = new Set(prev)
      if (next.has(path)) {
        // Collapse this category and all its nested subcategories
        for (const p of Array.from(next)) {
          if (p === path || p.startsWith(`${path} > `)) {
            next.delete(p)
          }
        }
      } else {
        next.add(path)
      }
      return next
    })
  }

  function handleSelectLeaf(fullPath: string) {
    setSelectedCategoryPath(fullPath)
    onSelect(fullPath)
    onClose()
  }

  // Recursive Tree Node Renderer
  function renderTreeNode(node: CategoryNode, parentPath: string = '', depth: number = 0) {
    const currentFullPath = parentPath ? `${parentPath} > ${node.name}` : node.name
    const hasChildren = Boolean(node.children && node.children.length > 0)
    const isExpanded = expandedPaths.has(currentFullPath)
    const isSelected = selectedCategoryPath === currentFullPath
    const paddingLeft = 14 + depth * 20

    return (
      <div key={currentFullPath} className="adm-cat-tree-node">
        <button
          type="button"
          className={`adm-cat-tree-row${isSelected ? ' adm-cat-tree-row--selected' : ''}${isExpanded ? ' adm-cat-tree-row--expanded' : ''}${depth === 0 ? ' adm-cat-tree-row--root' : ''}`}
          style={{ paddingLeft: `${paddingLeft}px` }}
          onClick={() => {
            if (hasChildren) {
              toggleExpand(currentFullPath)
            } else {
              handleSelectLeaf(currentFullPath)
            }
          }}
        >
          {/* Root category icon or leaf radio icon */}
          {depth === 0 && node.icon ? (
            <span className="adm-cat-tree-row__icon">
              {renderCategoryIcon(node.icon)}
            </span>
          ) : !hasChildren ? (
            <span className="adm-cat-tree-row__radio">
              {isSelected ? '●' : '○'}
            </span>
          ) : null}

          <span className="adm-cat-tree-row__name">{node.name}</span>

          {/* Chevron for expandable branches */}
          {hasChildren && (
            <span className={`adm-cat-tree-row__chevron${isExpanded ? ' adm-cat-tree-row__chevron--open' : ''}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          )}
        </button>

        {/* Child items rendered directly beneath */}
        {hasChildren && isExpanded && (
          <div className="adm-cat-tree-children">
            {node.children!.map((child) => renderTreeNode(child, currentFullPath, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="adm-cat-attached-dropdown" onClick={(e) => e.stopPropagation()}>
      <div className="adm-cat-attached-dropdown__body">
        {search.trim() ? (
          /* Search Results */
          <div className="adm-cat-modal__search-results">
            {searchResults.length > 0 ? (
              searchResults.map((item) => {
                const isSelected = selectedCategoryPath === item.displayPath
                return (
                  <button
                    key={item.displayPath}
                    type="button"
                    className={`adm-cat-search-item${isSelected ? ' adm-cat-search-item--selected' : ''}`}
                    onClick={() => handleSelectLeaf(item.displayPath)}
                  >
                    <span className="adm-cat-search-item__radio">
                      {isSelected ? '●' : '○'}
                    </span>
                    <span className="adm-cat-search-item__text">{item.displayPath}</span>
                  </button>
                )
              })
            ) : (
              <div className="adm-cat-modal__empty-search">
                No categories found matching &ldquo;{search}&rdquo;
              </div>
            )}
          </div>
        ) : (
          /* Expandable Tree View */
          <div className="adm-cat-modal__tree">
            {CATEGORY_TREE.map((node) => renderTreeNode(node, '', 0))}
          </div>
        )}
      </div>
    </div>
  )
}
