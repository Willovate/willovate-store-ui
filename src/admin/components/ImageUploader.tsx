import { useEffect, useRef } from 'react'
import { uploadProductImages } from '../../lib/api'

const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:5191').replace(/\/$/, '')
const MAX_IMAGES = 5

interface ImageUploaderProps {
  /**
   * Ordered list of images.
   * - `string`  → a persisted URL (relative or absolute)
   * - `File`    → a pending file that hasn't been uploaded yet (create mode)
   */
  images: (string | File)[]
  /** Called whenever the image list changes (add / remove). */
  onChange: (images: (string | File)[]) => void
  /**
   * Product ID — when provided new files are uploaded immediately and the
   * returned URL replaces the File in the list (edit mode).
   * When absent, File objects are queued and uploaded by the parent on save.
   */
  productId?: string
  onError?: (msg: string) => void
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function toAbsoluteUrl(url: string): string {
  return url.startsWith('http') ? url : `${API_URL}${url}`
}

/** Stable key for a list item so React doesn't thrash the DOM. */
function imgKey(img: string | File, i: number): string {
  if (typeof img === 'string') return `url-${i}-${img.slice(-24)}`
  return `file-${img.name}-${img.size}-${img.lastModified}`
}

// ── Component ─────────────────────────────────────────────────────────────────

export function ImageUploader({ images, onChange, productId, onError }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * Map of File → object URL used for in-browser previews.
   * Managed explicitly so we can revoke when a File is removed or replaced.
   */
  const blobMap = useRef<Map<File, string>>(new Map())

  // Revoke blob URLs for Files that are no longer in the list.
  useEffect(() => {
    const currentFiles = new Set(
      images.filter((img): img is File => img instanceof File),
    )
    blobMap.current.forEach((url, file) => {
      if (!currentFiles.has(file)) {
        URL.revokeObjectURL(url)
        blobMap.current.delete(file)
      }
    })
  }, [images])

  // Revoke all blob URLs on unmount.
  useEffect(() => {
    const map = blobMap.current
    return () => {
      map.forEach((url) => URL.revokeObjectURL(url))
      map.clear()
    }
  }, [])

  function previewSrc(img: string | File): string {
    if (typeof img === 'string') return toAbsoluteUrl(img)
    if (!blobMap.current.has(img)) {
      blobMap.current.set(img, URL.createObjectURL(img))
    }
    return blobMap.current.get(img)!
  }

  async function handleFiles(fileList: FileList) {
    const available = MAX_IMAGES - images.length
    if (available <= 0) {
      onError?.(`Maximum ${MAX_IMAGES} images allowed.`)
      return
    }

    const incoming = Array.from(fileList).slice(0, available)

    if (productId) {
      // ── Edit mode: upload immediately, swap in the returned URLs ──────────
      try {
        const newUrls = await uploadProductImages(productId, incoming)
        const combined = [...images, ...newUrls].slice(0, MAX_IMAGES)
        onChange(combined)
      } catch (err) {
        onError?.((err as Error).message)
      }
    } else {
      // ── Create mode: queue as File objects; parent uploads on save ─────────
      const combined = [...images, ...incoming].slice(0, MAX_IMAGES)
      onChange(combined)
    }
  }

  function remove(index: number) {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="adm-uploader">
      <div className="adm-uploader__grid">
        {images.map((img, i) => (
          <div key={imgKey(img, i)} className="adm-uploader__slot">
            <img src={previewSrc(img)} alt={`Product image ${i + 1}`} />
            <button
              type="button"
              className="adm-uploader__remove"
              onClick={() => remove(i)}
              aria-label={`Remove image ${i + 1}`}
            >
              ✕
            </button>
            {i === 0 && (
              <span className="adm-uploader__primary-tag">Main</span>
            )}
          </div>
        ))}

        {images.length < MAX_IMAGES && (
          <button
            type="button"
            className="adm-uploader__add"
            onClick={() => inputRef.current?.click()}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
              <path d="M12 12v9" />
              <path d="m16 16-4-4-4 4" />
            </svg>
            <span className="adm-uploader__add-title">Add Images</span>
            <span className="adm-uploader__add-sub">PNG, JPG up to 5MB</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        multiple
        className="sr-only"
        aria-label="Upload product images"
        onChange={(e) => {
          if (e.target.files?.length) {
            void handleFiles(e.target.files)
            e.target.value = ''
          }
        }}
      />
    </div>
  )
}
