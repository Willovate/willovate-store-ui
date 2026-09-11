import { useState } from 'react'

interface ContactSupportModalProps {
  onClose: () => void
}

export default function ContactSupportModal({ onClose }: ContactSupportModalProps) {
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    setIsSubmitting(true)
    
    // Mock the support request API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1000)
  }

  return (
    <div className="modal-overlay" style={styles.overlay}>
      <div className="modal-content" style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>Contact Support</h2>
          <button style={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div style={styles.body}>
          {isSuccess ? (
            <div style={styles.successState}>
              <div style={styles.successIcon}>✓</div>
              <h3>Message Sent Successfully!</h3>
              <p style={{ color: '#4a5568', marginTop: '0.5rem' }}>
                Our support team has received your query and will get back to you shortly.
              </p>
              <button style={styles.primaryBtn} onClick={onClose}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
                Need help with your workspace? Describe your issue below and our team will assist you.
              </p>
              <textarea
                autoFocus
                placeholder="How can we help you today?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={styles.textarea}
                rows={5}
                disabled={isSubmitting}
              />
              <div style={styles.footer}>
                <button type="button" onClick={onClose} style={styles.secondaryBtn} disabled={isSubmitting}>
                  Cancel
                </button>
                <button type="submit" style={styles.primaryBtn} disabled={isSubmitting || !message.trim()}>
                  {isSubmitting ? 'Sending...' : 'Submit Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column' as const
  },
  header: {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1a202c'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#a0aec0'
  },
  body: {
    padding: '1.5rem'
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '0.875rem',
    resize: 'vertical' as const,
    minHeight: '100px',
    fontFamily: 'inherit'
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    marginTop: '1.5rem'
  },
  primaryBtn: {
    backgroundColor: '#6b46c1',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer'
  },
  secondaryBtn: {
    backgroundColor: '#edf2f7',
    color: '#4a5568',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: 500,
    cursor: 'pointer'
  },
  successState: {
    textAlign: 'center' as const,
    padding: '2rem 1rem'
  },
  successIcon: {
    width: '48px',
    height: '48px',
    backgroundColor: '#c6f6d5',
    color: '#38a169',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    margin: '0 auto 1rem auto'
  }
}
