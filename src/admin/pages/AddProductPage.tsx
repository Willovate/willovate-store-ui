import { useEffect, useMemo, useRef, useState } from 'react'
import {
  createProduct,
  getAdminProduct,
  getAdminProducts,
  updateProduct,
  updateProductImages,
  uploadProductImages,
} from '../../lib/api'
import type { Product } from '../../types'
import { ImageUploader } from '../components/ImageUploader'
import { RichTextEditor } from '../components/RichTextEditor'
import { CategorySelectorAttachedList } from '../components/CategorySelectorModal'
import { CategoryIcon, getVariantColorInfo } from '../components/CategoryIconResolver'
import { EditVariantModal } from '../components/EditVariantModal'
import { ToastList } from '../components/Toast'
import {
  addStoredBrand,
  addStoredProductType,
  addStoredTags,
  getStoredBrands,
  getStoredProductTypes,
  subscribeToOptionsRegistry,
} from '../lib/optionsRegistry'
import { navigateTo } from '../hooks/useHashRoute'
import { useToast } from '../hooks/useToast'

// ── Types ─────────────────────────────────────────────────────────────────────

interface AddProductPageProps {
  mode: 'create' | 'edit'
  productId?: string
}

interface VariantOption {
  id: string
  name: string
  values: string[]
}

interface VariantRow {
  key: string
  combination: Record<string, string>
  price: string
  stock: string
  sku: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const OPTION_NAMES = [
  'Size',
  'Color',
  'Gender',
  'Age Group',
  'Material',
  'Style',
  'Weight',
  'Custom',
]

const DEFAULT_VARIANT_OPTIONS: VariantOption[] = [
  { id: 'size', name: 'Size', values: ['S', 'M', 'L', 'XL'] },
  { id: 'color', name: 'Color', values: ['White', 'Black', 'Blue'] },
  { id: 'gender', name: 'Gender', values: ['Men', 'Women', 'Unisex'] },
  { id: 'age-group', name: 'Age Group', values: ['Adult', 'Teen', 'Kids'] },
]

const COLOR_SWATCHES: Record<string, string> = {
  white: '#ffffff',
  black: '#1f2937',
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#22c55e',
  yellow: '#eab308',
  purple: '#a855f7',
  pink: '#ec4899',
  gray: '#6b7280',
  grey: '#6b7280',
  orange: '#f97316',
  navy: '#1e3a5f',
  brown: '#92400e',
  beige: '#d4c5a9',
}

function colorSwatch(optionName: string, value: string): string | null {
  if (optionName.toLowerCase() !== 'color') return null
  return COLOR_SWATCHES[value.toLowerCase()] ?? null
}

function cartesian(arrays: string[][]): string[][] {
  return arrays.reduce<string[][]>(
    (acc, arr) => acc.flatMap((c) => arr.map((v) => [...c, v])),
    [[]],
  )
}

function generateSku(
  combo: Record<string, string>,
  baseName: string = 'TSHIRT',
): string {
  const parts: string[] = []

  const cleanBase =
    (baseName.trim() || 'TSHIRT')
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 6) || 'TSHIRT'

  parts.push(cleanBase)

  const size = combo['Size']
  if (size) parts.push(size.toUpperCase())

  const color = combo['Color']

  if (color) {
    const cUpper = color.toUpperCase()

    if (cUpper === 'WHITE') parts.push('WH')
    else if (cUpper === 'BLACK') parts.push('BK')
    else if (cUpper === 'BLUE') parts.push('BL')
    else if (cUpper === 'GREEN') parts.push('GR')
    else if (cUpper === 'RED') parts.push('RD')
    else parts.push(cUpper.slice(0, 2))
  }

  const gender = combo['Gender']

  if (gender) {
    const gUpper = gender.toUpperCase()

    if (gUpper.startsWith('M')) parts.push('M')
    else if (gUpper.startsWith('W')) parts.push('W')
    else if (gUpper.startsWith('U')) parts.push('U')
    else parts.push(gUpper.slice(0, 1))
  }

  const age = combo['Age Group']

  if (age) {
    const aUpper = age.toUpperCase()

    if (aUpper.startsWith('A')) parts.push('A')
    else if (aUpper.startsWith('T')) parts.push('T')
    else if (aUpper.startsWith('K')) parts.push('K')
    else parts.push(aUpper.slice(0, 1))
  }

  Object.keys(combo).forEach((key) => {
    if (!['Size', 'Color', 'Gender', 'Age Group'].includes(key)) {
      parts.push(combo[key].toUpperCase().slice(0, 2))
    }
  })

  return parts.join('-')
}

function generateVariants(
  options: VariantOption[],
  prev: VariantRow[],
  baseName: string = 'TSHIRT',
  defaultPrice: string = '799',
): VariantRow[] {
  const nonEmpty = options.filter((o) => o.values.length > 0)

  if (nonEmpty.length === 0) return []

  const combos = cartesian(nonEmpty.map((o) => o.values))

  return combos.map((combo) => {
    const key = combo.join(' / ')
    const combination: Record<string, string> = {}

    nonEmpty.forEach((o, i) => {
      combination[o.name] = combo[i]
    })

    const existing = prev.find((r) => r.key === key)

    return {
      key,
      combination,
      price:
        existing?.price !== undefined && existing.price !== ''
          ? existing.price
          : defaultPrice || '799',
      stock:
        existing?.stock !== undefined && existing.stock !== ''
          ? existing.stock
          : '10',
      sku:
        existing?.sku ||
        generateSku(combination, baseName),
    }
  })
}

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

/** Order-sensitive equality check for image URL lists. */
function urlsEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i])
}

// FIX: Define brand options before the component uses BRAND_OPTIONS.find(...)
const BRAND_OPTIONS = getStoredBrands()

// ── SVG Icons ─────────────────────────────────────────────────────────────────

function BackArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 12H5m7-7-7 7 7 7" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false)

  return (
    <span
      className="adm-info-tooltip-wrap"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        className="adm-info-tooltip-trigger"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen((prev) => !prev)
        }}
        aria-label="More information"
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      </button>
      {open && (
        <span className="adm-info-tooltip-popover" role="tooltip">
          {text}
        </span>
      )}
    </span>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

