import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import './admin/admin.css'
import { ErrorBoundary } from './admin/components/ErrorBoundary'
import App from './App.tsx'
import OnboardingApp from './app/App.tsx'
import WorkspacePage from './pages/WorkspacePage.tsx'
import PreviewPage from './pages/PreviewPage.tsx'
import TemplatesBrowse from './pages/TemplatesBrowse.tsx'
import TemplateCategoryFolders from './pages/TemplateCategoryFolders.tsx'
import TemplateCategoryGallery from './pages/TemplateCategoryGallery.tsx'
import TemplatePreview from './pages/TemplatePreview.tsx'
import BrowseTemplateCategory from './pages/BrowseTemplateCategory.tsx'
import BrowseTemplateSubsection from './pages/BrowseTemplateSubsection.tsx'
import BrowseThemePreview from './pages/BrowseThemePreview.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/onboarding" element={<OnboardingApp />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route path="/workspace/:websiteId" element={<WorkspacePage />} />
          <Route path="/workspace/:websiteId/:tab" element={<WorkspacePage />} />
          <Route path="/edit-templates" element={<WorkspacePage />} />
          <Route path="/edit-templates/:websiteId" element={<WorkspacePage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/preview/:websiteId" element={<PreviewPage />} />
          <Route path="/browse-templates" element={<TemplatesBrowse />} />
          <Route path="/browse-templates/:categorySlug" element={<BrowseTemplateCategory />} />
          <Route path="/browse-templates/:categorySlug/:subsectionSlug" element={<BrowseTemplateSubsection />} />
          <Route path="/browse-templates/:categorySlug/:subsectionSlug/:themeSlug" element={<BrowseThemePreview />} />
          <Route path="/templates" element={<TemplatesBrowse />} />
          <Route path="/templates/:groupId" element={<TemplateCategoryFolders />} />
          <Route path="/templates/:groupId/:categorySlug" element={<TemplateCategoryGallery />} />
          <Route path="/templates/:groupId/:categorySlug/:templateSlug" element={<TemplatePreview />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  </StrictMode>,
)
