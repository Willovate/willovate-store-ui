import type { CSSProperties, ReactNode } from 'react'

export type OnboardingStep = 1 | 2 | 3

export interface ProgressStepsProps {
  currentStep: OnboardingStep
  /**
   * Optional fraction (0 to 1) representing progress through the current step.
   * When omitted the indicator behaves exactly as before (no sub-progress shown).
   * The parent is responsible for computing and normalising this value.
   */
  stepProgress?: number
  className?: string
}

export const ONBOARDING_STEPS = [
  { number: '01 / 03', label: 'Create account' },
  { number: '02 / 03', label: 'Tell us your idea' },
  { number: '03 / 03', label: 'Review your starting point' },
] as const

export function ProgressSteps({
  currentStep,
  stepProgress,
  className = '',
}: ProgressStepsProps): ReactNode {
  const hasProgress = stepProgress !== undefined
  const clamped = hasProgress ? Math.max(0, Math.min(1, stepProgress)) : undefined

  const olClass = [
    'auth-steps',
    `step-${currentStep}`,
    hasProgress ? 'has-step-progress' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const style: CSSProperties | undefined = clamped !== undefined
    ? ({ '--step-progress': clamped } as CSSProperties)
    : undefined

  return (
    <ol
      className={olClass}
      style={style}
      aria-label="Account setup progress"
      data-step={currentStep}
    >
      {ONBOARDING_STEPS.map((step, index) => {
        const stepNumber = (index + 1) as OnboardingStep
        const isCurrent = stepNumber === currentStep
        const isComplete = stepNumber < currentStep

        let itemClass = ''
        if (isCurrent) {
          itemClass = 'is-current'
        } else if (isComplete) {
          itemClass = 'is-complete'
        }

        return (
          <li
            key={step.number}
            className={itemClass}
            aria-current={isCurrent ? 'step' : undefined}
          >
            <span className="auth-step-dot" aria-hidden="true" />
            <strong>{step.number}</strong>
            <span>{step.label}</span>
          </li>
        )
      })}
    </ol>
  )
}
