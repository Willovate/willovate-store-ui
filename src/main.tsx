import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import WorkspacePage from './pages/WorkspacePage.tsx'
import PreviewPage from './pages/PreviewPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/workspace/:websiteId" element={<WorkspacePage />} />
        <Route path="/preview/:websiteId" element={<PreviewPage />} />
      </Routes>
    </Router>
  </StrictMode>,
)
