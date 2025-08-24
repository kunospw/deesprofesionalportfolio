import React, { useState, useEffect } from 'react'
import Logo from '../assets/deeslogocolor.png'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Simple scroll spy using IntersectionObserver
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 0.5 }
    )

    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div
        id="navbar-container"
        className={`container mx-auto flex justify-between items-center transition-all duration-500 ease-in-out ${
          scrolled ? 'py-2 px-4' : 'py-4 px-4'
        }`}
      >
  <a href="#home" className="font-tommy text-2xl font-bold pl-2 flex items-center navbar-brand transition-all duration-300 hover:scale-105">
          <img src={Logo} alt="" className="w-8 h-8 mr-2 transition-transform duration-300" />
          dyah.rini
        </a>

        <nav className="hidden md:flex items-center space-x-8 font-tommy font-medium">
          <a href="#home" className={`nav-link transition-all duration-300 hover:scale-110 relative overflow-hidden ${activeId === 'home' ? 'active' : ''}`}>
            <span className="relative z-10">Home</span>
          </a>
          <a href="#services" className={`nav-link transition-all duration-300 hover:scale-110 relative overflow-hidden ${activeId === 'services' ? 'active' : ''}`}>
            <span className="relative z-10">Services</span>
          </a>
          <a href="#works" className={`nav-link transition-all duration-300 hover:scale-110 relative overflow-hidden ${activeId === 'works' ? 'active' : ''}`}>
            <span className="relative z-10">Works</span>
          </a>
          <a href="#contact" className={`nav-link transition-all duration-300 hover:scale-110 relative overflow-hidden ${activeId === 'contact' ? 'active' : ''}`}>
            <span className="relative z-10">Contact</span>
          </a>
        </nav>

        <a
          href="https://www.linkedin.com/in/fikri-aidhil-setiansyah/"
          className="hidden md:inline-block px-5 py-2 font-tommy linkedin-button transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          LinkedIn &rarr;
        </a>

        <button
          id="menu-btn"
          onClick={() => setOpen(v => !v)}
          className={`md:hidden relative z-10 transition-all duration-300 ${
            open ? 'rotate-180' : 'rotate-0'
          } hover:scale-110`}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 transition-transform duration-300"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile menu with enhanced animations */}
        <div className={`md:hidden transition-all duration-500 ease-in-out ${
        open 
          ? 'max-h-96 opacity-100 translate-y-0' 
          : 'max-h-0 opacity-0 -translate-y-4'
      } overflow-hidden bg-white/95 backdrop-blur-md`}>
        <div className="container mx-auto p-6 flex flex-col space-y-4 items-start">
          {[
            { href: '#home', label: 'Home' },
            { href: '#services', label: 'Services' },
            { href: '#works', label: 'Works' },
            { href: '#contact', label: 'Contact' }
          ].map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`nav-link transition-all duration-300 hover:translate-x-2 ${
                open ? 'animate-slide-in' : ''
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://www.linkedin.com/in/fikri-aidhil-setiansyah/"
            className={`px-6 py-3 linkedin-button transition-all duration-300 hover:scale-105 hover:shadow-lg mt-2 ${
              open ? 'animate-slide-in' : ''
            }`}
            style={{ animationDelay: '400ms' }}
          >
            LinkedIn →
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar