import { AlertTriangle, Clock, CheckCircle2 } from 'lucide-react'

interface SaveIndicatorProps {
  status: 'idle' | 'saving' | 'saved' | 'error'
  hasUnsavedChanges: boolean
  onSave: () => void
}

export default function SaveIndicator({ status, hasUnsavedChanges, onSave }: SaveIndicatorProps) {
  if (status === 'saving') {
    return (
      <div className="save-indicator" style={{ color: '#d69e2e' }}>
        <span style={{ display: 'inline-block', animation: 'ws-spin 0.8s linear infinite', fontSize: '0.9rem' }}>↻</span>
        Saving…
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="save-indicator" style={{ color: '#e53e3e', cursor: 'pointer' }} onClick={onSave} title="Click to retry">
        <AlertTriangle size={14} />
        Save failed — Retry
      </div>
    )
  }

  if (status === 'saved') {
    return (
      <div className="save-indicator" style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.85rem' }}>
        <CheckCircle2 size={16} strokeWidth={2} />
        Saved
      </div>
    )
  }

  if (hasUnsavedChanges) {
    return (
      <button
        className="save-indicator"
        style={{ color: '#d69e2e', cursor: 'pointer', background: 'none', border: 'none', padding: 0, font: 'inherit', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, fontSize: '0.8rem' }}
        onClick={onSave}
        title="Click to save"
      >
        <Clock size={14} />
        Unsaved changes · Click to save
      </button>
    )
  }

  return (
    <div className="save-indicator" style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.85rem' }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
      Saved
    </div>
  )
}
