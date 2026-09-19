import { SectionContainer } from './SectionContainer'

export function FooterSection() {
  return (
    <footer style={{ paddingBlock: '40px', borderTop: '1px solid rgba(128,128,128,0.2)', textAlign: 'center', marginTop: 'auto' }}>
      <SectionContainer>
        <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>© {new Date().getFullYear()} Willovate one. All rights reserved.</p>
      </SectionContainer>
    </footer>
  )
}


