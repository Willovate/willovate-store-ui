import type { Toast } from '../hooks/useToast'

interface ToastListProps {
  toasts: Toast[]
  onDismiss: (id: number) => void
}

export function ToastList({ toasts, onDismiss }: ToastListProps) {
  if (toasts.length === 0) return null

  return (
    <div className="adm-toast-list" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`adm-toast adm-toast--${t.type}`}>
          <span className="adm-toast__icon">
            {t.type === 'success' ? '✓' : '✕'}
          </span>
          <span className="adm-toast__msg">{t.message}</span>
          <button
            type="button"
            className="adm-toast__close"
            onClick={() => onDismiss(t.id)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
