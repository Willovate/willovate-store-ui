import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MarketplacePage from './pages/MarketplacePage'
import { TemplateProvider } from './lib/TemplateContext'
import { CartProvider } from './lib/CartContext'
import { WishlistProvider } from './lib/WishlistContext'

const TemplateDetailsPage = lazy(() => import('./pages/TemplateDetailsPage'))
const PreviewPage = lazy(() => import('./pages/PreviewPage'))
const WorkspacePage = lazy(() => import('./pages/WorkspacePage'))

function LoadingFallback() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--paper)', color: 'var(--ink)' }}>
      <div className="loader" style={{ width: '28px', height: '28px', border: '3px solid var(--line)', borderTopColor: 'var(--ink)', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
    </div>
  )
}

function App() {
  return (
    <TemplateProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<MarketplacePage />} />
                <Route path="/templates/:id" element={<TemplateDetailsPage />} />
                <Route path="/preview/:id" element={<PreviewPage />} />
                <Route path="/workspace" element={<WorkspacePage />} />
              </Routes>
            </Suspense>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </TemplateProvider>
  )
}

export default App
