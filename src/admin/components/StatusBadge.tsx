interface StatusBadgeProps {
  status: 'active' | 'inactive'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`adm-badge adm-badge--${status}`}>
      {status === 'active' ? 'Active' : 'Inactive'}
    </span>
  )
}
