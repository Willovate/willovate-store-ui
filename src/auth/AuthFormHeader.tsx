interface AuthFormHeaderProps {
  title: string
  description: string
}

export function AuthFormHeader({ title, description }: AuthFormHeaderProps) {
  return (
    <header className="auth-form-header">
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  )
}