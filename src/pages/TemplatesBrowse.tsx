import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X, Eye, ShoppingCart, Briefcase, Utensils, Home, SlidersHorizontal, LayoutGrid, ShoppingBag } from 'lucide-react';
import TemplatesLayout from '../components/TemplatesLayout';
import { templateCategories } from '../data/templateCategories';
import { createWebsite } from '../lib/workspace-api';
import '../styles/marketplace.css';

export default function TemplatesBrowse() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const targetWebsiteId = searchParams.get('websiteId');
  
  const [search, setSearch] = useState('');
  // Main Category Tab ('all', or specific category ID like 'food-and-restaurant')
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  // Subcategory Tab (specifically for Food & Restaurant)
  const [activeSubTab, setActiveSubTab] = useState('all');
  
  // Tag Filter
  const [activeTag, setActiveTag] = useState('all');
  
  const [creatingId, setCreatingId] = useState<string | null>(null);

  // The predefined main categories (based on mockup)
  const mainCategories = [
    { id: 'all', label: 'All Templates', icon: <LayoutGrid size={16} /> },
    { id: 'e-commerce', label: 'E-commerce', icon: <ShoppingCart size={16} /> },
    { id: 'business', label: 'Business & Corporate', icon: <Briefcase size={16} /> },
    { id: 'food-and-restaurant', label: 'Food & Restaurant', icon: <Utensils size={16} /> },
    { id: 'fashion-store', label: 'Fashion Store', icon: <ShoppingBag size={16} /> },
    { id: 'real-estate', label: 'Real Estate & Property', icon: <Home size={16} /> },
  ];

  const allThemes = useMemo(() => {
    return templateCategories.flatMap(cat => 
      cat.subsections.flatMap(sub => 
        sub.themes.map(theme => ({
          ...theme,
          categoryId: cat.id,
          categorySlug: cat.slug,
          categoryName: cat.name,
          subsectionName: sub.name,
          subsectionSlug: sub.slug
        }))
      )
    );
  }, []);

  const filteredThemes = useMemo(() => {
    let filtered = allThemes;

    if (activeCategoryTab !== 'all') {
      filtered = filtered.filter(t => t.categoryId === activeCategoryTab);
    }

    if (activeSubTab !== 'all') {
      filtered = filtered.filter(t => t.subsectionSlug === activeSubTab);
    }
    
    if (activeTag !== 'all') {
      filtered = filtered.filter(t => t.styleTags.includes(activeTag));
    }
    
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) ||
        t.styleTags.some(tag => tag.toLowerCase().includes(q)) ||
        t.subsectionName.toLowerCase().includes(q) ||
        t.categoryName.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [allThemes, activeCategoryTab, activeSubTab, activeTag, search]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allThemes.forEach(t => t.styleTags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [allThemes]);

  const handlePreview = (theme: typeof allThemes[0], e: React.MouseEvent) => {
    e.stopPropagation();
    const query = targetWebsiteId ? `?websiteId=${targetWebsiteId}` : '';
    navigate(`/browse-templates/${theme.categorySlug}/${theme.subsectionSlug}/${theme.slug}${query}`);
  };

  const handleUseTemplate = async (theme: typeof allThemes[0], e: React.MouseEvent) => {
    e.stopPropagation();
    setCreatingId(theme.id);
    try {
      const templateIdToUse = theme.templateSlug || theme.slug;
      
      if (targetWebsiteId) {
        await updateWebsite(targetWebsiteId, { templateId: templateIdToUse });
        navigate(`/workspace/${targetWebsiteId}`, { state: { viewMode: 'editor' } });
      } else {
        const website = await createWebsite(
          `${theme.name} Store`,
          `Created from ${theme.name} template`,
          templateIdToUse
        );
        navigate(`/workspace/${website.id}`, { state: { viewMode: 'editor' } });
      }
    } catch (err) {
      console.error('Failed to apply template:', err);
      navigate(targetWebsiteId ? `/workspace/${targetWebsiteId}` : '/workspace/demo');
    } finally {
      setCreatingId(null);
    }
  };

  return (
    <TemplatesLayout>
      <div className="mp-page">
        <div className="mp-header-block">
          <h1 className="mp-title">Browse Templates</h1>
          <p className="mp-subtitle">Choose a professionally designed starting point for your website. Customize it later in Workspace.</p>
          
          <div className="mp-search-container">
            <Search className="mp-search-ico" size={18} />
            <input 
              type="text" 
              className="mp-search-input-modern" 
              placeholder={`Search templates...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="mp-search-clear" onClick={() => setSearch('')}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Main Categories Navigation */}
        <div className="mp-main-tabs">
          <div className="mp-tabs-left">
            {mainCategories.map(cat => (
              <button
                key={cat.id}
                className={`mp-main-tab ${activeCategoryTab === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategoryTab(cat.id);
                  setActiveSubTab('all');
                  setActiveTag('all');
                  setSearch('');
                }}
              >
                <span className="mp-tab-icon">{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>
          <div className="mp-tabs-right">
            <div className="mp-filters-dropdown-wrapper">
              <button className="mp-btn-filters">
                <SlidersHorizontal size={16} /> Filters
              </button>
              <select
                value={activeTag}
                onChange={(e) => setActiveTag(e.target.value)}
                className="mp-filters-hidden-select"
                title="Select Filter"
              >
                <option value="all">All Styles</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Subcategories specific to the active category */}
        {activeCategoryTab !== 'all' && (() => {
          const currentCategory = templateCategories.find(c => c.id === activeCategoryTab);
          if (currentCategory && currentCategory.subsections && currentCategory.subsections.length > 0) {
            return (
              <div className="mp-sub-tabs">
                <button 
                  className={`mp-sub-tab ${activeSubTab === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveSubTab('all')}
                >
                  All
                </button>
                {currentCategory.subsections.map(sub => (
                  <button 
                    key={sub.id}
                    className={`mp-sub-tab ${activeSubTab === sub.slug ? 'active' : ''}`}
                    onClick={() => setActiveSubTab(sub.slug)}
                  >
                    {sub.name}
                  </button>
                ))}
              </div>
            );
          }
          return null;
        })()}

        <div className="mp-results-info">
          <span>Showing <strong>{filteredThemes.length}</strong> templates</span>
        </div>

        {filteredThemes.length === 0 ? (
          <div className="mp-empty-state">
            <div className="mp-empty-icon">🔍</div>
            <h3>No templates found</h3>
            <p>Try another search term or clear your filters.</p>
            {(search || activeSubTab !== 'all' || activeCategoryTab !== 'all' || activeTag !== 'all') && (
              <button className="mp-btn-clear" onClick={() => { setSearch(''); setActiveSubTab('all'); setActiveCategoryTab('all'); setActiveTag('all'); }}>
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="mp-grid-modern">
            {filteredThemes.map(theme => {
              const catIcon = mainCategories.find(c => c.id === theme.categoryId)?.icon;
              return (
              <div className="mp-card-modern" key={theme.id}>
                <div className="mp-card-image-wrap" onClick={(e) => handlePreview(theme, e)}>
                  <img src={theme.coverImage} alt={theme.name} />
                  <div className="mp-card-hover-overlay">
                    <span className="mp-hover-text">Hover to preview</span>
                  </div>
                </div>
                <div className="mp-card-content">
                  <div className="mp-card-header">
                    <h3 className="mp-card-title">{theme.name}</h3>
                    {theme.slug === 'fashion-store' && <span className="mp-card-badge mp-badge-popular">Popular</span>}
                    {theme.slug === 'corporate-company' && <span className="mp-card-badge mp-badge-new">New</span>}
                    {theme.slug === 'the-olive' && <span className="mp-card-badge mp-badge-popular">Popular</span>}
                    {theme.slug === 'real-estate-agency' && <span className="mp-card-badge mp-badge-new">New</span>}
                    {theme.slug === 'consulting-firm' && <span className="mp-card-badge mp-badge-new">New</span>}
                    {theme.slug === 'electronics-store' && <span className="mp-card-badge mp-badge-popular">Popular</span>}
                  </div>
                  
                  <div className="mp-card-category">
                    {catIcon} {theme.categoryName}
                  </div>

                  <div className="mp-card-actions">
                    <button 
                      className="mp-btn-preview" 
                      onClick={(e) => handlePreview(theme, e)}
                    >
                      <Eye size={16} /> Preview
                    </button>
                    <button 
                      className="mp-btn-use" 
                      onClick={(e) => handleUseTemplate(theme, e)}
                      disabled={creatingId === theme.id}
                    >
                      {creatingId === theme.id ? 'Creating...' : 'Use Template'}
                    </button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </TemplatesLayout>
  );
}
