import { useState, type FormEvent, type ReactNode } from 'react'
import { AuthBrandPanel } from '../auth/AuthBrandPanel'
import { AuthFormHeader } from '../auth/AuthFormHeader'
import { AuthLayout } from '../auth/AuthLayout'
import { AuthStatus } from '../auth/AuthStatus'
import { PasswordField } from '../auth/PasswordField'
import { SocialAuthButtons } from '../auth/SocialAuthButtons'
import { useAuth } from '../auth/AuthContext'
import { register, ApiError } from '../lib/api'


type FieldName = 'fullName' | 'email' | 'password' | 'terms'

interface SignupValues {
  fullName: string
  email: string
  password: string
  terms: boolean
}

type SignupErrors = Partial<Record<FieldName, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function parseFullName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim()
  const spaceIndex = trimmed.indexOf(' ')
  if (spaceIndex === -1) {
    return { firstName: trimmed, lastName: '' }
  }
  return {
    firstName: trimmed.slice(0, spaceIndex),
    lastName: trimmed.slice(spaceIndex + 1).trim(),
  }
}

function validateField(field: FieldName, values: SignupValues): string | undefined {
  if (field === 'fullName' && !values.fullName.trim()) {
    return 'Enter your full name.'
  }

  if (field === 'email') {
    if (!values.email.trim()) return 'Enter your work email.'
    if (!emailPattern.test(values.email)) return 'Enter a valid email address.'
  }

  if (field === 'password') {
    if (!values.password) return 'Create a password.'
    if (values.password.length < 8) {
      return 'Your password must contain at least 8 characters.'
    }
  }

  if (field === 'terms' && !values.terms) {
    return 'Please agree to the Terms and Privacy Policy.'
  }

  return undefined
}

function validateForm(values: SignupValues): SignupErrors {
  return {
    fullName: validateField('fullName', values),
    email: validateField('email', values),
    password: validateField('password', values),
    terms: validateField('terms', values),
  }
}

export default function SignupPage() {
  const [values, setValues] = useState<SignupValues>({
    fullName: '',
    email: '',
    password: '',
    terms: false,
  })
  const [errors, setErrors] = useState<SignupErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{
    tone: 'error' | 'info' | 'success'
    message: ReactNode
  } | null>(null)

  const updateValue = <Field extends keyof SignupValues>(
    field: Field,
    value: SignupValues[Field],
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

  const { setSession } = useAuth()

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

    const { firstName, lastName } = parseFullName(values.fullName)

    try {
      const authResponse = await register({
        email: values.email.trim(),
        password: values.password,
        firstName,
        lastName,
      })

      setSession(authResponse)

      setStatus({
        tone: 'success',
        message: 'Account created successfully!',
      })

    } catch (err: unknown) {
      if (err instanceof ApiError && err.status === 409) {
        setStatus({
          tone: 'error',
          message: (
            <>
              An account with this email already exists.{' '}
              {/* TODO: Navigate to LoginPage when routing is introduced. */}
              <button
                type="button"
                className="auth-status-action"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: 'inherit',
                  font: 'inherit',
                }}
              >
                Log in
              </button>
            </>
          ),
        })
      } else {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'An unexpected error occurred during account creation. Please try again.'
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
      <AuthFormHeader
        title="Create your account"
        description="Start free. Build at your own pace."
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
          <label htmlFor="signup-full-name">Full name</label>
          <input
            id="signup-full-name"
            name="fullName"
            type="text"
            value={values.fullName}
            placeholder="Enter your full name"
            onChange={(event) => updateValue('fullName', event.target.value)}
            onBlur={() => validateOnBlur('fullName')}
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'signup-full-name-error' : undefined}
            disabled={isSubmitting}
            required
          />
          {errors.fullName && (
            <p className="auth-field-error" id="signup-full-name-error" role="alert">
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="auth-field">
          <label htmlFor="signup-email">Work email</label>
          <input
            id="signup-email"
            name="email"
            type="email"
            value={values.email}
            placeholder="name@yourbusiness.com"
            onChange={(event) => updateValue('email', event.target.value)}
            onBlur={() => validateOnBlur('email')}
            autoComplete="email"
            inputMode="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'signup-email-error' : undefined}
            disabled={isSubmitting}
            required
          />
          {errors.email && (
            <p className="auth-field-error" id="signup-email-error" role="alert">
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

        <div className="auth-terms">
          <input
            id="signup-terms"
            name="terms"
            type="checkbox"
            checked={values.terms}
            onChange={(event) => updateValue('terms', event.target.checked)}
            onBlur={() => validateOnBlur('terms')}
            aria-invalid={Boolean(errors.terms)}
            aria-describedby={errors.terms ? 'signup-terms-error' : undefined}
            disabled={isSubmitting}
            required
          />
          <label htmlFor="signup-terms">
            I agree to the <a href="#terms">Terms</a> and{' '}
            <a href="#privacy">Privacy Policy</a>.
          </label>
        </div>
        {errors.terms && (
          <p className="auth-field-error auth-terms-error" id="signup-terms-error" role="alert">
            {errors.terms}
          </p>
        )}

        <button className="auth-submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <p className="auth-bottom-switch">
        Already have an account?{' '}
        {/* TODO: Navigate to LoginPage when routing is introduced. */}
        <button type="button">Log in</button>
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