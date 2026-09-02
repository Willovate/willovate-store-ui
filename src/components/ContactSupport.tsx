import { useState } from 'react'

interface ContactSupportProps {
  onClose: () => void
}

export default function ContactSupport({ onClose }: ContactSupportProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim()) {
      setError('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    setError(null)

    // Simulate sending the support request
    setTimeout(() => {
      setSubmitted(true)
      setIsSubmitting(false)
      // Auto-close after 3 seconds
      setTimeout(onClose, 3000)
    }, 1000)
  }

  return (
    <div className="contact-support-overlay" onClick={onClose}>
      <div className="contact-support-modal" onClick={(e) => e.stopPropagation()}>
        <div className="contact-support-header">
          <h2>Contact Support</h2>
          <button className="contact-close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {submitted ? (
          <div className="contact-success">
            <div className="contact-success-icon">✓</div>
            <h3>Thank you!</h3>
            <p>We've received your support request. Our team will get back to you within 24 hours.</p>
            <p className="contact-success-email">Check-in email: {formData.email}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            {error && <div className="contact-error">{error}</div>}

            <div className="form-group">
              <label htmlFor="contact-name">
                Name <span className="required">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">
                Email <span className="required">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">
                Subject <span className="required">*</span>
              </label>
              <select
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select a subject</option>
                <option value="technical-issue">Technical Issue</option>
                <option value="content-help">Content Help</option>
                <option value="design-question">Design Question</option>
                <option value="billing">Billing</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">
                Message <span className="required">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your issue or question..."
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Support Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
