import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import TemplateCategoryCard from '../components/TemplateCategoryCard'
import TemplatesLayout from '../components/TemplatesLayout'
import { templateCategories } from '../data/templateCategories'

export default function BrowseTemplateCategory() {
  const { categorySlug } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const targetWebsiteId = searchParams.get('websiteId')
  const category = templateCategories.find(item => item.slug === categorySlug)

  return (
    <TemplatesLayout>
      <div style={{ padding: '2rem 3rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Link to={targetWebsiteId ? `/browse-templates?websiteId=${targetWebsiteId}` : "/browse-templates"} className="browse-template-back">
          <ArrowLeft size={17} /> Back to Browse Templates
        </Link>
        {category ? (
          <>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e1b4b', margin: '1.5rem 0 0.5rem' }}>{category.name}</h1>
            <p style={{ color: '#475569', margin: '0 0 2rem' }}>{category.description}</p>
            <div className="template-category-grid">
              {category.subsections.map(subsection => (
                <TemplateCategoryCard
                  key={subsection.id}
                  subsection={subsection}
                  onClick={() => {
                    const query = targetWebsiteId ? `?websiteId=${targetWebsiteId}` : '';
                    navigate(`/browse-templates/${category.slug}/${subsection.slug}${query}`);
                  }}
                />
              ))}
            </div>
          </>
        ) : <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e1b4b', margin: '1.5rem 0 0' }}>Category not found</h1>}
      </div>
    </TemplatesLayout>
  )
}
