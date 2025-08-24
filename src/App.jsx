import Navbar from './components/Navbar'
import Home from './components/Home'
import Services from './components/Services'
import CustomScrollbar from './components/CustomScrollbar'
import ScrollAnimation from './components/ScrollAnimation'
import ScrollProgress from './components/ScrollProgress'
import './App.css'

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
        {/* Placeholder sections so navbar anchors have targets */}
        <section id="works" style={{ padding: '8rem 1rem', minHeight: '60vh' }}>
          <div className="container mx-auto">
            <h2>Works</h2>
            <p>Projects and portfolio items will go here.</p>
          </div>
        </section>

        <section id="contact" style={{ padding: '8rem 1rem', minHeight: '40vh' }}>
          <div className="container mx-auto">
            <h2>Contact</h2>
            <p>Contact form or details will go here.</p>
          </div>
        </section>
      </main>
    </ScrollAnimation>
  )
}

export default App