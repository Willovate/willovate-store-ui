import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './admin/admin.css'
import App from './App.tsx'
import { ErrorBoundary } from './admin/components/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
