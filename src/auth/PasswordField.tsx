import { useState } from 'react'

interface PasswordFieldProps {
  value: string
  error?: string
  onChange: (value: string) => void
  onBlur: () => void
  disabled?: boolean
}

export function PasswordField({
  value,
  error,
  onChange,
  onBlur,
  disabled = false,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)
  const errorId = 'signup-password-error'
  const helperId = 'signup-password-helper'

  return (
    <div className="auth-field">
      <label htmlFor="signup-password">Password</label>
      <div className="auth-password-control">
        <input
          id="signup-password"
          name="password"
          type={isVisible ? 'text' : 'password'}
          value={value}
          placeholder="Create a strong password"
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          autoComplete="new-password"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperId}
          disabled={disabled}
          required
        />
        <button
          className="auth-password-toggle"
          type="button"
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          disabled={disabled}
          onClick={() => setIsVisible((visible) => !visible)}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M1.5 10s3.1-5 8.5-5 8.5 5 8.5 5-3.1 5-8.5 5-8.5-5-8.5-5Z" />
            <circle cx="10" cy="10" r="2.4" />
          </svg>
        </button>
      </div>
      {error ? (
        <p className="auth-field-error" id={errorId} role="alert">
          {error}
        </p>
      ) : (
        <p className="auth-field-helper" id={helperId}>
          <span className="auth-password-shield" aria-hidden="true" />
          Use 8 or more characters.
        </p>
      )}
    </div>
  )
}