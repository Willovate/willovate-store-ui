interface ConfirmDialogProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  busy?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Delete',
  busy = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div className="adm-dialog-overlay" role="dialog" aria-modal="true" aria-labelledby="adm-dlg-title">
      <div className="adm-dialog">
        <h2 className="adm-dialog__title" id="adm-dlg-title">{title}</h2>
        <p className="adm-dialog__message">{message}</p>
        <div className="adm-dialog__actions">
          <button
            type="button"
            className="adm-btn adm-btn--outline"
            onClick={onCancel}
            disabled={busy}
          >
            Cancel
          </button>
          <button
            type="button"
            className="adm-btn adm-btn--danger"
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? 'Deleting…' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
