import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar';
import Home from './components/Home';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', color: 'var(--text)' }}>
      <Navbar />
      {/* persistent rotated brand */}
      <div className="fixed rotate-90 z-30 bottom-20 left-10 font-tommy font-light hidden md:block" style={{ color: 'var(--primary)' }}>
        <h1>dyah.rini</h1>
      </div>
      <main style={{ padding: 24 }}>
        <Home />
      </main>
    </div>
  )
}

export default App
