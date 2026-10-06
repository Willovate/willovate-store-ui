import { useEffect, useRef, useState } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  maxLength?: number
  placeholder?: string
  error?: string
}

const COLOR_PALETTE = [
  '#000000', '#1E2133', '#5743F6', '#2B975F', '#FE5C11', '#FC0D1C',
  '#3B82F6', '#8B5CF6', '#EC4899', '#6B7280', '#0284C7', '#059669',
]

export function RichTextEditor({
  value,
  onChange,
  maxLength = 500,
  placeholder = 'Describe your product…',
  error,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const isInternalChange = useRef(false)
  const [sourceMode, setSourceMode] = useState(false)
  const [sourceHtml, setSourceHtml] = useState(value)
  const [charCount, setCharCount] = useState(0)
  const [blockFormat, setBlockFormat] = useState('p')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showLinkModal, setShowLinkModal] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showImageModal, setShowImageModal] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  // Compute text character count
  function computeCharCount(html: string): number {
    const temp = document.createElement('div')
    temp.innerHTML = html
    return (temp.textContent || temp.innerText || '').trim().length
  }

  // Update editor innerHTML when external value changes
  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false
      return
    }
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value
    }
    setSourceHtml(value)
    setCharCount(computeCharCount(value))
  }, [value])

  function handleEditorInput() {
    if (!editorRef.current) return
    const html = editorRef.current.innerHTML
    const textLen = (editorRef.current.textContent || editorRef.current.innerText || '').length
    
    setCharCount(textLen)
    isInternalChange.current = true
    onChange(html)
    setSourceHtml(html)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    // Character limit enforcement
    if (editorRef.current) {
      const textLen = (editorRef.current.textContent || editorRef.current.innerText || '').length
      const isNavOrDelete = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End', 'Tab', 'Escape',
      ].includes(e.key) || e.ctrlKey || e.metaKey

      if (textLen >= maxLength && !isNavOrDelete && e.key.length === 1) {
        e.preventDefault()
      }
    }
  }

  function exec(command: string, value: string | undefined = undefined) {
    if (sourceMode) return
    document.execCommand(command, false, value)
    handleEditorInput()
    editorRef.current?.focus()
  }

  function handleFormatBlock(tag: string) {
    setBlockFormat(tag)
    if (tag === 'p') {
      exec('formatBlock', '<p>')
    } else if (tag === 'h1' || tag === 'h2' || tag === 'h3') {
      exec('formatBlock', `<${tag}>`)
    } else if (tag === 'blockquote') {
      exec('formatBlock', '<blockquote>')
    }
  }

  function handleAddLink() {
    if (!linkUrl.trim()) {
      setShowLinkModal(false)
      return
    }
    exec('createLink', linkUrl.trim())
    setLinkUrl('')
    setShowLinkModal(false)
  }

  function handleAddImage() {
    if (!imageUrl.trim()) {
      setShowImageModal(false)
      return
    }
    exec('insertImage', imageUrl.trim())
    setImageUrl('')
    setShowImageModal(false)
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      if (result) {
        exec('insertImage', result)
        setShowImageModal(false)
      }
    }
    reader.readAsDataURL(file)
  }

  function toggleSourceMode() {
    if (sourceMode) {
      // Switching from Source to Visual
      if (editorRef.current) {
        editorRef.current.innerHTML = sourceHtml
      }
      isInternalChange.current = true
      onChange(sourceHtml)
      setCharCount(computeCharCount(sourceHtml))
      setSourceMode(false)
    } else {
      // Switching from Visual to Source
      const currentHtml = editorRef.current?.innerHTML || value
      setSourceHtml(currentHtml)
      setSourceMode(true)
    }
  }

  return (
    <div className={`adm-rte-container${error ? ' adm-rte-container--error' : ''}`}>
      {/* ── Toolbar ── */}
      <div className="adm-rte-toolbar" role="toolbar" aria-label="Rich text formatting">
        {/* Paragraph / Heading Dropdown */}
        <div className="adm-rte-dropdown-wrap">
          <select
            className="adm-rte-select"
            value={blockFormat}
            disabled={sourceMode}
            onChange={(e) => handleFormatBlock(e.target.value)}
            aria-label="Text format"
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="blockquote">Quote</option>
          </select>
        </div>

        <span className="adm-rte-divider" />

        {/* Bold */}
        <button
          type="button"
          className="adm-rte-btn"
          disabled={sourceMode}
          title="Bold (Ctrl+B)"
          onClick={() => exec('bold')}
        >
          <span style={{ fontWeight: 800, fontSize: 14 }}>B</span>
        </button>

        {/* Italic */}
        <button
          type="button"
          className="adm-rte-btn"
          disabled={sourceMode}
          title="Italic (Ctrl+I)"
          onClick={() => exec('italic')}
        >
          <span style={{ fontStyle: 'italic', fontFamily: 'serif', fontWeight: 700, fontSize: 14 }}>I</span>
        </button>

        {/* Underline */}
        <button
          type="button"
          className="adm-rte-btn"
          disabled={sourceMode}
          title="Underline (Ctrl+U)"
          onClick={() => exec('underline')}
        >
          <span style={{ textDecoration: 'underline', fontWeight: 600, fontSize: 14 }}>U</span>
        </button>

        {/* Text Color */}
        <div className="adm-rte-color-wrap">
          <button
            type="button"
            className="adm-rte-btn adm-rte-color-btn"
            disabled={sourceMode}
            title="Text Color"
            onClick={() => setShowColorPicker((v) => !v)}
          >
            <span style={{ fontWeight: 700, fontSize: 13, borderBottom: '2px solid #5743F6' }}>A</span>
            <span style={{ fontSize: 9, marginLeft: 2 }}>▾</span>
          </button>

          {showColorPicker && (
            <div className="adm-rte-color-palette">
              {COLOR_PALETTE.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="adm-rte-color-swatch"
                  style={{ background: c }}
                  onClick={() => {
                    exec('foreColor', c)
                    setShowColorPicker(false)
                  }}
                  title={c}
                />
              ))}
            </div>
          )}
        </div>

        <span className="adm-rte-divider" />

        {/* Align Left */}
        <button
          type="button"
          className="adm-rte-btn"
          disabled={sourceMode}
          title="Align Left"
          onClick={() => exec('justifyLeft')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="17" y1="10" x2="3" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="17" y1="18" x2="3" y2="18" />
          </svg>
        </button>

        {/* Align Center */}
        <button
          type="button"
          className="adm-rte-btn"
          disabled={sourceMode}
          title="Align Center"
          onClick={() => exec('justifyCenter')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="10" x2="6" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="18" y1="18" x2="6" y2="18" />
          </svg>
        </button>

        {/* Align Right */}
        <button
          type="button"
          className="adm-rte-btn"
          disabled={sourceMode}
          title="Align Right"
          onClick={() => exec('justifyRight')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="21" y1="10" x2="7" y2="10" /><line x1="21" y1="6" x2="3" y2="6" /><line x1="21" y1="14" x2="3" y2="14" /><line x1="21" y1="18" x2="7" y2="18" />
          </svg>
        </button>

        <span className="adm-rte-divider" />

        {/* Link */}
        <button
          type="button"
          className="adm-rte-btn"
          disabled={sourceMode}
          title="Insert Link"
          onClick={() => setShowLinkModal(true)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </button>

        {/* Image */}
        <button
          type="button"
          className="adm-rte-btn"
          disabled={sourceMode}
          title="Insert Image"
          onClick={() => setShowImageModal(true)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </button>

        {/* Bullet List */}
        <button
          type="button"
          className="adm-rte-btn"
          disabled={sourceMode}
          title="Bulleted List"
          onClick={() => exec('insertUnorderedList')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </button>

        {/* Numbered List */}
        <button
          type="button"
          className="adm-rte-btn"
          disabled={sourceMode}
          title="Numbered List"
          onClick={() => exec('insertOrderedList')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="10" y1="6" x2="21" y2="6" /><line x1="10" y1="12" x2="21" y2="12" /><line x1="10" y1="18" x2="21" y2="18" />
            <path d="M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
          </svg>
        </button>

        <span className="adm-rte-divider" />

        {/* Undo */}
        <button
          type="button"
          className="adm-rte-btn"
          disabled={sourceMode}
          title="Undo (Ctrl+Z)"
          onClick={() => exec('undo')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </button>

        {/* Redo */}
        <button
          type="button"
          className="adm-rte-btn"
          disabled={sourceMode}
          title="Redo (Ctrl+Y)"
          onClick={() => exec('redo')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
        </button>

        {/* Code / Source Mode Toggle */}
        <button
          type="button"
          className={`adm-rte-btn adm-rte-btn--source${sourceMode ? ' adm-rte-btn--active' : ''}`}
          title="Source HTML"
          onClick={toggleSourceMode}
        >
          <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13 }}>&lt;/&gt;</span>
        </button>
      </div>

      {/* ── Content Area ── */}
      <div className="adm-rte-body-wrap">
        {sourceMode ? (
          <textarea
            className="adm-rte-source-textarea"
            value={sourceHtml}
            onChange={(e) => {
              setSourceHtml(e.target.value)
              onChange(e.target.value)
              setCharCount(computeCharCount(e.target.value))
            }}
            placeholder="<p>Enter HTML source…</p>"
            rows={6}
          />
        ) : (
          <div
            ref={editorRef}
            className="adm-rte-content"
            contentEditable
            suppressContentEditableWarning
            onInput={handleEditorInput}
            onKeyDown={handleKeyDown}
            data-placeholder={placeholder}
          />
        )}

        {/* ── Character Counter ── */}
        <div className="adm-rte-counter-wrap">
          <span className={`adm-rte-counter${charCount > maxLength ? ' adm-rte-counter--over' : ''}`}>
            {charCount}/{maxLength}
          </span>
        </div>
      </div>

      {/* ── Link Insertion Modal ── */}
      {showLinkModal && (
        <div className="adm-rte-modal-overlay" onClick={() => setShowLinkModal(false)}>
          <div className="adm-rte-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="adm-rte-modal__title">Insert Link</h3>
            <input
              type="url"
              className="adm-input"
              placeholder="https://example.com"
              value={linkUrl}
              autoFocus
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddLink()
                if (e.key === 'Escape') setShowLinkModal(false)
              }}
            />
            <div className="adm-rte-modal__actions">
              <button
                type="button"
                className="adm-btn adm-btn--ghost adm-btn--sm"
                onClick={() => setShowLinkModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="adm-btn adm-btn--primary adm-btn--sm"
                onClick={handleAddLink}
              >
                Apply Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Image Insertion Modal ── */}
      {showImageModal && (
        <div className="adm-rte-modal-overlay" onClick={() => setShowImageModal(false)}>
          <div className="adm-rte-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="adm-rte-modal__title">Insert Image in Description</h3>
            <div className="adm-rte-modal__field">
              <label className="adm-field__label" style={{ marginBottom: 4 }}>Image URL</label>
              <input
                type="url"
                className="adm-input"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div className="adm-rte-modal__divider">or upload from device</div>
            <div className="adm-rte-modal__field">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <div className="adm-rte-modal__actions">
              <button
                type="button"
                className="adm-btn adm-btn--ghost adm-btn--sm"
                onClick={() => setShowImageModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="adm-btn adm-btn--primary adm-btn--sm"
                onClick={handleAddImage}
                disabled={!imageUrl.trim()}
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
