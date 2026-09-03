import { useState } from 'react'

interface AIAssistantProps {
  onClose: () => void
  onApplySuggestion: (suggestion: string, elementType: string) => void
}

interface Message {
  type: 'user' | 'ai'
  content: string
  suggestion?: { text: string; elementType: string }
  applied?: boolean
  rejected?: boolean
}

export default function AIAssistant({ onClose, onApplySuggestion }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content:
        "Hello! I'm your AI Assistant. I can help you with:\n• Writing and editing content\n• Improving page layout\n• Creating engaging copy\n• Answering questions about building your website\n\nHow can I help you today?",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleApply = (index: number) => {
    const msg = messages[index]
    if (!msg.suggestion) return

    onApplySuggestion(msg.suggestion.text, msg.suggestion.elementType)

    setMessages((prev) =>
      prev.map((m, i) => (i === index ? { ...m, applied: true, rejected: false } : m)),
    )
  }

  const handleReject = (index: number) => {
    setMessages((prev) =>
      prev.map((m, i) => (i === index ? { ...m, rejected: true, applied: false } : m)),
    )
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages((prev) => [...prev, { type: 'user', content: userMessage }])
    setIsLoading(true)

    // Simulate AI response with actionable suggestions
    setTimeout(() => {
      let aiResponse: Message

      if (userMessage.toLowerCase().includes('title') || userMessage.toLowerCase().includes('heading')) {
        aiResponse = {
          type: 'ai',
          content: 'Here\'s an engaging headline suggestion for your page:',
          suggestion: {
            text: 'Transform Your Vision Into Reality',
            elementType: 'heading',
          },
        }
      } else if (userMessage.toLowerCase().includes('content') || userMessage.toLowerCase().includes('write') || userMessage.toLowerCase().includes('description')) {
        aiResponse = {
          type: 'ai',
          content: 'Here\'s compelling content for your page:',
          suggestion: {
            text: 'We believe in creating experiences that matter. Our carefully curated collection brings together quality craftsmanship and modern design, helping you build a life that feels intentionally beautiful.',
            elementType: 'text',
          },
        }
      } else if (userMessage.toLowerCase().includes('button')) {
        aiResponse = {
          type: 'ai',
          content: 'Here\'s a compelling call-to-action:',
          suggestion: {
            text: 'Get Started Now',
            elementType: 'button',
          },
        }
      } else if (userMessage.toLowerCase().includes('layout') || userMessage.toLowerCase().includes('design')) {
        aiResponse = {
          type: 'ai',
          content: 'For better layout:\n• Keep sections above the fold clear and focused\n• Use white space effectively\n• Limit text blocks to 2–3 sentences per section\n• Place calls-to-action prominently\n\nWould you like suggestions for a specific section?',
        }
      } else if (userMessage.toLowerCase().includes('improve')) {
        aiResponse = {
          type: 'ai',
          content: 'Here\'s an improved version of your content:',
          suggestion: {
            text: 'Discover a curated world of thoughtfully designed essentials. Each piece in our collection is chosen for quality, sustainability, and the quiet joy it brings to everyday moments.',
            elementType: 'text',
          },
        }
      } else {
        aiResponse = {
          type: 'ai',
          content: "That's a great question! Here are some tips:\n• Keep your content concise and focused\n• Use clear, action-oriented language\n• Break complex ideas into smaller sections\n• Always include a clear call-to-action\n\nLet me know if you need help with specific content!",
        }
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="ai-assistant">
      <div className="ai-assistant-header">
        <h3>AI Assistant</h3>
        <button className="ai-close-btn" onClick={onClose}>
          X
        </button>
      </div>

      <div className="ai-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`ai-message ai-message-${msg.type}`}>
            <div className="ai-message-content">
              {msg.content.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}

              {msg.suggestion && !msg.applied && !msg.rejected && (
                <div className="ai-suggestion-card">
                  <div className="ai-suggestion-preview">
                    <span className="ai-suggestion-type">{msg.suggestion.elementType}</span>
                    <p>"{msg.suggestion.text}"</p>
                  </div>
                  <div className="ai-suggestion-actions">
                    <button
                      className="ai-apply-btn"
                      onClick={() => handleApply(idx)}
                    >
                      Apply
                    </button>
                    <button
                      className="ai-reject-btn"
                      onClick={() => handleReject(idx)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}

              {msg.applied && (
                <div className="ai-suggestion-status ai-suggestion-applied">
                  Applied to your page
                </div>
              )}

              {msg.rejected && (
                <div className="ai-suggestion-status ai-suggestion-rejected">
                  Suggestion dismissed
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
          placeholder="Ask for help with your content…"
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
        <button
          className="ai-suggestion-btn"
          onClick={() => setInput('Help me write an engaging headline')}
        >
          Write headline
        </button>
        <button
          className="ai-suggestion-btn"
          onClick={() => setInput('Write a description for my store')}
        >
          Write description
        </button>
        <button
          className="ai-suggestion-btn"
          onClick={() => setInput('Improve this section')}
        >
          Improve content
        </button>
      </div>
    </div>
  )
}
