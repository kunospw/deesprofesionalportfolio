import React, { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject,
      message: form.message,
    }

    try {
      await emailjs.send("service_vnfccg8", "template_85l0s48", templateParams, "5eS_Acn7LK7cMvz4J")
      setStatus({ ok: true, message: 'Message sent successfully! I\'ll get back to you soon.' })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('Email send error', err)
      setStatus({ ok: false, message: 'Failed to send message. Please try again later.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container mx-auto contact-grid">
        <div className="contact-left">
          <motion.h2 className="contact-heading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>Contact Me</motion.h2>

          <div className="contact-info">
            <motion.div className="contact-item" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
              <div className="contact-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="contact-label">Location</div>
                <div className="contact-value">Bekasi, Indonesia</div>
              </div>
            </motion.div>

            <motion.div className="contact-item" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.05 }}>
              <div className="contact-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92V21a1 1 0 01-1.11 1A19.86 19.86 0 013 5.11 1 1 0 014 4h4.09a1 1 0 01.97.757 12.05 12.05 0 00.7 2.36 1 1 0 01-.23 1L7.92 11.92a16 16 0 006.08 6.08l2.79-2.79a1 1 0 011-.23 12.05 12.05 0 002.36.7A1 1 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <div className="contact-label">Phone</div>
                <div className="contact-value">+62 812 9859 0798</div>
              </div>
            </motion.div>

            <motion.div className="contact-item" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1 }}>
              <div className="contact-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16v16H4z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
              </div>
              <div>
                <div className="contact-label">Email</div>
                <div className="contact-value">dyahrini908@gmail.com</div>
              </div>
            </motion.div>

            <motion.div className="contact-socials" initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
              <div className="contact-label">Socials</div>
              <div className="social-links">
                <a href="https://github.com/kunospw" target="_blank" rel="noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.7.08-.7 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.26 3.4.97.11-.75.41-1.26.74-1.55-2.55-.29-5.24-1.28-5.24-5.72 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.45.11-3.02 0 0 .98-.31 3.2 1.18a11.06 11.06 0 015.82 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.57.23 2.73.11 3.02.74.81 1.19 1.84 1.19 3.1 0 4.45-2.69 5.43-5.25 5.71.42.36.8 1.08.8 2.17 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56C20.71 21.38 24 17.08 24 12c0-6.35-5.15-11.5-12-11.5z"/>
                  </svg>
                  <span>kunospw</span>
                </a>
                <a href="https://www.linkedin.com/in/dyahpusporini" target="_blank" rel="noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M19 3A2 2 0 0121 5v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.54 17.5V10.75H6.09V17.5h2.45zM7.31 9.64a1.42 1.42 0 110-2.85 1.42 1.42 0 010 2.85zM18.5 17.5V13c0-2.3-1.23-3.36-2.87-3.36-1.32 0-1.91.73-2.24 1.24v-1.06H10.8v7.72h2.45v-3.86c0-.21.02-.42.08-.57.18-.42.58-.86 1.27-.86.89 0 1.25.65 1.25 1.61v3.68H18.5z"/>
                  </svg>
                  <span>dyahpusporini</span>
                </a>
                <a href="https://instagram.com/lemmerrison" target="_blank" rel="noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm0 7.25A2.75 2.75 0 1114.75 13 2.75 2.75 0 0112 15.75zM18.5 7a1 1 0 11-1-1 1 1 0 011 1z"/>
                  </svg>
                  <span>@lemmerrison</span>
                </a>
                <a href="https://instagram.com/kunospw" target="_blank" rel="noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.5A4.5 4.5 0 1016.5 13 4.5 4.5 0 0012 8.5zm0 7.25A2.75 2.75 0 1114.75 13 2.75 2.75 0 0112 15.75zM18.5 7a1 1 0 11-1-1 1 1 0 011 1z"/>
                  </svg>
                  <span>@kunospw</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div className="contact-right" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>Full Name</label>
              <input 
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name" 
                required
              />
            </div>

            <div className="form-row">
              <label>Email Address</label>
              <input 
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com" 
                type="email"
                required
              />
            </div>

            <div className="form-row">
              <label>Subject</label>
              <input 
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project Discussion" 
              />
            </div>

            <div className="form-row">
              <label>Your Message</label>
              <textarea 
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project, ideas, or just say hello..." 
                rows={6}
                required
              />
            </div>

            {/* Status Message */}
            {status && (
              <motion.div 
                className={`contact-status ${status.ok ? 'contact-status-success' : 'contact-status-error'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="contact-status-icon">
                  {status.ok ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span>{status.message}</span>
              </motion.div>
            )}

            <div className="form-actions">
              <button 
                type="submit" 
                className="contact-submit"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Me Message'}
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
