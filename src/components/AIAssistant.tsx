import { useState, useRef, useEffect } from 'react'

const API_BASE = 'http://localhost:5191'

interface AIAssistantProps {
  onClose: () => void
  onApplySuggestion: (suggestion: string, elementType: string) => void
  onApplyBanner?: (imageUrl: string) => void
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

export default function AIAssistant({ onClose, onApplySuggestion, onApplyBanner }: AIAssistantProps) {
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

  const handleSendMessage = async () => {
    const text = input.trim()
    if (!text) return

    setInput('')
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
      setMessages(prev => [
        ...prev,
        {
          type: 'ai',
          content:
            "I'm having trouble connecting to the AI service right now. Please make sure the API server is running at http://localhost:5191 and try again.",
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
          onClick={handleSendMessage}
          disabled={!input.trim() || isLoading}
        >
          →
        </button>
      </div>

      <div className="ai-suggestions">
        <p className="ai-suggestions-label">Quick suggestions:</p>
        <button className="ai-suggestion-btn" onClick={() => setInput('Write a heading for my store')}>
          Write heading
        </button>
        <button className="ai-suggestion-btn" onClick={() => setInput('Write a description for my store')}>
          Write description
        </button>
        <button className="ai-suggestion-btn" onClick={() => setInput('Change the banner image')}>
          Change banner
        </button>
        <button className="ai-suggestion-btn" onClick={() => setInput('Suggest a button text')}>
          Button text
        </button>
        <button className="ai-suggestion-btn" onClick={() => setInput('Give me design tips')}>
          Design tips
        </button>
      </div>
    </div>
  )
}
