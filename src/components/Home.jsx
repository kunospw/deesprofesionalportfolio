import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Card3D from './Card3D'

const Typewriter = ({ words = [], typingSpeed = 100, pause = 1400 }) => {
  const [wordIndex, setWordIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    if (!words.length) return
    const current = words[wordIndex]
    
    if (isWaiting) {
      const timeout = setTimeout(() => {
        setIsWaiting(false)
        setIsDeleting(true)
      }, pause)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (subIndex < current.length) {
          setSubIndex(subIndex + 1)
        } else {
          // Finished typing, start waiting
          setIsWaiting(true)
        }
      } else {
        // Deleting backwards
        if (subIndex > 0) {
          setSubIndex(subIndex - 1)
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? typingSpeed / 2 : typingSpeed)

    return () => clearTimeout(timeout)
  }, [subIndex, isDeleting, isWaiting, wordIndex, words, typingSpeed, pause])

  const text = words[wordIndex]?.substring(0, subIndex) || ''

  return (
    <span className="typewriter">
      <span className="type-text">{text}</span>
      <span className="cursor">|</span>
    </span>
  )
}

const Home = () => {
  const words = [
    'Dyah Puspo Rini',
    'Dee',
    'kunospw',
    'Web and Game developer',
    'Informatics student'
  ]

  return (
    <section className="home">
      <div className="home-inner container">
        {/* Large decorative text background */}
        <div className="design-text">DESIGN</div>
        
        <motion.div 
          className="home-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="intro-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Hello, I am
          </motion.h2>
          <motion.div 
            className="name-wrap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Typewriter words={words} typingSpeed={80} pause={1500} />
          </motion.div>
          
          {/* Subtitle */}
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Crafting digital experiences with code and creativity
          </motion.p>
        </motion.div>
        
        {/* Geometric shapes */}
        <div className="geometric-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        
        <motion.div 
          className="home-right"
          initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        >
          <Card3D />
        </motion.div>
      </div>
    </section>
  )
}

export default Home