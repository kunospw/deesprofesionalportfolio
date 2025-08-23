import React, { useState } from 'react'
import Logo from '../assets/deeslogocolor.png'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <header
      id="navbar"
      style={{ opacity: 1 }}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out"
    >
      <div
        id="navbar-container"
        className="container mx-auto flex justify-between items-center p-4 transition-all duration-700 ease-in-out"
      >
        <a href="#" className="font-tommy text-2xl font-bold pl-2 flex items-center navbar-brand">
          <img src={Logo} alt="" className="w-8 h-8 mr-2" />
          dyah.rini
        </a>

        <nav className="hidden md:flex items-center space-x-8 font-tommy font-medium">
          <a href="#home" className="nav-link transition-colors">Home</a>
          <a href="#services" className="nav-link transition-colors">Services</a>
          <a href="#works" className="nav-link transition-colors">Works</a>
          <a href="#contact" className="nav-link transition-colors">Contact</a>
        </nav>

        <a
          href="https://www.linkedin.com/in/fikri-aidhil-setiansyah/"
          className="hidden md:inline-block px-5 py-2 font-tommy linkedin-button"
        >
          LinkedIn &rarr;
        </a>

        <button
          id="menu-btn"
          onClick={() => setOpen(v => !v)}
          className="md:hidden relative z-10"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile menu - rendered when open */}
      <div className={`md:hidden bg-transparent transition-all duration-300 ${open ? 'block' : 'hidden'}`}>
        <div className="container mx-auto p-4 flex flex-col space-y-3 items-start">
          <a href="#home" className="text-orange-400">Home</a>
          <a href="#services" className="text-orange-400">Services</a>
          <a href="#works" className="text-orange-400">Works</a>
          <a href="#contact" className="text-orange-400">Contact</a>
          <a href="https://www.linkedin.com/in/fikri-aidhil-setiansyah/" className="px-4 py-2 border-2 border-orange-400 text-orange-400 rounded-full">LinkedIn →</a>
        </div>
      </div>
    </header>
  )
}

export default Navbar