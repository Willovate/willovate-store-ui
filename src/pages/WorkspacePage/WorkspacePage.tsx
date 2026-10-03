export interface WorkspacePageProps {
  selectedTemplateTitle: string
  onViewStore: () => void
  onBackToTemplates: () => void
}

export function WorkspacePage({
  selectedTemplateTitle,
  onViewStore,
  onBackToTemplates,
}: WorkspacePageProps) {
  return (
    <div
      style={{
        padding: '3.5rem 1.5rem',
        textAlign: 'center',
        fontFamily: 'sans-serif',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          background: '#ffffff',
          padding: '2.5rem',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h1
          style={{
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#0f172a',
            margin: '0 0 0.5rem 0',
          }}
        >
          Workspace Initialized!
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem', margin: '0 0 1.75rem 0' }}>
          Your <strong>{selectedTemplateTitle}</strong> template is loaded and ready for customization.
        </p>
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={onViewStore}
            style={{
              padding: '0.65rem 1.4rem',
              borderRadius: '8px',
              backgroundColor: '#16a34a',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            🛍️ View Live Store
          </button>
          <button
            type="button"
            onClick={onBackToTemplates}
            style={{
              padding: '0.65rem 1.4rem',
              borderRadius: '8px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            ← Back to Templates
          </button>
        </div>
      </div>
    </div>
  )
}

export default WorkspacePage

