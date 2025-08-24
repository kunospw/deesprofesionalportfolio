import React, { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const CustomScrollbar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  
  // Smooth spring animation for the scrollbar
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Transform scroll progress to height percentage
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    const handleMouseMove = () => {
      setIsVisible(true)
      clearTimeout(window.scrollbarTimeout)
      window.scrollbarTimeout = setTimeout(() => {
        setIsVisible(window.scrollY > 100)
      }, 2000)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(window.scrollbarTimeout)
    }
  }, [])

  const handleScrollbarClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const percentage = clickY / rect.height
    const scrollTo = percentage * (document.documentElement.scrollHeight - window.innerHeight)
    
    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth'
    })
  }

  return (
    <motion.div
      className="custom-scrollbar"
      initial={{ opacity: 0, x: 10 }}
      animate={{ 
        opacity: isVisible ? 1 : 0.3,
        x: isVisible ? 0 : 5
      }}
      transition={{ duration: 0.3 }}
      onClick={handleScrollbarClick}
      style={{ cursor: 'pointer' }}
    >
      <motion.div
        className="custom-scrollbar-thumb"
        style={{ 
          height,
          scaleY
        }}
        initial={{ scale: 0.8 }}
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
      />
    </motion.div>
  )
}

export default CustomScrollbar
