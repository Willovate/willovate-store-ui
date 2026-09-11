interface SaveIndicatorProps {
  status: 'idle' | 'saving' | 'saved' | 'error'
  hasUnsavedChanges: boolean
  onSave: () => void
}

export default function SaveIndicator({ status, hasUnsavedChanges, onSave }: SaveIndicatorProps) {
  if (status === 'saving') {
    return <div className="save-indicator" style={{ color: '#718096' }}><span>⟳</span> Saving...</div>
  }

  if (status === 'error') {
    return <div className="save-indicator" style={{ color: '#e53e3e' }}><span>⚠</span> Save Failed</div>
  }

  if (hasUnsavedChanges) {
    return (
      <div className="save-indicator" style={{ color: '#d69e2e', cursor: 'pointer' }} onClick={onSave}>
        <span>●</span> Unsaved changes (Click to save)
      </div>
    )
  }

  return (
    <div className="save-indicator" style={{ color: '#38a169' }}>
      <span style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '18px', 
        height: '18px', 
        border: '1.5px solid #38a169', 
        borderRadius: '50%', 
        fontSize: '10px',
        fontWeight: 'bold'
      }}>✓</span> Saved
    </div>
  )
}
