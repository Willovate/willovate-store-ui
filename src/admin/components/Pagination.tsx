interface PaginationProps {
  page: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
}

function pageRange(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '…', total]
  if (current >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '…', current - 1, current, current + 1, '…', total]
}

export function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const to   = Math.min(page * pageSize, totalItems)
  const pages = pageRange(page, Math.max(totalPages, 1))

  return (
    <div className="adm-pg-wrap">
      <span className="adm-pg-summary">
        Showing {from} to {to} of {totalItems} product{totalItems !== 1 ? 's' : ''}
      </span>
      <div className="adm-pg-controls">
        <button
          type="button"
          className="adm-pg-btn adm-pg-btn--arrow"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          ‹
        </button>

        {pages.map((item, idx) => {
          if (item === '…') {
            return (
              <span key={`el-${idx}`} className="adm-pg-ellipsis" aria-hidden="true">
                …
              </span>
            )
          }
          return (
            <button
              key={item}
              type="button"
              className={`adm-pg-btn${page === item ? ' adm-pg-btn--active' : ''}`}
              onClick={() => onPageChange(item)}
              aria-label={`Page ${item}`}
              aria-current={page === item ? 'page' : undefined}
            >
              {item}
            </button>
          )
        })}

        <button
          type="button"
          className="adm-pg-btn adm-pg-btn--arrow"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  )
}
