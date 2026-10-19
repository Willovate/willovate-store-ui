import { useState } from 'react'
import { X, CheckCircle, Send, HelpCircle } from 'lucide-react'

interface ContactSupportModalProps {
  onClose: () => void
}

export default function ContactSupportModal({ onClose }: ContactSupportModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('general')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 900)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.5rem 0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: 7,
    fontSize: '0.875rem',
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#1a202c',
  }

  return (
    <div className="modal-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-box" style={{ maxWidth: 500 }}>
        <div className="modal-header">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HelpCircle size={18} color="#6b46c1" /> Contact Support
          </h2>
          <button className="modal-close" onClick={onClose} aria-label="Close"><X size={14} /></button>
        </div>

        <div className="modal-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <CheckCircle size={52} color="#38a169" />
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#1a202c', fontSize: '1.1rem' }}>Request Submitted!</h3>
              <p style={{ color: '#718096', fontSize: '0.875rem', margin: '0 0 1.5rem 0', lineHeight: 1.6 }}>
                Our support team has received your query and will get back to you within 24 hours.
              </p>
              <button
                onClick={onClose}
                style={{ padding: '0.6rem 1.75rem', background: '#6b46c1', color: '#fff', border: 'none', borderRadius: 7, fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ margin: 0, color: '#718096', fontSize: '0.875rem', lineHeight: 1.5 }}>
                Describe your issue below and our team will assist you shortly.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                    Your Name
                  </label>
                  <input style={inputStyle} placeholder="e.g. Nayan" value={name} onChange={e => setName(e.target.value)} disabled={submitting} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                    Email
                  </label>
                  <input style={inputStyle} type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} disabled={submitting} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                  Category
                </label>
                <select
                  style={{ ...inputStyle, appearance: 'none', background: '#fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\'%3E%3Cpath fill=\'%23718096\' d=\'M7 10l5 5 5-5H7z\'/%3E%3C/svg%3E") no-repeat right 0.75rem center', paddingRight: '2rem' }}
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  disabled={submitting}
                >
                  <option value="general">General Question</option>
                  <option value="template">Template Issue</option>
                  <option value="editor">Editor / Workspace</option>
                  <option value="ai">AI Assistant</option>
                  <option value="billing">Billing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                  Message <span style={{ color: '#e53e3e' }}>*</span>
                </label>
                <textarea
                  autoFocus
                  required
                  placeholder="Describe your issue or question in detail…"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={5}
                  disabled={submitting}
                  style={{ ...inputStyle, minHeight: 110, resize: 'vertical' }}
                />
                <div style={{ textAlign: 'right', fontSize: '0.7rem', color: '#a0aec0', marginTop: '0.25rem' }}>{message.length}/500</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', paddingTop: '0.25rem' }}>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={submitting}
                  style={{ padding: '0.55rem 1rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 7, fontSize: '0.8125rem', fontWeight: 600, color: '#4a5568', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !message.trim()}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1.25rem', background: '#6b46c1', color: '#fff', border: 'none', borderRadius: 7, fontSize: '0.8125rem', fontWeight: 700, cursor: 'pointer', opacity: (!message.trim() || submitting) ? 0.65 : 1 }}
                >
                  {submitting ? (
                    <><span style={{ display: 'inline-block', width: 12, height: 12, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'ws-spin 0.7s linear infinite' }} /> Sending…</>
                  ) : (
                    <><Send size={13} /> Submit Request</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
