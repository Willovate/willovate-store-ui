import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { CategoryIcon, getVariantColorInfo } from './CategoryIconResolver'

export interface VariantRow {
  key: string
  combination: Record<string, string>
  price: string
  stock: string
  sku: string
}

interface EditVariantModalProps {
  isOpen: boolean
  variant: VariantRow | null
  categoryPath?: string
  onClose: () => void
  onSave: (updatedVariant: VariantRow) => void
}

export function EditVariantModal({
  isOpen,
  variant,
  categoryPath,
  onClose,
  onSave,
}: EditVariantModalProps): ReactNode {
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [sku, setSku] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (variant) {
      setPrice(variant.price ?? '')
      setStock(variant.stock ?? '')
      setSku(variant.sku ?? '')
      setErrors({})
    }
  }, [variant])

  if (!isOpen || !variant) return null

  const colorInfo = getVariantColorInfo(variant.combination)
  const iconColor = colorInfo ? colorInfo.iconColor : '#64748B'
  const iconBg = colorInfo ? colorInfo.bg : '#F1F5F9'
  const iconBorder = colorInfo?.borderColor ?? '#E2E8F0'

  function handleSave() {
    if (!variant) return
    const errs: Record<string, string> = {}
    const p = parseFloat(price)
    if (!price || isNaN(p) || p <= 0) {
      errs.price = 'Enter a valid price greater than 0.'
    }
    const s = parseInt(stock)
    if (stock === '' || isNaN(s) || s < 0) {
      errs.stock = 'Enter a valid non-negative stock quantity.'
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    onSave({
      ...variant,
      price: price.trim(),
      stock: stock.trim(),
      sku: sku.trim(),
    })
  }

  return (
    <div className="adm-modal-backdrop" onClick={onClose} style={{ zIndex: 1050 }}>
      <div className="adm-edit-var-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="adm-cat-modal__header">
          <div className="adm-edit-var-modal__title-wrap">
            <h2 className="adm-cat-modal__title">Edit Variant</h2>
            <div className="adm-edit-var-modal__badge">
              <div
                className="adm-var-thumb"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 4,
                  borderColor: iconBorder,
                }}
              >
                <div
                  className="adm-var-thumb__placeholder"
                  style={{ background: iconBg }}
                >
                  <CategoryIcon
                    categoryPath={categoryPath}
                    size={13}
                    color={iconColor}
                  />
                </div>
              </div>
              <span className="adm-edit-var-modal__key">{variant.key}</span>
            </div>
          </div>
          <button
            type="button"
            className="adm-cat-modal__close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="adm-edit-var-modal__body">
          {/* Price */}
          <div className="adm-field">
            <label className="adm-field__label adm-field__label--req" htmlFor="edit-var-price">
              Price
            </label>
            <div className="adm-input-prefix-wrap">
              <span className="adm-input-prefix">₹</span>
              <input
                id="edit-var-price"
                type="number"
                min="0.01"
                step="0.01"
                className={`adm-input adm-input--prefixed${errors.price ? ' adm-input--error' : ''}`}
                placeholder="0.00"
                value={price}
                autoFocus
                onChange={(e) => {
                  setPrice(e.target.value)
                  if (errors.price) setErrors((p) => ({ ...p, price: '' }))
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave()
                }}
              />
            </div>
            {errors.price && <p className="adm-field__error">{errors.price}</p>}
          </div>

          {/* Stock */}
          <div className="adm-field">
            <label className="adm-field__label adm-field__label--req" htmlFor="edit-var-stock">
              Stock
            </label>
            <input
              id="edit-var-stock"
              type="number"
              min="0"
              className={`adm-input${errors.stock ? ' adm-input--error' : ''}`}
              placeholder="10"
              value={stock}
              onChange={(e) => {
                setStock(e.target.value)
                if (errors.stock) setErrors((p) => ({ ...p, stock: '' }))
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave()
              }}
            />
            {errors.stock && <p className="adm-field__error">{errors.stock}</p>}
          </div>

          {/* SKU */}
          <div className="adm-field">
            <label className="adm-field__label" htmlFor="edit-var-sku">
              SKU
            </label>
            <input
              id="edit-var-sku"
              type="text"
              className="adm-input"
              placeholder="e.g. TSHIRT-S-WH-M-A"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave()
              }}
            />
          </div>
        </div>

        {/* Modal Footer */}
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
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