export function AddProductPage({
  mode,
  productId,
}: AddProductPageProps) {
  // ── Form state ─────────────────────────────────────────────────────────────

  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false)
  const [brandSearch, setBrandSearch] = useState('')
  const [brandsList, setBrandsList] = useState<string[]>(() => getStoredBrands())
  const [isAddingNewBrand, setIsAddingNewBrand] = useState(false)
  const [newBrandInput, setNewBrandInput] = useState('')
  const [brandError, setBrandError] = useState('')
  const brandDropdownRef = useRef<HTMLDivElement>(null)
  const brandSearchInputRef = useRef<HTMLInputElement>(null)
  const newBrandInputRef = useRef<HTMLInputElement>(null)

  function handleCreateNewBrand() {
    const trimmed = newBrandInput.trim()
    if (!trimmed) {
      setBrandError('Brand name is required.')
      return
    }
    const isDuplicate = brandsList.some(
      (b) => b.toLowerCase() === trimmed.toLowerCase(),
    )
    if (isDuplicate) {
      setBrandError('This brand already exists.')
      return
    }
    addStoredBrand(trimmed)
    setBrandsList(getStoredBrands())
    setBrand(trimmed)
    setIsAddingNewBrand(false)
    setNewBrandInput('')
    setBrandError('')
    setBrandDropdownOpen(false)
    setBrandSearch('')
  }

  // Listen to registry updates for brands
  useEffect(() => {
    return subscribeToOptionsRegistry(() => {
      setBrandsList(getStoredBrands())
    })
  }, [])

  // Close brand dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        brandDropdownRef.current &&
        !brandDropdownRef.current.contains(event.target as Node)
      ) {
        setBrandDropdownOpen(false)
        setIsAddingNewBrand(false)
        setNewBrandInput('')
        setBrandError('')
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setBrandDropdownOpen(false)
        setIsAddingNewBrand(false)
        setNewBrandInput('')
        setBrandError('')
      }
    }

    if (brandDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [brandDropdownOpen])

  useEffect(() => {
    if (brandDropdownOpen) {
      brandSearchInputRef.current?.focus()
    }
  }, [brandDropdownOpen])

  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [compareAtPrice, setCompareAtPrice] = useState('')

  const [category, setCategory] = useState('')
  const [catDropdownOpen, setCatDropdownOpen] = useState(false)
  const [catSearch, setCatSearch] = useState('')
  const catDropdownRef = useRef<HTMLDivElement>(null)
  const catSearchInputRef = useRef<HTMLInputElement>(null)

  // Focus category search input when opened
  useEffect(() => {
    if (catDropdownOpen) {
      catSearchInputRef.current?.focus()
    }
  }, [catDropdownOpen])

  // Close category dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        catDropdownRef.current &&
        !catDropdownRef.current.contains(event.target as Node)
      ) {
        setCatDropdownOpen(false)
        setCatSearch('')
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setCatDropdownOpen(false)
        setCatSearch('')
      }
    }

    if (catDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [catDropdownOpen])

  const [productType, setProductType] = useState('')
  const [prodTypeDropdownOpen, setProdTypeDropdownOpen] = useState(false)
  const [prodTypeSearch, setProdTypeSearch] = useState('')
  const [productTypesList, setProductTypesList] = useState<string[]>(() => getStoredProductTypes())
  const [isAddingNewProdType, setIsAddingNewProdType] = useState(false)
  const [newProdTypeInput, setNewProdTypeInput] = useState('')
  const [prodTypeError, setProdTypeError] = useState('')
  const prodTypeDropdownRef = useRef<HTMLDivElement>(null)
  const prodTypeSearchInputRef = useRef<HTMLInputElement>(null)
  const newProdTypeInputRef = useRef<HTMLInputElement>(null)

  function handleCreateNewProdType() {
    const trimmed = newProdTypeInput.trim()
    if (!trimmed) {
      setProdTypeError('Product type name is required.')
      return
    }
    const isDuplicate = productTypesList.some(
      (pt) => pt.toLowerCase() === trimmed.toLowerCase(),
    )
    if (isDuplicate) {
      setProdTypeError('This product type already exists.')
      return
    }
    addStoredProductType(trimmed)
    setProductTypesList(getStoredProductTypes())
    setProductType(trimmed)
    setIsAddingNewProdType(false)
    setNewProdTypeInput('')
    setProdTypeError('')
    setProdTypeDropdownOpen(false)
    setProdTypeSearch('')
  }

  // Listen to registry updates for product types
  useEffect(() => {
    return subscribeToOptionsRegistry(() => {
      setProductTypesList(getStoredProductTypes())
    })
  }, [])

  // Focus product type search input when opened
  useEffect(() => {
    if (prodTypeDropdownOpen) {
      prodTypeSearchInputRef.current?.focus()
    }
  }, [prodTypeDropdownOpen])

  // Close product type dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        prodTypeDropdownRef.current &&
        !prodTypeDropdownRef.current.contains(event.target as Node)
      ) {
        setProdTypeDropdownOpen(false)
        setIsAddingNewProdType(false)
        setNewProdTypeInput('')
        setProdTypeError('')
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setProdTypeDropdownOpen(false)
        setIsAddingNewProdType(false)
        setNewProdTypeInput('')
        setProdTypeError('')
      }
    }

    if (prodTypeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [prodTypeDropdownOpen])

  const [sku, setSku] = useState('')
  const [existingProducts, setExistingProducts] = useState<Product[]>([])
  const [nameFocused, setNameFocused] = useState(false)
  const [skuFocused, setSkuFocused] = useState(false)
  const nameDropdownRef = useRef<HTMLDivElement>(null)
  const skuDropdownRef = useRef<HTMLDivElement>(null)

  // Load existing products for suggestions and duplicate validation
  useEffect(() => {
    getAdminProducts({ pageSize: 500 })
      .then((res) => {
        setExistingProducts(res.items || [])
      })
      .catch(() => {})
  }, [])

  const nameSuggestions = useMemo(() => {
    const q = name.trim().toLowerCase()
    if (!q) return []
    return existingProducts
      .filter((p) => (mode === 'edit' && p.id === productId ? false : true))
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 8)
  }, [name, existingProducts, mode, productId])

  const skuSuggestions = useMemo(() => {
    const q = sku.trim().toLowerCase()
    if (!q) return []
    return existingProducts
      .filter((p) => (mode === 'edit' && p.id === productId ? false : true))
      .filter((p) => p.sku && p.sku.toLowerCase().includes(q))
      .slice(0, 8)
  }, [sku, existingProducts, mode, productId])

  // Close name and SKU suggestions on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (nameDropdownRef.current && !nameDropdownRef.current.contains(e.target as Node)) {
        setNameFocused(false)
      }
      if (skuDropdownRef.current && !skuDropdownRef.current.contains(e.target as Node)) {
        setSkuFocused(false)
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setNameFocused(false)
        setSkuFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const [stock, setStock] = useState('')
  const [lowStockAlert, setLowStockAlert] = useState('5')

  const [tags, setTags] = useState('')
  const [isActive, setIsActive] = useState(true)

  const [images, setImages] = useState<(string | File)[]>([])

  const [options, setOptions] = useState<VariantOption[]>(
    mode === 'edit' ? [] : DEFAULT_VARIANT_OPTIONS,
  )

  const [variantRows, setVariantRows] = useState<VariantRow[]>([])
  const [variantsOpen, setVariantsOpen] = useState(true)

  const [addingValueFor, setAddingValueFor] = useState<string | null>(null)
  const [newValueInput, setNewValueInput] = useState('')
  const [editingChip, setEditingChip] = useState<{
    optId: string
    value: string
  } | null>(null)
  const [editChipInput, setEditChipInput] = useState('')
  const isCommittingChipRef = useRef(false)
  const [editingVariant, setEditingVariant] =
    useState<VariantRow | null>(null)

  // ── UI state ───────────────────────────────────────────────────────────────

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(mode === 'edit')
  const [savedId, setSavedId] = useState<string | undefined>(productId)

  // ── Cover-URL state ────────────────────────────────────────────────────────

  const [coverUrl, setCoverUrl] = useState<string | null>(null)
  const prevBlobUrl = useRef<string | null>(null)

  const toast = useToast()
  const newValueRef = useRef<HTMLInputElement>(null)

  const API_BASE = (
    import.meta.env.VITE_API_URL ?? 'http://localhost:5191'
  ).replace(/\/$/, '')

  const savedImageUrlsRef = useRef<string[]>([])

  // ── Keep coverUrl in sync with images[0] ──────────────────────────────────

  useEffect(() => {
    if (prevBlobUrl.current) {
      URL.revokeObjectURL(prevBlobUrl.current)
      prevBlobUrl.current = null
    }

    const first = images[0]

    if (!first) {
      setCoverUrl(null)
      return
    }

    if (typeof first === 'string') {
      setCoverUrl(
        first.startsWith('http')
          ? first
          : `${API_BASE}${first}`,
      )
    } else {
      const blobUrl = URL.createObjectURL(first)

      prevBlobUrl.current = blobUrl
      setCoverUrl(blobUrl)
    }

    return () => {
      if (prevBlobUrl.current) {
        URL.revokeObjectURL(prevBlobUrl.current)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images])

  // ── Load product for edit ──────────────────────────────────────────────────

  useEffect(() => {
    if (mode !== 'edit' || !productId) return

    setLoading(true)

    getAdminProduct(productId)
      .then((p: Product) => {
        setName(p.name)
        setDescription(p.description ?? '')
        setPrice(p.price.toString())
        setCompareAtPrice(
          p.compareAtPrice != null
            ? p.compareAtPrice.toString()
            : '',
        )

        setCategory(p.category ?? '')
        setProductType(p.productType ?? '')
        setSku(p.sku ?? '')
        setStock(p.stockQuantity.toString())

        setLowStockAlert(
          p.lowStockAlert != null
            ? p.lowStockAlert.toString()
            : '5',
        )

        // Extract brand from tags if present
        const tagList = (p.tags ?? '')
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)

        const matchedBrand = BRAND_OPTIONS.find((b) =>
          tagList.some(
            (t) => t.toLowerCase() === b.toLowerCase(),
          ),
        )

        if (matchedBrand) {
          setBrand(matchedBrand)

          setTags(
            tagList
              .filter(
                (t) =>
                  t.toLowerCase() !==
                  matchedBrand.toLowerCase(),
              )
              .join(', '),
          )
        } else {
          setBrand('')
          setTags(p.tags ?? '')
        }

        setIsActive(p.isActive !== false)

        setImages(p.imageUrls ?? [])

        savedImageUrlsRef.current = p.imageUrls ?? []

        setSavedId(p.id)

        // Load variants
        if (p.variants) {
          try {
            const parsed = JSON.parse(
              p.variants,
            ) as VariantRow[]

            if (Array.isArray(parsed) && parsed.length > 0) {
              setVariantRows(
                parsed.map((r) => ({
                  key: r.key ?? '',
                  combination: r.combination ?? {},
                  price: r.price?.toString() ?? '',
                  stock: r.stock?.toString() ?? '',
                  sku:
                    r.sku ||
                    generateSku(
                      r.combination ?? {},
                      p.name,
                    ),
                })),
              )

              const optMap: Record<
                string,
                Set<string>
              > = {}

              parsed.forEach((r) => {
                if (r.combination) {
                  Object.entries(r.combination).forEach(
                    ([k, v]) => {
                      if (!optMap[k]) {
                        optMap[k] = new Set()
                      }

                      optMap[k].add(v)
                    },
                  )
                }
              })

              if (Object.keys(optMap).length > 0) {
                setOptions(
                  Object.entries(optMap).map(
                    ([k, set]) => ({
                      id: k
                        .toLowerCase()
                        .replace(/\s+/g, '-'),
                      name: k,
                      values: Array.from(set),
                    }),
                  ),
                )
              }

              setVariantsOpen(true)
            }
          } catch {
            // Ignore malformed variant JSON.
          }
        }
      })
      .catch(() => {
        toast.show(
          'Failed to load product. Redirecting…',
          'error',
        )

        setTimeout(
          () => navigateTo('#/admin/products'),
          1500,
        )
      })
      .finally(() => setLoading(false))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, productId])

  // ── Regenerate variant rows when options change ────────────────────────────

  useEffect(() => {
    setVariantRows((prev) =>
      generateVariants(
        options,
        prev,
        name || 'TSHIRT',
        price || '799',
      ),
    )
  }, [options, name, price])

  // ── Validation ─────────────────────────────────────────────────────────────

  function validate(): boolean {
    const errs: Record<string, string> = {}

    const trimmedName = name.trim()
    if (!trimmedName) {
      errs.name = 'Product name is required.'
    } else {
      const isDuplicateName = existingProducts.some((p) =>
        (mode === 'edit' && p.id === productId)
          ? false
          : p.name.toLowerCase() === trimmedName.toLowerCase(),
      )
      if (isDuplicateName) {
        errs.name = 'A product with this name already exists.'
      }
    }

    const trimmedSku = sku.trim()
    if (trimmedSku) {
      const isDuplicateSku = existingProducts.some((p) =>
        (mode === 'edit' && p.id === productId)
          ? false
          : p.sku && p.sku.toLowerCase() === trimmedSku.toLowerCase(),
      )
      if (isDuplicateSku) {
        errs.sku = 'A product with this SKU already exists.'
      }
    }

    const parsedPrice = parseFloat(price)

    if (!price || isNaN(parsedPrice) || parsedPrice <= 0) {
      errs.price = 'Enter a valid price greater than 0.'
    }

    const parsedStock = parseInt(stock)

    if (
      !stock.trim() ||
      isNaN(parsedStock) ||
      parsedStock < 0
    ) {
      errs.stock =
        'Stock is required and cannot be negative.'
    }

    const parsedLow = parseInt(lowStockAlert)

    if (
      lowStockAlert !== '' &&
      (isNaN(parsedLow) || parsedLow < 0)
    ) {
      errs.lowStockAlert =
        'Low stock alert cannot be negative.'
    }

    if (!category.trim()) {
      errs.category = 'Please select a category.'
    }

    setErrors(errs)

    return Object.keys(errs).length === 0
  }

  // ── Save ───────────────────────────────────────────────────────────────────

  async function handleSave() {
    if (!validate()) {
      toast.show(
        'Please complete the required fields before saving.',
        'error',
      )

      setTimeout(() => {
        const firstError = document.querySelector(
          '.adm-input--error, .adm-cat-picker-input.adm-input--error',
        ) as HTMLElement | null

        if (firstError) {
          firstError.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })

          if ('focus' in firstError) {
            firstError.focus()
          }
        }
      }, 50)

      return
    }

    setSaving(true)

    try {
      const variantsJson =
        variantRows.length > 0
          ? JSON.stringify(
            variantRows.map((r) => ({
              key: r.key,
              combination: r.combination,
              price:
                parseFloat(r.price) ||
                parseFloat(price) ||
                0,
              stock: parseInt(r.stock) || 0,
              sku:
                r.sku ||
                generateSku(
                  r.combination,
                  name,
                ),
            })),
          )
          : null

      const storedBrands = getStoredBrands()

      const rawTags = tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .filter(
          (t) =>
            !storedBrands.some(
              (b) =>
                b.toLowerCase() ===
                t.toLowerCase(),
            ),
        )

      if (brand) {
        addStoredBrand(brand)
        rawTags.push(brand)
      }

      if (productType) {
        addStoredProductType(productType)
      }

      if (rawTags.length > 0) {
        addStoredTags(rawTags)
      }

      const finalTags = rawTags.join(', ')

      const payload = {
        name: name.trim(),
        description:
          description.trim() || undefined,
        category:
          category.trim() || undefined,
        price: parseFloat(price),
        compareAtPrice: compareAtPrice
          ? parseFloat(compareAtPrice)
          : null,
        stockQuantity:
          parseInt(stock) || 0,
        isActive,
        sku:
          sku.trim() || undefined,
        productType:
          productType || undefined,
        tags:
          finalTags || undefined,
        lowStockAlert:
          parseInt(lowStockAlert) || 5,
        variants: variantsJson,
        visualTheme: 'indigo',
        isFeatured: false,
      }

      const existingUrls = images.filter(
        (img): img is string =>
          typeof img === 'string',
      )

      const pendingFiles = images.filter(
        (img): img is File =>
          img instanceof File,
      )

      let targetId = savedId

      if (mode === 'create') {
        const created = await createProduct(
          payload,
        )

        targetId = created.id
        setSavedId(created.id)
      } else if (targetId) {
        await updateProduct(
          targetId,
          payload,
        )
      }

      let finalUrls = existingUrls

      if (
        pendingFiles.length > 0 &&
        targetId
      ) {
        const uploadedUrls =
          await uploadProductImages(
            targetId,
            pendingFiles,
          )

        finalUrls = [
          ...existingUrls,
          ...uploadedUrls,
        ]
      }

      if (
        targetId &&
        !urlsEqual(
          finalUrls,
          savedImageUrlsRef.current,
        )
      ) {
        await updateProductImages(
          targetId,
          finalUrls,
        )

        savedImageUrlsRef.current =
          finalUrls
      }

      toast.show(
        mode === 'create'
          ? 'Product created!'
          : 'Product updated!',
        'success',
      )

      navigateTo('#/admin/products')
    } catch (err) {
      toast.show(
        (err as Error).message ||
        'Save failed. Please try again.',
        'error',
      )
    } finally {
      setSaving(false)
    }
  }

  // ── Option helpers ─────────────────────────────────────────────────────────

  function addOption() {
    const usedNames = new Set(
      options.map((o) => o.name),
    )

    const nextName =
      OPTION_NAMES.find(
        (n) => !usedNames.has(n),
      ) ?? `Option ${options.length + 1}`

    setOptions((prev) => [
      ...prev,
      {
        id: uid(),
        name: nextName,
        values: [],
      },
    ])

    setVariantsOpen(true)
  }

  function removeOption(id: string) {
    setOptions((prev) =>
      prev.filter((o) => o.id !== id),
    )
  }

  function setOptionName(
    id: string,
    name: string,
  ) {
    setOptions((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, name }
          : o,
      ),
    )
  }

  function startEditingChip(optId: string, value: string) {
    setEditingChip({ optId, value })
    setEditChipInput(value)
  }

  function cancelChipEdit() {
    setEditingChip(null)
    setEditChipInput('')
  }

  function commitChipEdit(optId: string, oldValue: string) {
    if (isCommittingChipRef.current) return
    isCommittingChipRef.current = true

    const trimmed = editChipInput.trim()
    setEditingChip(null)

    if (!trimmed || trimmed === oldValue) {
      setEditChipInput('')
      isCommittingChipRef.current = false
      return
    }

    const opt = options.find((o) => o.id === optId)
    if (!opt) {
      setEditChipInput('')
      isCommittingChipRef.current = false
      return
    }

    // Duplicate values inside the same option must not be allowed
    if (opt.values.includes(trimmed)) {
      setEditChipInput('')
      isCommittingChipRef.current = false
      return
    }

    const optName = opt.name

    // Update variantRows combination and key to preserve price, stock, and sku
    setVariantRows((prevRows) =>
      prevRows.map((r) => {
        if (r.combination[optName] === oldValue) {
          const updatedCombo = { ...r.combination, [optName]: trimmed }
          const newKey = options
            .filter((o) => o.values.length > 0)
            .map((o) =>
              o.id === optId ? trimmed : r.combination[o.name] || '',
            )
            .join(' / ')
          return {
            ...r,
            key: newKey,
            combination: updatedCombo,
          }
        }
        return r
      }),
    )

    // Update options values
    setOptions((prevOpts) =>
      prevOpts.map((o) =>
        o.id === optId
          ? {
              ...o,
              values: o.values.map((v) => (v === oldValue ? trimmed : v)),
            }
          : o,
      ),
    )

    setEditChipInput('')
    setTimeout(() => {
      isCommittingChipRef.current = false
    }, 50)
  }

  function removeValue(
    optId: string,
    val: string,
  ) {
    if (editingChip?.optId === optId && editingChip?.value === val) {
      setEditingChip(null)
      setEditChipInput('')
    }
    setOptions((prev) =>
      prev.map((o) =>
        o.id === optId
          ? {
            ...o,
            values: o.values.filter(
              (v) => v !== val,
            ),
          }
          : o,
      ),
    )
  }

  function commitNewValue(optId: string) {
    const val = newValueInput.trim()

    if (!val) {
      setAddingValueFor(null)
      setNewValueInput('')
      return
    }

    setOptions((prev) =>
      prev.map((o) =>
        o.id === optId &&
          !o.values.includes(val)
          ? {
            ...o,
            values: [
              ...o.values,
              val,
            ],
          }
          : o,
      ),
    )

    setNewValueInput('')

    setTimeout(
      () => newValueRef.current?.focus(),
      0,
    )
  }

  function setVariantField(
    key: string,
    field:
      | 'price'
      | 'stock'
      | 'sku',
    val: string,
  ) {
    setVariantRows((prev) =>
      prev.map((r) =>
        r.key === key
          ? {
            ...r,
            [field]: val,
          }
          : r,
      ),
    )
  }

  // ── Image handler ─────────────────────────────────────────────────────────

  function handleImageError(msg: string) {
    toast.show(msg, 'error')
  }

  // ── Loading skeleton ──────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="adm-add-page">
        <div
          className="adm-state-box"
          style={{ minHeight: 280 }}
        >
          <span
            className="adm-spinner"
            role="status"
            aria-label="Loading product"
          />

          <p className="adm-state-box__text">
            Loading product…
          </p>
        </div>
      </div>
    )
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="adm-add-page">
      <div className="adm-add-page__header">
        <div className="adm-add-page__header-left">
          <button
            type="button"
            className="adm-add-page__back-btn"
            onClick={() =>
              navigateTo('#/admin/products')
            }
          >
            <BackArrowIcon />

            {mode === 'create'
              ? 'Add Product'
              : 'Edit Product'}
          </button>

          <p className="adm-add-page__subtitle">
            {mode === 'create'
              ? 'Add a new product to your store.'
              : 'Update the product details below.'}
          </p>
        </div>
      </div>

      <div className="adm-add-page__body">
        {/* ════ LEFT — main form ════════════════════════════════════════════ */}

        <div className="adm-add-page__main">
          <section className="adm-form-card">
            <div className="adm-field">
              <div className="adm-form-card__header-row">
                <h2 className="adm-form-card__title">
                  Product Images{' '}
                  <span className="adm-field__label--req">
                    *
                  </span>
                </h2>

                <InfoTooltip text="Upload up to 5 images (JPG, PNG, or WebP). Drag to reorder. The first image becomes the primary cover." />
              </div>

              <ImageUploader
                images={images}
                onChange={setImages}
                productId={savedId}
                onError={handleImageError}
              />

              <p className="adm-uploader__caption">
                You can upload up to 5 images.
                Drag to reorder.
              </p>
            </div>

            <div className="adm-form-row">
              <div className="adm-field adm-name-field-wrap" ref={nameDropdownRef}>
                <label
                  className="adm-field__label adm-field__label--req"
                  htmlFor="prod-name"
                >
                  Product Name
                </label>

                <div className="adm-cat-picker-control-wrap">
                  <input
                    id="prod-name"
                    type="text"
                    className={`adm-input${errors.name
                        ? ' adm-input--error'
                        : ''
                      }`}
                    placeholder="Search or enter product name..."
                    maxLength={180}
                    value={name}
                    onFocus={() => setNameFocused(true)}
                    onChange={(e) => {
                      setName(e.target.value)
                      setNameFocused(true)

                      if (errors.name) {
                        setErrors((p) => ({
                          ...p,
                          name: '',
                        }))
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setNameFocused(false)
                      }
                    }}
                  />

                  {nameFocused && nameSuggestions.length > 0 && (
                    <div className="adm-cat-attached-dropdown" onClick={(e) => e.stopPropagation()}>
                      <div className="adm-cat-attached-dropdown__body">
                        {nameSuggestions.map((item) => {
                          const isSelected = name.toLowerCase() === item.name.toLowerCase()
                          return (
                            <button
                              key={item.id}
                              type="button"
                              className={`adm-brand-dropdown__item${isSelected ? ' adm-brand-dropdown__item--selected' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                setName(item.name)
                                setNameFocused(false)
                                if (errors.name) {
                                  setErrors((p) => ({
                                    ...p,
                                    name: '',
                                  }))
                                }
                              }}
                            >
                              <span className="adm-brand-dropdown__radio">
                                {isSelected ? '●' : '○'}
                              </span>
                              <span className="adm-brand-dropdown__name">{item.name}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {errors.name && (
                  <p className="adm-field__error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="adm-field adm-brand-field-wrap" ref={brandDropdownRef}>
                <label
                  className="adm-field__label"
                  htmlFor="prod-brand"
                >
                  Brand
                </label>

                <div className="adm-cat-picker-control-wrap">
                  <div
                    id="prod-brand"
                    className={`adm-cat-picker-input${brand
                        ? ' adm-cat-picker-input--has-value'
                        : ''
                      }${brandDropdownOpen ? ' adm-cat-picker-input--open' : ''}`}
                    onClick={() => {
                      if (!brandDropdownOpen) {
                        setBrandDropdownOpen(true)
                        setBrandSearch('')
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (
                        e.key === 'Enter' ||
                        e.key === ' '
                      ) {
                        if (!brandDropdownOpen) {
                          e.preventDefault()
                          setBrandDropdownOpen(true)
                          setBrandSearch('')
                        }
                      }
                    }}
                  >
                    {brandDropdownOpen ? (
                      <div className="adm-cat-picker-search-wrap">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="adm-cat-picker-search-icon"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                          ref={brandSearchInputRef}
                          type="text"
                          className="adm-cat-picker-search-input"
                          placeholder="Search brands…"
                          value={brandSearch}
                          autoFocus
                          onChange={(e) => setBrandSearch(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && brandSearch.trim()) {
                              e.preventDefault()
                              const trimmed = brandSearch.trim()
                              addStoredBrand(trimmed)
                              setBrandsList(getStoredBrands())
                              setBrand(trimmed)
                              setBrandDropdownOpen(false)
                              setBrandSearch('')
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <span className="adm-cat-picker-value">
                        {brand || (
                          <span className="adm-cat-picker-placeholder">
                            Select brand
                          </span>
                        )}
                      </span>
                    )}

                    <div className="adm-cat-picker-actions">
                      {brand && !brandDropdownOpen && (
                        <button
                          type="button"
                          className="adm-cat-picker-clear"
                          onClick={(e) => {
                            e.stopPropagation()
                            setBrand('')
                          }}
                          aria-label="Clear brand"
                        >
                          ✕
                        </button>
                      )}

                      <span className={`adm-cat-picker-chevron${brandDropdownOpen ? ' adm-cat-picker-chevron--open' : ''}`}>
                        ▾
                      </span>
                    </div>
                  </div>

                  {brandDropdownOpen && (
                    <div className="adm-cat-attached-dropdown" onClick={(e) => e.stopPropagation()}>
                      <div className="adm-cat-attached-dropdown__body">
                        {brandsList
                          .filter((b) =>
                            b.toLowerCase().includes(brandSearch.toLowerCase().trim()),
                          )
                          .map((b) => {
                            const isSelected = brand.toLowerCase() === b.toLowerCase()
                            return (
                              <button
                                key={b}
                                type="button"
                                className={`adm-brand-dropdown__item${isSelected ? ' adm-brand-dropdown__item--selected' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setBrand(b)
                                  setBrandDropdownOpen(false)
                                  setBrandSearch('')
                                }}
                              >
                                <span className="adm-brand-dropdown__radio">
                                  {isSelected ? '●' : '○'}
                                </span>
                                <span className="adm-brand-dropdown__name">{b}</span>
                              </button>
                            )
                          })}

                        {brandsList.filter((b) =>
                          b.toLowerCase().includes(brandSearch.toLowerCase().trim()),
                        ).length === 0 && (
                          <div className="adm-brand-dropdown__empty">
                            No brands found matching &ldquo;{brandSearch}&rdquo;
                          </div>
                        )}
                      </div>

                      <div className="adm-brand-dropdown__footer">
                        {isAddingNewBrand ? (
                          <div className="adm-brand-dropdown__inline-form" onClick={(e) => e.stopPropagation()}>
                            <div className="adm-brand-dropdown__inline-row">
                              <input
                                ref={newBrandInputRef}
                                type="text"
                                className="adm-brand-dropdown__inline-input"
                                placeholder="Enter brand name..."
                                value={newBrandInput}
                                autoFocus
                                onChange={(e) => {
                                  setNewBrandInput(e.target.value)
                                  if (brandError) setBrandError('')
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleCreateNewBrand()
                                  } else if (e.key === 'Escape') {
                                    e.preventDefault()
                                    setIsAddingNewBrand(false)
                                    setBrandError('')
                                  }
                                }}
                              />
                              <button
                                type="button"
                                className="adm-brand-dropdown__inline-confirm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCreateNewBrand()
                                }}
                              >
                                Add
                              </button>
                              <button
                                type="button"
                                className="adm-brand-dropdown__inline-cancel"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setIsAddingNewBrand(false)
                                  setBrandError('')
                                }}
                                aria-label="Cancel adding brand"
                              >
                                ✕
                              </button>
                            </div>
                            {brandError && (
                              <span className="adm-brand-dropdown__inline-error">{brandError}</span>
                            )}
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="adm-brand-dropdown__add-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              setIsAddingNewBrand(true)
                              setNewBrandInput(brandSearch.trim())
                              setBrandError('')
                            }}
                          >
                            + Add {brandSearch.trim() ? `"${brandSearch.trim()}"` : 'new brand'}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="adm-field">
              <label
                className="adm-field__label"
                htmlFor="prod-desc"
              >
                Description
              </label>

              <RichTextEditor
                value={description}
                onChange={setDescription}
                maxLength={500}
                placeholder="Our premium cotton t-shirt is designed for everyday comfort and style..."
                error={errors.description}
              />
            </div>

            <div className="adm-form-row">
              <div className="adm-field">
                <label
                  className="adm-field__label adm-field__label--req"
                  htmlFor="prod-price"
                >
                  Price
                </label>

                <div className="adm-input-prefix-wrap">
                  <span className="adm-input-prefix">
                    ₹
                  </span>

                  <input
                    id="prod-price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    className={`adm-input adm-input--prefixed${errors.price
                        ? ' adm-input--error'
                        : ''
                      }`}
                    placeholder="799"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value)

                      if (errors.price) {
                        setErrors((p) => ({
                          ...p,
                          price: '',
                        }))
                      }
                    }}
                  />
                </div>

                {errors.price && (
                  <p className="adm-field__error">
                    {errors.price}
                  </p>
                )}
              </div>

              <div className="adm-field">
                <div className="adm-field__label-with-info">
                  <label
                    className="adm-field__label"
                    htmlFor="prod-compare"
                  >
                    Compare-at Price
                  </label>

                  <InfoTooltip text="Original price before discount. Displayed as a strikethrough price." />
                </div>

                <div className="adm-input-prefix-wrap">
                  <span className="adm-input-prefix">
                    ₹
                  </span>

                  <input
                    id="prod-compare"
                    type="number"
                    min="0"
                    step="0.01"
                    className="adm-input adm-input--prefixed"
                    placeholder="999"
                    value={compareAtPrice}
                    onChange={(e) =>
                      setCompareAtPrice(
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
            </div>

            <div className="adm-form-row adm-form-row--3col">
              <div className="adm-field adm-cat-field-wrap" ref={catDropdownRef}>
                <label
                  className="adm-field__label adm-field__label--req"
                  htmlFor="prod-cat"
                >
                  Category
                </label>

                <div className="adm-cat-picker-control-wrap">
                  <div
                    id="prod-cat"
                    className={`adm-cat-picker-input${errors.category
                        ? ' adm-input--error'
                        : ''
                      }${category
                        ? ' adm-cat-picker-input--has-value'
                        : ''
                      }${catDropdownOpen ? ' adm-cat-picker-input--open' : ''}`}
                    onClick={() => {
                      if (!catDropdownOpen) {
                        setCatDropdownOpen(true)
                        setCatSearch('')
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (
                        e.key === 'Enter' ||
                        e.key === ' '
                      ) {
                        if (!catDropdownOpen) {
                          e.preventDefault()
                          setCatDropdownOpen(true)
                          setCatSearch('')
                        }
                      }
                    }}
                  >
                    {catDropdownOpen ? (
                      <div className="adm-cat-picker-search-wrap">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="adm-cat-picker-search-icon"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                          ref={catSearchInputRef}
                          type="text"
                          className="adm-cat-picker-search-input"
                          placeholder="Search categories…"
                          value={catSearch}
                          autoFocus
                          onChange={(e) => setCatSearch(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    ) : (
                      <span className="adm-cat-picker-value">
                        {category || (
                          <span className="adm-cat-picker-placeholder">
                            Select category
                          </span>
                        )}
                      </span>
                    )}

                    <div className="adm-cat-picker-actions">
                      {category && !catDropdownOpen && (
                        <button
                          type="button"
                          className="adm-cat-picker-clear"
                          onClick={(e) => {
                            e.stopPropagation()
                            setCategory('')
                          }}
                          aria-label="Clear category"
                        >
                          ✕
                        </button>
                      )}

                      <span className={`adm-cat-picker-chevron${catDropdownOpen ? ' adm-cat-picker-chevron--open' : ''}`}>
                        ▾
                      </span>
                    </div>
                  </div>

                  {catDropdownOpen && (
                    <CategorySelectorAttachedList
                      isOpen={catDropdownOpen}
                      search={catSearch}
                      onClose={() => {
                        setCatDropdownOpen(false)
                        setCatSearch('')
                      }}
                      onSelect={(cat) => {
                        setCategory(cat)
                        setCatDropdownOpen(false)
                        setCatSearch('')

                        if (errors.category) {
                          setErrors((p) => ({
                            ...p,
                            category: '',
                          }))
                        }
                      }}
                      currentValue={category}
                    />
                  )}
                </div>

                {errors.category && (
                  <p className="adm-field__error">
                    {errors.category}
                  </p>
                )}
              </div>

              <div className="adm-field adm-ptype-field-wrap" ref={prodTypeDropdownRef}>
                <label
                  className="adm-field__label"
                  htmlFor="prod-type"
                >
                  Product Type
                </label>

                <div className="adm-cat-picker-control-wrap">
                  <div
                    id="prod-type"
                    className={`adm-cat-picker-input${productType
                        ? ' adm-cat-picker-input--has-value'
                        : ''
                      }${prodTypeDropdownOpen ? ' adm-cat-picker-input--open' : ''}`}
                    onClick={() => {
                      if (!prodTypeDropdownOpen) {
                        setProdTypeDropdownOpen(true)
                        setProdTypeSearch('')
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (
                        e.key === 'Enter' ||
                        e.key === ' '
                      ) {
                        if (!prodTypeDropdownOpen) {
                          e.preventDefault()
                          setProdTypeDropdownOpen(true)
                          setProdTypeSearch('')
                        }
                      }
                    }}
                  >
                    {prodTypeDropdownOpen ? (
                      <div className="adm-cat-picker-search-wrap">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="adm-cat-picker-search-icon"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                          ref={prodTypeSearchInputRef}
                          type="text"
                          className="adm-cat-picker-search-input"
                          placeholder="Search product types…"
                          value={prodTypeSearch}
                          autoFocus
                          onChange={(e) => setProdTypeSearch(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && prodTypeSearch.trim()) {
                              e.preventDefault()
                              const trimmed = prodTypeSearch.trim()
                              addStoredProductType(trimmed)
                              setProductTypesList(getStoredProductTypes())
                              setProductType(trimmed)
                              setProdTypeDropdownOpen(false)
                              setProdTypeSearch('')
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <span className="adm-cat-picker-value">
                        {productType || (
                          <span className="adm-cat-picker-placeholder">
                            Select product type
                          </span>
                        )}
                      </span>
                    )}

                    <div className="adm-cat-picker-actions">
                      {productType && !prodTypeDropdownOpen && (
                        <button
                          type="button"
                          className="adm-cat-picker-clear"
                          onClick={(e) => {
                            e.stopPropagation()
                            setProductType('')
                          }}
                          aria-label="Clear product type"
                        >
                          ✕
                        </button>
                      )}

                      <span className={`adm-cat-picker-chevron${prodTypeDropdownOpen ? ' adm-cat-picker-chevron--open' : ''}`}>
                        ▾
                      </span>
                    </div>
                  </div>

                  {prodTypeDropdownOpen && (
                    <div className="adm-cat-attached-dropdown" onClick={(e) => e.stopPropagation()}>
                      <div className="adm-cat-attached-dropdown__body">
                        {productTypesList
                          .filter((pt) =>
                            pt.toLowerCase().includes(prodTypeSearch.toLowerCase().trim()),
                          )
                          .map((pt) => {
                            const isSelected = productType.toLowerCase() === pt.toLowerCase()
                            return (
                              <button
                                key={pt}
                                type="button"
                                className={`adm-brand-dropdown__item${isSelected ? ' adm-brand-dropdown__item--selected' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setProductType(pt)
                                  setProdTypeDropdownOpen(false)
                                  setProdTypeSearch('')
                                }}
                              >
                                <span className="adm-brand-dropdown__radio">
                                  {isSelected ? '●' : '○'}
                                </span>
                                <span className="adm-brand-dropdown__name">{pt}</span>
                              </button>
                            )
                          })}

                        {productTypesList.filter((pt) =>
                          pt.toLowerCase().includes(prodTypeSearch.toLowerCase().trim()),
                        ).length === 0 && (
                          <div className="adm-brand-dropdown__empty">
                            No product types found matching &ldquo;{prodTypeSearch}&rdquo;
                          </div>
                        )}
                      </div>

                      <div className="adm-brand-dropdown__footer">
                        {isAddingNewProdType ? (
                          <div className="adm-brand-dropdown__inline-form" onClick={(e) => e.stopPropagation()}>
                            <div className="adm-brand-dropdown__inline-row">
                              <input
                                ref={newProdTypeInputRef}
                                type="text"
                                className="adm-brand-dropdown__inline-input"
                                placeholder="Enter product type..."
                                value={newProdTypeInput}
                                autoFocus
                                onChange={(e) => {
                                  setNewProdTypeInput(e.target.value)
                                  if (prodTypeError) setProdTypeError('')
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleCreateNewProdType()
                                  } else if (e.key === 'Escape') {
                                    e.preventDefault()
                                    setIsAddingNewProdType(false)
                                    setProdTypeError('')
                                  }
                                }}
                              />
                              <button
                                type="button"
                                className="adm-brand-dropdown__inline-confirm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCreateNewProdType()
                                }}
                              >
                                Add
                              </button>
                              <button
                                type="button"
                                className="adm-brand-dropdown__inline-cancel"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setIsAddingNewProdType(false)
                                  setProdTypeError('')
                                }}
                                aria-label="Cancel adding product type"
                              >
                                ✕
                              </button>
                            </div>
                            {prodTypeError && (
                              <span className="adm-brand-dropdown__inline-error">{prodTypeError}</span>
                            )}
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="adm-brand-dropdown__add-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              setIsAddingNewProdType(true)
                              setNewProdTypeInput(prodTypeSearch.trim())
                              setProdTypeError('')
                            }}
                          >
                            + Add {prodTypeSearch.trim() ? `"${prodTypeSearch.trim()}"` : 'new product type'}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="adm-field adm-sku-field-wrap" ref={skuDropdownRef}>
                <label
                  className="adm-field__label"
                  htmlFor="prod-sku"
                >
                  SKU
                </label>

                <div className="adm-cat-picker-control-wrap">
                  <input
                    id="prod-sku"
                    type="text"
                    className={`adm-input${errors.sku ? ' adm-input--error' : ''}`}
                    placeholder="Enter SKU"
                    maxLength={120}
                    value={sku}
                    onFocus={() => setSkuFocused(true)}
                    onChange={(e) => {
                      setSku(e.target.value)
                      setSkuFocused(true)

                      if (errors.sku) {
                        setErrors((p) => ({
                          ...p,
                          sku: '',
                        }))
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setSkuFocused(false)
                      }
                    }}
                  />

                  {skuFocused && skuSuggestions.length > 0 && (
                    <div className="adm-cat-attached-dropdown" onClick={(e) => e.stopPropagation()}>
                      <div className="adm-cat-attached-dropdown__body">
                        {skuSuggestions.map((item) => {
                          const isSelected = sku.toLowerCase() === item.sku?.toLowerCase()
                          return (
                            <button
                              key={item.id}
                              type="button"
                              className={`adm-brand-dropdown__item${isSelected ? ' adm-brand-dropdown__item--selected' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                if (item.sku) setSku(item.sku)
                                setSkuFocused(false)
                                if (errors.sku) {
                                  setErrors((p) => ({
                                    ...p,
                                    sku: '',
                                  }))
                                }
                              }}
                            >
                              <span className="adm-brand-dropdown__radio">
                                {isSelected ? '●' : '○'}
                              </span>
                              <span className="adm-brand-dropdown__name">{item.sku}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {errors.sku ? (
                  <p className="adm-field__error">{errors.sku}</p>
                ) : (
                  <p className="adm-field__hint">
                    e.g. TSHIRT-BLK-M
                  </p>
                )}
              </div>
            </div>

            <div className="adm-form-row">
              <div className="adm-field">
                <label
                  className="adm-field__label adm-field__label--req"
                  htmlFor="prod-stock"
                >
                  Stock
                </label>

                <input
                  id="prod-stock"
                  type="number"
                  min="0"
                  className={`adm-input${errors.stock
                      ? ' adm-input--error'
                      : ''
                    }`}
                  placeholder="Enter stock quantity"
                  value={stock}
                  onChange={(e) => {
                    setStock(e.target.value)

                    if (errors.stock) {
                      setErrors((p) => ({
                        ...p,
                        stock: '',
                      }))
                    }
                  }}
                />

                {errors.stock && (
                  <p className="adm-field__error">
                    {errors.stock}
                  </p>
                )}
              </div>

              <div className="adm-field">
                <div className="adm-field__label-with-info">
                  <label
                    className="adm-field__label"
                    htmlFor="prod-low"
                  >
                    Low Stock Alert{' '}
                    <span className="adm-field__optional">
                      (optional)
                    </span>
                  </label>

                  <InfoTooltip text="Receive inventory alerts when quantity drops to or below this number." />
                </div>

                <input
                  id="prod-low"
                  type="number"
                  min="0"
                  className={`adm-input${errors.lowStockAlert
                      ? ' adm-input--error'
                      : ''
                    }`}
                  placeholder="5"
                  value={lowStockAlert}
                  onChange={(e) => {
                    setLowStockAlert(
                      e.target.value,
                    )

                    if (
                      errors.lowStockAlert
                    ) {
                      setErrors((p) => ({
                        ...p,
                        lowStockAlert: '',
                      }))
                    }
                  }}
                />

                {errors.lowStockAlert ? (
                  <p className="adm-field__error">
                    {errors.lowStockAlert}
                  </p>
                ) : (
                  <p className="adm-field__hint">
                    Get notified when stock
                    falls below this number.
                  </p>
                )}
              </div>
            </div>

          {/* ── Product Variants ── */}

          <div className="adm-variants-card">
            <div className="adm-variants-header">
              <div className="adm-variants-header__left">
                <span className="adm-variants-header__icon">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                    <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2.5" />
                  </svg>
                </span>

                <div>
                  <h2 className="adm-variants-header__title">
                    Product Variants
                  </h2>

                  <p className="adm-variants-header__subtitle">
                    Add variants like size, color,
                    gender and age group.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="adm-variants-collapse-btn"
                onClick={() =>
                  setVariantsOpen((v) => !v)
                }
              >
                {variantsOpen
                  ? 'Collapse ⌃'
                  : 'Expand ⌄'}
              </button>
            </div>

            {variantsOpen && (
              <div className="adm-variants-body">
                <div className="adm-variants-options-list">
                  {options.map(
                    (opt, optIndex) => (
                      <div
                        key={opt.id}
                        className="adm-variant-row"
                      >
                        <span className="adm-variant-row__num">
                          {optIndex + 1}.{' '}
                          {opt.name}
                        </span>

                        <div className="adm-variant-row__dropdown-wrap">
                          <select
                            className="adm-select adm-variant-row__select"
                            value={opt.name}
                            onChange={(e) =>
                              setOptionName(
                                opt.id,
                                e.target.value,
                              )
                            }
                            aria-label={`Option ${optIndex + 1
                              } type`}
                          >
                            {OPTION_NAMES.map(
                              (n) => (
                                <option
                                  key={n}
                                  value={n}
                                >
                                  {n}
                                </option>
                              ),
                            )}
                          </select>
                        </div>

                        <div className="adm-variant-row__chips">
                          {opt.values.map(
                            (v) => {
                              const isEditing =
                                editingChip?.optId === opt.id &&
                                editingChip?.value === v

                              return (
                                <span
                                  key={v}
                                  className="adm-variant-chip"
                                >
                                  {colorSwatch(
                                    opt.name,
                                    isEditing ? editChipInput : v,
                                  ) && (
                                      <span
                                        className="adm-chip__color"
                                        style={{
                                          background:
                                            colorSwatch(
                                              opt.name,
                                              isEditing ? editChipInput : v,
                                            )!,
                                        }}
                                      />
                                    )}

                                  {isEditing ? (
                                    <input
                                      type="text"
                                      className="adm-chip-inline-input"
                                      value={editChipInput}
                                      size={Math.max(1, editChipInput.length || 1)}
                                      autoFocus
                                      onFocus={(e) => e.currentTarget.select()}
                                      onChange={(e) =>
                                        setEditChipInput(
                                          e.target.value,
                                        )
                                      }
                                      onKeyDown={(e) => {
                                        if (
                                          e.key ===
                                          'Enter'
                                        ) {
                                          e.preventDefault()
                                          commitChipEdit(
                                            opt.id,
                                            v,
                                          )
                                        } else if (
                                          e.key ===
                                          'Escape'
                                        ) {
                                          e.preventDefault()
                                          cancelChipEdit()
                                        }
                                      }}
                                      onBlur={() =>
                                        commitChipEdit(
                                          opt.id,
                                          v,
                                        )
                                      }
                                      onClick={(e) =>
                                        e.stopPropagation()
                                      }
                                    />
                                  ) : (
                                    <span
                                      className="adm-variant-chip__text"
                                      onClick={() =>
                                        startEditingChip(
                                          opt.id,
                                          v,
                                        )
                                      }
                                      title="Click to edit value"
                                    >
                                      {v}
                                    </span>
                                  )}

                                  <button
                                    type="button"
                                    className="adm-chip__remove"
                                    onClick={() =>
                                      removeValue(
                                        opt.id,
                                        v,
                                      )
                                    }
                                    aria-label={`Remove ${v}`}
                                  >
                                    <XIcon />
                                  </button>
                                </span>
                              )
                            },
                          )}

                          {addingValueFor ===
                            opt.id ? (
                            <span className="adm-chip-add-wrap">
                              <input
                                autoFocus
                                type="text"
                                className="adm-chip-input"
                                placeholder="Type & press Enter"
                                value={
                                  newValueInput
                                }
                                onChange={(
                                  e,
                                ) =>
                                  setNewValueInput(
                                    e
                                      .target
                                      .value,
                                  )
                                }
                                onKeyDown={(
                                  e,
                                ) => {
                                  if (
                                    e.key ===
                                    'Enter'
                                  ) {
                                    e.preventDefault()
                                    commitNewValue(
                                      opt.id,
                                    )
                                  } else if (
                                    e.key ===
                                    'Escape'
                                  ) {
                                    setAddingValueFor(
                                      null,
                                    )
                                    setNewValueInput(
                                      '',
                                    )
                                  }
                                }}
                                onBlur={() =>
                                  commitNewValue(
                                    opt.id,
                                  )
                                }
                              />
                            </span>
                          ) : (
                            <button
                              type="button"
                              className="adm-variant-add-value-btn"
                              onClick={() => {
                                setAddingValueFor(
                                  opt.id,
                                )
                                setNewValueInput(
                                  '',
                                )
                              }}
                            >
                              + Add value
                            </button>
                          )}
                        </div>

                        {options.length > 1 && (
                          <button
                            type="button"
                            className="adm-variant-row__remove-btn"
                            onClick={() => removeOption(opt.id)}
                            aria-label={`Remove option ${opt.name}`}
                            title="Remove option"
                          >
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                              <path d="M10 11v6M14 11v6" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ),
                  )}

                  <button
                    type="button"
                    className="adm-variant-add-other-box"
                    onClick={addOption}
                  >
                    + Add other variants
                  </button>
                </div>

                {variantRows.length > 0 && (
                  <div className="adm-variant-details">
                    <div className="adm-variant-details__header">
                      <h3 className="adm-variant-details__title">
                        2. Variant Details
                      </h3>
                      <p className="adm-variant-details__subtitle">
                        Variants will be created for all combinations of the above options.
                      </p>
                    </div>

                    <div className="adm-var-table-wrap">
                      <table className="adm-var-table">
                        <thead>
                          <tr>
                            <th style={{ minWidth: 200 }}>
                              Variant
                            </th>

                            <th style={{ width: 130 }}>
                              Price
                            </th>

                            <th style={{ width: 110 }}>
                              Stock
                            </th>

                            <th style={{ width: 180 }}>
                              SKU
                            </th>

                            <th
                              style={{
                                width: 90,
                                textAlign:
                                  'center',
                              }}
                            >
                              Actions
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {variantRows.map(
                            (row) => {
                              const colorInfo =
                                getVariantColorInfo(
                                  row.combination,
                                )

                              const iconColor =
                                colorInfo
                                  ? colorInfo.iconColor
                                  : '#64748B'

                              const iconBg =
                                colorInfo
                                  ? colorInfo.bg
                                  : '#F1F5F9'

                              const iconBorder =
                                colorInfo?.borderColor ??
                                '#E2E8F0'

                              return (
                                <tr
                                  key={
                                    row.key
                                  }
                                >
                                  <td>
                                    <div className="adm-var-label">
                                      <div
                                        className="adm-var-thumb"
                                        style={{
                                          borderColor:
                                            iconBorder,
                                        }}
                                      >
                                        <div
                                          className="adm-var-thumb__placeholder"
                                          style={{
                                            background:
                                              iconBg,
                                          }}
                                        >
                                          <CategoryIcon
                                            categoryPath={
                                              category || name || 't-shirt'
                                            }
                                            size={
                                              18
                                            }
                                            color={
                                              iconColor
                                            }
                                          />
                                        </div>
                                      </div>

                                      <span className="adm-var-text">
                                        {
                                          row.key
                                        }
                                      </span>
                                    </div>
                                  </td>

                                  <td>
                                    <div className="adm-input-prefix-wrap">
                                      <span className="adm-input-prefix">
                                        ₹
                                      </span>

                                      <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        className="adm-input adm-input--prefixed adm-var-input"
                                        placeholder={
                                          price ||
                                          '799'
                                        }
                                        value={
                                          row.price
                                        }
                                        onChange={(
                                          e,
                                        ) =>
                                          setVariantField(
                                            row.key,
                                            'price',
                                            e
                                              .target
                                              .value,
                                          )
                                        }
                                        aria-label={`Price for ${row.key}`}
                                      />
                                    </div>
                                  </td>

                                  <td>
                                    <input
                                      type="number"
                                      min="0"
                                      className="adm-input adm-var-input"
                                      placeholder="10"
                                      value={
                                        row.stock
                                      }
                                      onChange={(
                                        e,
                                      ) =>
                                        setVariantField(
                                          row.key,
                                          'stock',
                                          e
                                            .target
                                            .value,
                                        )
                                      }
                                      aria-label={`Stock for ${row.key}`}
                                    />
                                  </td>

                                  <td>
                                    <input
                                      type="text"
                                      className="adm-input adm-var-input"
                                      placeholder={generateSku(
                                        row.combination,
                                        name,
                                      )}
                                      value={
                                        row.sku
                                      }
                                      onChange={(
                                        e,
                                      ) =>
                                        setVariantField(
                                          row.key,
                                          'sku',
                                          e
                                            .target
                                            .value,
                                        )
                                      }
                                      aria-label={`SKU for ${row.key}`}
                                    />
                                  </td>

                                  <td>
                                    <div className="adm-var-actions">
                                      <button
                                        type="button"
                                        className="adm-var-action-btn adm-var-action-btn--edit"
                                        title="Edit Variant"
                                        onClick={() =>
                                          setEditingVariant(
                                            row,
                                          )
                                        }
                                      >
                                        <svg
                                          width="15"
                                          height="15"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="#5743F6"
                                          strokeWidth="2"
                                        >
                                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                      </button>

                                      <button
                                        type="button"
                                        className="adm-var-action-btn adm-var-action-btn--del"
                                        title="Delete Variant"
                                        onClick={() => {
                                          setVariantRows(
                                            (prev) =>
                                              prev.filter(
                                                (r) =>
                                                  r.key !==
                                                  row.key,
                                              ),
                                          )
                                        }}
                                      >
                                        <svg
                                          width="15"
                                          height="15"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="#EF4444"
                                          strokeWidth="2"
                                        >
                                          <polyline points="3 6 5 6 21 6" />
                                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        </svg>
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              )
                            },
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

          {/* ── Status ── */}

          <section className="adm-form-card">
            <div
              className="adm-field"
              style={{ margin: 0 }}
            >
              <label className="adm-field__label adm-field__label--req">
                Status
              </label>

              <div
                className="adm-status-cards-row"
                role="group"
                aria-label="Product status"
              >
                <button
                  type="button"
                  id="status-active"
                  className={`adm-status-card-btn${isActive
                      ? ' adm-status-card-btn--active'
                      : ''
                    }`}
                  onClick={() =>
                    setIsActive(true)
                  }
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>

                  Active
                </button>

                <button
                  type="button"
                  id="status-inactive"
                  className={`adm-status-card-btn${!isActive
                      ? ' adm-status-card-btn--inactive-sel'
                      : ''
                    }`}
                  onClick={() =>
                    setIsActive(false)
                  }
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                    />

                    <line
                      x1="4.93"
                      y1="4.93"
                      x2="19.07"
                      y2="19.07"
                    />
                  </svg>

                  Inactive
                </button>
              </div>
            </div>
          </section>

          {/* ── Footer action buttons ── */}

          <div className="adm-add-page__footer">
            <button
              type="button"
              className="adm-btn adm-btn--cancel-wide"
              onClick={() =>
                navigateTo('#/admin/products')
              }
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="button"
              id="save-product-btn"
              className="adm-btn adm-btn--save-wide"
              onClick={() => {
                void handleSave()
              }}
              disabled={saving}
            >
              {saving
                ? 'Saving…'
                : 'Save Product'}
            </button>
          </div>
        </div>

        {/* ════ RIGHT — preview + tips ══════════════════════════════════════ */}

        <aside className="adm-add-page__side">
          <div className="adm-form-card adm-preview-card">
            <h2 className="adm-form-card__title">
              Product Preview
            </h2>

            <p className="adm-form-card__subtitle">
              This is how your product will
              appear in the store.
            </p>

            <div className="adm-preview-image">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={name || 'Product preview'}
                />
              ) : (
                <div className="adm-preview-image__empty">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2.5" ry="2.5" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>No image uploaded</span>
                </div>
              )}
            </div>

            <div className="adm-preview-meta">
              <p className="adm-preview-meta__name">
                {name || 'Product Name'}
              </p>

              <div className="adm-preview-meta__price-row">
                <span className="adm-preview-meta__price">
                  ₹{' '}
                  {price
                    ? parseFloat(
                      price,
                    ).toLocaleString(
                      'en-IN',
                    )
                    : '0'}
                </span>

                {compareAtPrice && (
                  <del className="adm-preview-meta__compare">
                    ₹{' '}
                    {parseFloat(
                      compareAtPrice,
                    ).toLocaleString(
                      'en-IN',
                    )}
                  </del>
                )}
              </div>

              <div className="adm-preview-meta__badge-wrap">
                {!stock ||
                  parseInt(stock) >
                  (parseInt(
                    lowStockAlert,
                  ) || 5) ? (
                  <span className="adm-preview-badge adm-preview-badge--in-stock">
                    In Stock
                  </span>
                ) : parseInt(stock) >
                  0 ? (
                  <span className="adm-preview-badge adm-preview-badge--low-stock">
                    Low Stock
                  </span>
                ) : (
                  <span className="adm-preview-badge adm-preview-badge--out-of-stock">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Tips */}

          <div className="adm-form-card adm-tips-card">
            <div className="adm-tips-header">
              <span className="adm-tips-bulb">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5743F6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                </svg>
              </span>

              <h2 className="adm-tips-title">
                Quick Tips
              </h2>
            </div>

            <ul className="adm-tips-checklist">
              <li>
                <span className="adm-tip-check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5743F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>

                <span>
                  Use high-quality images for
                  better customer engagement.
                </span>
              </li>

              <li>
                <span className="adm-tip-check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5743F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>

                <span>
                  Add variants for size, color
                  or other options.
                </span>
              </li>

              <li>
                <span className="adm-tip-check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5743F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>

                <span>
                  Keep your stock updated to
                  avoid overselling.
                </span>
              </li>

              <li>
                <span className="adm-tip-check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5743F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>

                <span>
                  Write a clear and concise
                  description to highlight key
                  features.
                </span>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <EditVariantModal
        isOpen={editingVariant !== null}
        variant={editingVariant}
        categoryPath={category}
        onClose={() =>
          setEditingVariant(null)
        }
        onSave={(updated) => {
          setVariantRows((prev) =>
            prev.map((r) =>
              r.key === updated.key
                ? updated
                : r,
            ),
          )

          setEditingVariant(null)
        }}
      />





      <ToastList
        toasts={toast.toasts}
        onDismiss={toast.dismiss}
      />
    </div>
  )
}