import Hero from './component/Hero'
import About from './component/About'
import Features from './component/Features'
import CTA from './component/CTA'
import Footer from './component/Footer'

export default function Home() {
  return (
    <main className="bg-black text-white font-sans">
      <Hero />
      <About />
      <Features />
      <CTA />
      <Footer />
    </main>
  )
}