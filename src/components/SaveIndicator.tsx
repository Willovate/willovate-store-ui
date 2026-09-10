import { Check, Save, AlertTriangle, Clock } from 'lucide-react'

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
      <div className="save-indicator" style={{ color: '#38a169' }}>
        <Check size={14} />
        All changes saved
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
    <div className="save-indicator" style={{ color: '#a0aec0', fontSize: '0.8rem' }}>
      <Save size={13} />
      Changes auto-saved
    </div>
  )
}
