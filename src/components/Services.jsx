import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollAnimation'

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // SVG Icon Components
  const WebIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="3" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  )

  const GameIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="6" y1="11" x2="10" y2="11"/>
      <line x1="8" y1="9" x2="8" y2="13"/>
      <line x1="15" y1="12" x2="15.01" y2="12"/>
      <line x1="18" y1="10" x2="18.01" y2="10"/>
      <rect width="20" height="12" x="2" y="6" rx="2"/>
    </svg>
  )

  const DesignIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Pencil body */}
      <path d="M3 21v-3.59a1 1 0 0 1 .29-.71l11-11a2 2 0 0 1 2.83 0l1.17 1.17a2 2 0 0 1 0 2.83l-11 11a1 1 0 0 1-.71.29H3z" />
      {/* Pencil tip */}
      <path d="M14.5 5.5l4 4" />
      {/* Detail / ferrule */}
      <path d="M7 17l4-4" />
      {/* Accent circle to suggest a design/tool point */}
      <circle cx="6.5" cy="17.5" r="1.2" />
    </svg>
  )


  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies. From concept to deployment, crafting digital experiences that captivate and convert.",
      icon: <WebIcon />,
      technologies: ["React", "Node.js", "JavaScript", "Tailwind CSS"],
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Game Development",
      description: "Immersive gaming experiences that push boundaries. From indie gems to commercial projects, bringing interactive worlds to life.",
      icon: <GameIcon />,
      technologies: ["Unity", "C#", "Blender"],
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      title: "Graphic Design",
      description: "Visually stunning designs that communicate your brand's message effectively. From logos to marketing materials, bringing your vision to life.",
      icon: <DesignIcon />,
      technologies: ["Figma", "Canva", "Adobe Suite", "Capcut"],
      gradient: "from-green-500 to-blue-600"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="services" className="services-section">
      <div className="services-background">
        <div className="services-shape services-shape-1"></div>
        <div className="services-shape services-shape-2"></div>
        <div className="services-shape services-shape-3"></div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <motion.span 
            className="services-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Services
          </motion.span>
          <motion.h2 
            className="services-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            What I <span className="services-title-accent">Create</span>
          </motion.h2>
          <motion.p 
            className="services-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transforming ideas into digital reality with creativity
          </motion.p>
        </ScrollReveal>

        {/* Services Grid */}
        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="service-card-wrapper"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`service-card ${hoveredIndex === index ? 'hovered' : ''}`}>
                {/* Card glow effect */}
                <div className={`service-card-glow bg-gradient-to-r ${service.gradient}`}></div>
                
                {/* Card content */}
                <div className="service-card-content">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  
                  <div className="service-technologies">
                    {service.technologies.map((tech, idx) => (
                      <span key={idx} className="service-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="service-arrow">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <ScrollReveal delay={0.2}>
          <motion.div 
            className="services-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Ready to bring your vision to life?</h3>
            <p>Let's collaborate and create something extraordinary together</p>
            <motion.button 
              className="services-cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.dispatchEvent(new Event('openContactModal'))}
            >
              Start a Project
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default Services