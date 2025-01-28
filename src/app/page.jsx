// app/page.jsx
import Navbar from '@/components/landing/navbar'
import Hero from '@/components/landing/Hero'
import Services from '@/components/landing/Services'
import Footer from '@/components/landing/Footer'

const HomePage = () => (
  <main>
    <Navbar />
    <Hero />
    <Services />
    <Footer />
  </main>
)

export default HomePage