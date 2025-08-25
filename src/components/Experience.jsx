import React from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollAnimation'

const Experience = ({ experiences }) => {
  return (
    <section id="experience" className="experience-section">
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
            Journey
          </motion.span>
          <motion.h2 
            className="services-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            My <span className="services-title-accent">Experience</span>
          </motion.h2>
          <motion.p 
            className="services-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A timeline of my professional growth and contributions
          </motion.p>
        </ScrollReveal>

        {/* Timeline */}
        <div className="timeline-container">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="timeline-date">{exp.duration}</div>
                  <div className="timeline-role">{exp.role}</div>
                  <div className="timeline-guild">{exp.guild}</div>
                </div>
                
                {exp.type === 'video' && exp.embedUrl ? (
                  <div className="timeline-video">
                    <iframe 
                      src={exp.embedUrl} 
                      title={exp.shortTitle}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : exp.imageUrl && (
                  <div className="timeline-image">
                    <img src={exp.imageUrl} alt={exp.shortTitle} />
                  </div>
                )}
                
                <div className="timeline-body">
                  <h3 className="timeline-title">{exp.shortTitle}</h3>
                  <ul className="timeline-description">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                  
                  <div className="timeline-tags">
                    {exp.tags.map((tag, i) => (
                      <span key={i} className="service-tech-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="timeline-marker">
                <div className="timeline-dot"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
