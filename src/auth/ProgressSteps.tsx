import type { ReactNode } from 'react'

export type OnboardingStep = 1 | 2 | 3

export interface ProgressStepsProps {
  currentStep: OnboardingStep
  className?: string
}

export const ONBOARDING_STEPS = [
  { number: '01 / 03', label: 'Create account' },
  { number: '02 / 03', label: 'Tell us your idea' },
  { number: '03 / 03', label: 'Review your starting point' },
] as const

export function ProgressSteps({ currentStep, className = '' }: ProgressStepsProps): ReactNode {
  return (
    <ol
      className={`auth-steps step-${currentStep} ${className}`.trim()}
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
