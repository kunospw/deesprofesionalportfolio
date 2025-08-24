import Navbar from './components/Navbar'
import Home from './components/Home'
import Services from './components/Services'
import Works from './components/Works'
import CustomScrollbar from './components/CustomScrollbar'
import ScrollAnimation from './components/ScrollAnimation'
import ScrollProgress from './components/ScrollProgress'
import './App.css'
import ContactSection from './components/ContactSection'
import FloatingActions from './components/FloatingActions'

function App() {
  return (
    <ScrollAnimation style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--text)' }}>
      <ScrollProgress />
      <CustomScrollbar />
      <Navbar />
      {/* persistent rotated brand */}
      <div className="fixed rotate-90 z-30 bottom-20 left-10 font-tommy font-light hidden md:block" style={{ color: 'var(--primary)' }}>
        <h1>dyah.rini</h1>
      </div>
      <main style={{ padding: 0 }}>
        <Home />
        <Services />
  <Works />
  <ContactSection />
  <FloatingActions />
      </main>
    </ScrollAnimation>
  )
}

export default App