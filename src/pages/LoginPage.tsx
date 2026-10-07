import { useState, type FormEvent, type ReactNode } from 'react'
import { AuthBrandPanel } from '../auth/AuthBrandPanel'
import { AuthFormHeader } from '../auth/AuthFormHeader'
import { AuthLayout } from '../auth/AuthLayout'
import { AuthStatus } from '../auth/AuthStatus'
import { PasswordField } from '../auth/PasswordField'
import { SocialAuthButtons } from '../auth/SocialAuthButtons'
import { useAuth } from '../auth/AuthContext'
import { login, ApiError } from '../lib/api'

interface LoginPageProps {
  onNavigateToSignup?: () => void
  onNavigateHome?: () => void
  onAuthSuccess?: () => void
}

type FieldName = 'email' | 'password'

interface LoginValues {
  email: string
  password: string
}

type LoginErrors = Partial<Record<FieldName, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(field: FieldName, values: LoginValues): string | undefined {
  if (field === 'email') {
    if (!values.email.trim()) return 'Enter your work email.'
    if (!emailPattern.test(values.email)) return 'Enter a valid email address.'
  }

  if (field === 'password') {
    if (!values.password) return 'Enter your password.'
  }

  return undefined
}

function validateForm(values: LoginValues): LoginErrors {
  return {
    email: validateField('email', values),
    password: validateField('password', values),
  }
}

export default function LoginPage({
  onNavigateToSignup,
  onNavigateHome,
  onAuthSuccess,
}: LoginPageProps) {
  const [values, setValues] = useState<LoginValues>({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState<LoginErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{
    tone: 'error' | 'info' | 'success'
    message: ReactNode
  } | null>(null)

  const { setSession } = useAuth()

  const updateValue = <Field extends keyof LoginValues>(
    field: Field,
    value: LoginValues[Field],
  ) => {
    const nextValues = { ...values, [field]: value }

    setValues(nextValues)
    setStatus(null)

    if (errors[field]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: validateField(field, nextValues),
      }))
    }
  }

  const validateOnBlur = (field: FieldName) => {
    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: validateField(field, values),
    }))
  }

  const handleProviderSelect = (provider: 'Google' | 'Microsoft') => {
    setStatus({
      tone: 'info',
      message: `${provider} sign-in is not connected yet.`,
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) return

    const nextErrors = validateForm(values)
    setErrors(nextErrors)
    setStatus(null)

    if (Object.values(nextErrors).some(Boolean)) {
      setStatus({
        tone: 'error',
        message: 'Please correct the highlighted fields to continue.',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const authResponse = await login({
        email: values.email.trim(),
        password: values.password,
      })

      setSession(authResponse)

      setStatus({
        tone: 'success',
        message: 'Welcome back! Logging you in...',
      })

      if (onAuthSuccess) {
        onAuthSuccess()
      }
    } catch (err: unknown) {
      if (err instanceof ApiError && (err.status === 401 || err.status === 404)) {
        setStatus({
          tone: 'error',
          message: 'Invalid email or password. Please try again.',
        })
      } else {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'An unexpected error occurred during login. Please try again.'
        setStatus({
          tone: 'error',
          message: errorMessage,
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout brandPanel={<AuthBrandPanel />}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        {onNavigateHome && (
          <button
            type="button"
            onClick={onNavigateHome}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-secondary, #666)',
              fontSize: '0.875rem',
              padding: 0,
            }}
          >
            ← Back to Store
          </button>
        )}
      </div>

      <AuthFormHeader
        title="Welcome back"
        description="Log in to access your Willovate workspace."
      />

      <SocialAuthButtons
        disabled={isSubmitting}
        onProviderSelect={handleProviderSelect}
      />

      <div className="auth-divider" aria-hidden="true">
        <span>or continue with email</span>
      </div>

      {status && <AuthStatus tone={status.tone}>{status.message}</AuthStatus>}

      <form className="auth-signup-form" noValidate onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="login-email">Work email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={values.email}
            placeholder="name@yourbusiness.com"
            onChange={(event) => updateValue('email', event.target.value)}
            onBlur={() => validateOnBlur('email')}
            autoComplete="email"
            inputMode="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            disabled={isSubmitting}
            required
          />
          {errors.email && (
            <p className="auth-field-error" id="login-email-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <PasswordField
          value={values.password}
          error={errors.password}
          onChange={(value) => updateValue('password', value)}
          onBlur={() => validateOnBlur('password')}
          disabled={isSubmitting}
        />

        <button className="auth-submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log in'}
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <p className="auth-bottom-switch">
        Don&apos;t have an account?{' '}
        <button type="button" onClick={onNavigateToSignup}>
          Create account
        </button>
      </p>

      <aside className="auth-security-callout">
        <span className="auth-security-icon" aria-hidden="true">
          <svg viewBox="0 0 20 20">
            <path d="M10 1.5 16 4v4.4c0 4-2.45 7.05-6 8.9-3.55-1.85-6-4.9-6-8.9V4l6-2.5Z" />
            <path d="m7.25 9.8 1.7 1.7 3.8-4" />
          </svg>
        </span>
        <p>
          <strong>Nothing goes live without your approval.</strong>
          You&apos;re always in control.
        </p>
      </aside>
    </AuthLayout>
  )
}
