import React, { useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const ScrollAnimation = ({ children, className = "", ...props }) => {
  const { scrollYProgress } = useScroll()
  
  // Smooth spring animation for scroll-based effects
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Component for scroll-triggered animations
export const ScrollReveal = ({ 
  children, 
  className = "",
  delay = 0,
  duration = 0.6,
  y = 50,
  ...props 
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration,
        delay,
        ease: "easeOut"
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Component for parallax effects
export const ParallaxContainer = ({ 
  children, 
  className = "",
  speed = 0.5,
  ...props 
}) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -1000 * speed])

  return (
    <motion.div
      className={className}
      style={{ y }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Smooth scroll utility function
export const smoothScrollTo = (elementId, offset = 0) => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

export default ScrollAnimation
