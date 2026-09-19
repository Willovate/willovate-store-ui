import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MarketplacePage from './pages/MarketplacePage'
import TemplateDetailsPage from './pages/TemplateDetailsPage'
import PreviewPage from './pages/PreviewPage'
import WorkspacePage from './pages/WorkspacePage'
import { TemplateProvider } from './lib/TemplateContext'

function App() {
  return (
    <TemplateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MarketplacePage />} />
          <Route path="/templates/:id" element={<TemplateDetailsPage />} />
          <Route path="/preview/:id" element={<PreviewPage />} />
          <Route path="/workspace" element={<WorkspacePage />} />
        </Routes>
      </Router>
    </TemplateProvider>
  )
}

export default App
