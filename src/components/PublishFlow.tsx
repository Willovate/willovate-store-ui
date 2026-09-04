import { useState } from 'react'
import './PublishFlow.css'

type PublishState = 'idle' | 'confirm' | 'publishing' | 'success' | 'error'

const API_BASE_URL = 'http://localhost:5191'

export function PublishFlow({ onBack }: { onBack: () => void }) {
  const [state, setState] = useState<PublishState>('idle')

  const handlePublishClick = () => {
    // AC1: clicking Publish shows the confirmation
    setState('confirm')
  }

  const handleConfirmPublish = async () => {
    // AC2: begin publishing
    setState('publishing')

    try {
      const response = await fetch(`${API_BASE_URL}/api/Publish`, {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error(`Publish failed with status ${response.status}`)
      }

      // AC4: successful publishing
      setState('success')
    } catch {
      // AC8: publishing failure
      setState('error')
    }
  }

  const handleTryAgain = () => {
    setState('confirm')
  }

  const handleViewLiveWebsite = () => {
    // AC5: open the published site (replace with the real published URL when available)
    window.open('http://localhost:5173', '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="publish-shell">
      <header className="publish-topbar">
        <button className="publish-back" type="button" onClick={onBack}>
          ← Back to Workspace
        </button>
        <span className="publish-title">Preview</span>
        <div className="publish-actions">
          <button
            className="publish-button"
            type="button"
            onClick={handlePublishClick}
            disabled={state === 'publishing'}
          >
            🚀 Publish
          </button>
        </div>
      </header>

      <main className="publish-preview" aria-hidden={state !== 'idle'}>
        <p className="publish-preview-placeholder">Your website preview appears here.</p>
      </main>

      {state === 'confirm' && (
        <div className="publish-overlay" role="dialog" aria-modal="true" aria-label="Publish confirmation">
          <div className="publish-modal">
            <div className="publish-icon">🚀</div>
            <h2>Ready to publish your website?</h2>
            <p>Your website will be visible to visitors after publishing. Please review your website before publishing.</p>
            <div className="publish-modal-actions">
              <button type="button" className="publish-secondary" onClick={() => setState('idle')}>
                Back
              </button>
              <button type="button" className="publish-primary" onClick={handleConfirmPublish}>
                Publish Website
              </button>
            </div>
          </div>
        </div>
      )}

      {state === 'publishing' && (
        <div className="publish-overlay" role="status" aria-live="polite">
          <div className="publish-modal">
            <div className="publish-spinner" aria-hidden="true" />
            <h2>Publishing...</h2>
            <p>Please wait while we publish your website.</p>
          </div>
        </div>
      )}

      {state === 'success' && (
        <div className="publish-overlay" role="status" aria-live="polite">
          <div className="publish-modal">
            <div className="publish-icon publish-icon-success">✓</div>
            <h2>Your Website Is Live!</h2>
            <p>Your website has been successfully published and is now available to visitors.</p>
            <div className="publish-modal-actions">
              <button type="button" className="publish-primary" onClick={handleViewLiveWebsite}>
                View Live Website ↗
              </button>
              <button type="button" className="publish-secondary" onClick={onBack}>
                Back to Workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {state === 'error' && (
        <div className="publish-overlay" role="alert">
          <div className="publish-modal">
            <div className="publish-icon publish-icon-error">!</div>
            <h2>Publishing failed</h2>
            <p>Something went wrong while publishing your website. Please try again.</p>
            <div className="publish-modal-actions">
              <button type="button" className="publish-secondary" onClick={onBack}>
                Back to Workspace
              </button>
              <button type="button" className="publish-primary" onClick={handleTryAgain}>
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
