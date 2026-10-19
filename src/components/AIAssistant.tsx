import { useState, useRef, useEffect } from 'react'

const API_BASE = 'http://localhost:5192'

interface AIAssistantProps {
  onClose: () => void
  onApplySuggestion: (suggestion: string, elementType: string) => void
  onApplyBanner?: (imageUrl: string) => void
  initialPrompt?: string
}

interface AiAction {
  type: string
  text?: string
  imageUrl?: string
  elementType: string
}

interface Message {
  type: 'user' | 'ai'
  content: string
  action?: AiAction
  applied?: boolean
  rejected?: boolean
}

export default function AIAssistant({ onClose, onApplySuggestion, onApplyBanner, initialPrompt }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content:
        "Hello! I'm your AI Assistant. I can help you with:\n• Write or change your page heading\n• Write a description for your store\n• Update your button text\n• Change the banner background image\n• Give you design & layout advice\n\nTry saying: \"Write a heading for my store\" or \"Change the banner image\"",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (initialPrompt && messages.length === 1) {
      handleSendMessage(initialPrompt)
    }
  }, [initialPrompt])

  const handleApply = (index: number) => {
    const msg = messages[index]
    if (!msg.action) return

    if (msg.action.type === 'update_banner' && msg.action.imageUrl && onApplyBanner) {
      onApplyBanner(msg.action.imageUrl)
    } else if (msg.action.text) {
      const elType = msg.action.type === 'update_heading' ? 'heading'
        : msg.action.type === 'update_button' ? 'button'
        : 'text'
      onApplySuggestion(msg.action.text, elType)
    }

    setMessages(prev =>
      prev.map((m, i) => (i === index ? { ...m, applied: true, rejected: false } : m)),
    )
  }

  const handleReject = (index: number) => {
    setMessages(prev =>
      prev.map((m, i) => (i === index ? { ...m, rejected: true, applied: false } : m)),
    )
  }

  const handleSendMessage = async (overrideText?: string) => {
    const text = (overrideText || input).trim()
    if (!text) return

    if (!overrideText) setInput('')
    setMessages(prev => [...prev, { type: 'user', content: text }])
    setIsLoading(true)

    try {
      const res = await fetch(`${API_BASE}/api/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      if (!res.ok) throw new Error('AI service error')
      const data = await res.json()

      setMessages(prev => [
        ...prev,
        {
          type: 'ai',
          content: data.reply,
          action: data.action ?? undefined,
        },
      ])
    } catch {
      // Intelligent Contextual Suggestions Fallback
      const lower = text.toLowerCase()
      let reply = "Here is a high-converting suggestion for your store:"
      let action: AiAction | undefined = undefined

      if (lower.includes('head') || lower.includes('title')) {
        reply = "Here is a captivating, Michelin-grade headline crafted to draw immediate attention:"
        action = {
          type: 'update_heading',
          text: 'Culinary Artistry Meets Fire & Passion.',
          elementType: 'heading',
        }
      } else if (lower.includes('desc') || lower.includes('about') || lower.includes('story')) {
        reply = "Here is an engaging brand story description emphasizing quality, craftsmanship, and local sourcing:"
        action = {
          type: 'update_description',
          text: 'Founded on the belief that real food brings people together, every dish is crafted with reverence for wild seasonal ingredients and time-honored techniques.',
          elementType: 'text',
        }
      } else if (lower.includes('button') || lower.includes('cta')) {
        reply = "Here is a high-converting call-to-action button label:"
        action = {
          type: 'update_button',
          text: 'Explore Menu & Reserve',
          elementType: 'button',
        }
      } else if (lower.includes('banner') || lower.includes('image')) {
        reply = "Here is a cinematic, ultra-sharp banner recommendation for your storefront:"
        action = {
          type: 'update_banner',
          imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85',
          elementType: 'banner',
        }
      } else {
        reply = "Here are key design best practices for a luxury, high-converting storefront:\n• Keep your hero headline concise and evocative (under 7 words).\n• Pair high-contrast typography with warm, atmospheric photography.\n• Use clear, single-action CTA buttons (e.g., 'Explore Menu' or 'Book a Table').\n• Feature your signature offerings prominently with clear pricing."
      }

      setMessages(prev => [
        ...prev,
        {
          type: 'ai',
          content: reply,
          action,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const getActionPreviewLabel = (action: AiAction) => {
    if (action.type === 'update_heading') return '📝 Heading'
    if (action.type === 'update_description') return '📄 Description'
    if (action.type === 'update_button') return '🔘 Button Text'
    if (action.type === 'update_banner') return '🖼️ Banner Image'
    return action.elementType
  }

  return (
    <div className="ai-assistant">
      <div className="ai-assistant-header">
        <h3>✨ AI Assistant</h3>
        <button className="ai-close-btn" onClick={onClose} aria-label="Close AI">✕</button>
      </div>

      <div className="ai-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`ai-message ai-message-${msg.type}`}>
            <div className="ai-message-content">
              {msg.content.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}

              {msg.action && !msg.applied && !msg.rejected && (
                <div className="ai-suggestion-card">
                  <div className="ai-suggestion-preview">
                    <span className="ai-suggestion-type">{getActionPreviewLabel(msg.action)}</span>
                    {msg.action.type === 'update_banner' && msg.action.imageUrl ? (
                      <img
                        src={msg.action.imageUrl}
                        alt="Suggested banner"
                        style={{
                          width: '100%',
                          height: 80,
                          objectFit: 'cover',
                          borderRadius: 6,
                          marginTop: 6,
                        }}
                      />
                    ) : (
                      <p>"{msg.action.text}"</p>
                    )}
                  </div>
                  <div className="ai-suggestion-actions">
                    <button className="ai-apply-btn" onClick={() => handleApply(idx)}>
                      Apply
                    </button>
                    <button className="ai-reject-btn" onClick={() => handleReject(idx)}>
                      Reject
                    </button>
                  </div>
                </div>
              )}

              {msg.applied && (
                <div className="ai-suggestion-status ai-suggestion-applied">
                  ✅ Applied to your page
                </div>
              )}

              {msg.rejected && (
                <div className="ai-suggestion-status ai-suggestion-rejected">
                  ✕ Suggestion dismissed
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="ai-message ai-message-ai">
            <div className="ai-loading">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="ai-input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handleSendMessage()
            }
          }}
          placeholder="Ask for help with your website…"
          disabled={isLoading}
        />
        <button
          className="ai-send-btn"
          onClick={() => handleSendMessage()}
          disabled={!input.trim() || isLoading}
        >
          →
        </button>
      </div>

      <div className="ai-suggestions">
        <p className="ai-suggestions-label">✨ Best Suggestions (1-Click):</p>
        <button className="ai-suggestion-btn" onClick={() => handleSendMessage('Write a high-converting heading for my store')}>
          🌟 Best Headline
        </button>
        <button className="ai-suggestion-btn" onClick={() => handleSendMessage('Write a compelling brand description for my store')}>
          📝 Best Description
        </button>
        <button className="ai-suggestion-btn" onClick={() => handleSendMessage('Suggest a high-converting CTA button text')}>
          🔘 Best CTA Button
        </button>
        <button className="ai-suggestion-btn" onClick={() => handleSendMessage('Change the banner image to a luxury photo')}>
          🖼️ Best Banner
        </button>
        <button className="ai-suggestion-btn" onClick={() => handleSendMessage('Give me design and conversion tips')}>
          💡 Design Tips
        </button>
      </div>
    </div>
  )
}
