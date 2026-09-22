import type { StockStatus } from '../../types'

interface StockBadgeProps {
  quantity: number
  lowAlert: number
}

function getStatus(quantity: number, lowAlert: number): StockStatus {
  if (quantity === 0) return 'out-of-stock'
  if (quantity <= lowAlert) return 'low-stock'
  return 'in-stock'
}

const LABELS: Record<StockStatus, string> = {
  'in-stock': 'In Stock',
  'low-stock': 'Low Stock',
  'out-of-stock': 'Out of Stock',
}

export function StockBadge({ quantity, lowAlert }: StockBadgeProps) {
  const status = getStatus(quantity, lowAlert)
  return (
    <span className={`adm-stock-text adm-stock-text--${status}`}>
      {LABELS[status]}
    </span>
  )
}
