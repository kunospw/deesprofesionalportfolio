import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'

// Replace these placeholders with your EmailJS values
const SERVICE_ID = 'YOUR_SERVICE_ID'
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

const ContactModal = ({ open, onClose }) => {
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
      // EmailJS send: replace SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY with your values
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
    <AnimatePresence>
      {open && (
        <motion.div
          className="contact-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="contact-modal-backdrop" onClick={onClose} />

          <motion.div
            className="contact-modal-container"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Modal Header */}
            <div className="contact-modal-header">
              <div className="contact-modal-title-section"> 
                <h3 className="contact-modal-title">
                  Let's <span className="contact-modal-title-accent">Connect</span>
                </h3>
                <p className="contact-modal-subtitle">
                  Have a project in mind? I'd love to hear about it.
                </p>
              </div>
              
              <button 
                onClick={onClose} 
                className="contact-modal-close"
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="contact-modal-form">
              <div className="contact-modal-grid">
                <div className="contact-input-group">
                  <label className="contact-input-label">Your Name</label>
                  <input 
                    name="name" 
                    value={form.name} 
                    onChange={handleChange} 
                    required 
                    placeholder="John Doe" 
                    className="contact-input-field" 
                  />
                </div>
                
                <div className="contact-input-group">
                  <label className="contact-input-label">Email Address</label>
                  <input 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    required 
                    placeholder="john@example.com" 
                    type="email" 
                    className="contact-input-field" 
                  />
                </div>
              </div>

              <div className="contact-input-group">
                <label className="contact-input-label">Subject</label>
                <input 
                  name="subject" 
                  value={form.subject} 
                  onChange={handleChange} 
                  placeholder="Project Discussion" 
                  className="contact-input-field" 
                />
              </div>

              <div className="contact-input-group">
                <label className="contact-input-label">Message</label>
                <textarea 
                  name="message" 
                  value={form.message} 
                  onChange={handleChange} 
                  required 
                  rows={5} 
                  placeholder="Tell me about your project, ideas, or just say hello..."
                  className="contact-input-field contact-textarea" 
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

              {/* Form Actions */}
              <div className="contact-modal-actions">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="contact-button-secondary"
                >
                  Cancel
                </button>
                <motion.button 
                  type="submit" 
                  disabled={loading} 
                  className="contact-button-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <svg className="contact-loading-spinner" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path opacity="0.2" fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"/>
                        <path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ContactModal
