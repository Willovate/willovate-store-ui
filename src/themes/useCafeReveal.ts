import { useEffect } from 'react'

export function useCafeReveal() {
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('.cafe-page main > section, .ll-site main > section, .dg-site main > section')]
    sections.forEach(section => section.classList.add('cafe-reveal'))
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('cafe-reveal--visible'); observer.unobserve(entry.target) }
    }), { threshold: .12 })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])
}
