import React from 'react'
import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollAnimation'

const Certificates = ({ achievements }) => {
  return (
    <section id="certificates" className="certificates-section">
      <div className="works-background">
        <div className="works-shape works-shape-1"></div>
        <div className="works-shape works-shape-2"></div>
        <div className="works-shape works-shape-3"></div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <motion.span
            className="works-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Achievements
          </motion.span>
          <motion.h2
            className="works-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Certificates & <span className="works-title-accent">Credentials</span>
          </motion.h2>
          <motion.p
            className="works-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Professional certifications and achievements that validate my expertise
          </motion.p>
        </ScrollReveal>

        {/* Certificates Grid */}
        <motion.div
          className="certificates-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {achievements.map((cert, index) => (
            <motion.div
              key={cert.id}
              className="certificate-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {cert.imageUrl && (
                <div className="certificate-image">
                  <img src={cert.imageUrl} alt={cert.title} />
                </div>
              )}
              
              <div className="certificate-content">
                <div className="certificate-header">
                  <h3 className="certificate-title">{cert.title}</h3>
                  <div className="certificate-date">{cert.date}</div>
                </div>
                
                <p className="certificate-description">{cert.description}</p>
                
                {cert.skills && (
                  <div className="certificate-skills">
                    {cert.skills.map((skill, i) => (
                      <span key={i} className="service-tech-tag">{skill}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Certificates
