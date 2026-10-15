import { AboutTeaser } from '../components/home/AboutTeaser'
import { Clients } from '../components/home/Clients'
import { Hero } from '../components/home/Hero'
import { SelectedWork } from '../components/home/SelectedWork'
import { Services } from '../components/home/Services'
import { Testimonials } from '../components/home/Testimonials'
import { usePageMeta } from '../hooks/usePageMeta'

/** Section order for the home page. The contact block lives in the footer (src/components/layout/Footer.tsx). */
export default function Home() {
  usePageMeta({})
  return (
    <>
      <Hero />
      <SelectedWork />
      <Clients />
      <Services />
      <AboutTeaser />
      <Testimonials />
    </>
  )
}
