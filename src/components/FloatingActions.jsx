import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import songs from '../assets/songs'

const FloatingActions = () => {
  const [openPlayer, setOpenPlayer] = useState(false)
  const [openChat, setOpenChat] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello — I'm Dee's professional assistant. I can answer questions about her skills, projects, experience, and availability. How may I help you today?" }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef(null)
  const messagesEndRef = useRef(null)

  const deeContext = `
  You are an AI assistant representing Dyah Puspo Rini (Dee), a web and game developer. Use the information below to answer user questions accurately.

  PERSONAL INFO:
  - Name: Dyah Puspo Rini (goes by "Dee")
  - Location: Indonesia
  - Education: Informatics student

  TECHNICAL SKILLS:
  - Web Development: React, Node.js, JavaScript, HTML, CSS
  - Game Development: Unity, C#, Pixel Art
  - Programming: JavaScript, C#, Python
  - Tools: Git, Firebase, Database Management
  - Design: UI/UX, Digital Art

  RECENT ACHIEVEMENTS:
  - KADA Bootcamp (Full-Stack Web Development) - 2025
  - ITB GIMJAM 2025 (Game Jam Participant) - Mar 2025
  - Generative AI for Information System - Jul 2024
  - TOEIC Score: 865 - Dec 2022
  - Duolingo English Test Score: 120 - Oct 2023

  PROJECTS:
  - Hanoman Adventure (Unity pixel-art platformer)
  - Blessed Are the Peacemakers (Unity story game)
  - Raturu: Homefever (GIMJAM 2025 entry)
  - Faeza Store Web App (React + Firebase e-commerce)
  - Foxie Website (Student productivity platform)

  CURRENT STATUS:
  - Seeking internship opportunities for 2025
  - Building portfolio projects
  - Available for freelance work
  - Contact: dyahrini908@gmail.com

  GUIDELINES:
  - Respond in a professional, formal tone suitable for a professional portfolio website.
  - Avoid emojis, slang, and overly casual phrasing.
  - Keep answers concise and informative (preferably under 150 words) unless the user asks for more detail.
  - If the user asks about information not present in this profile, state that the information is not available.
  - When asked for contact or hiring procedures, provide clear next steps (email and availability).
  `

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const togglePlayer = () => {
    setOpenPlayer((s) => !s)
    if (openChat) setOpenChat(false)
  }

  // Music player state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.src = songs[currentIndex].url
    setCurrentTime(0)
    setDuration(0)
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false))
    }
  }, [currentIndex])

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false))
    else audioRef.current.pause()
  }, [isPlaying])

  // Update time / duration while playing
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onLoaded = () => setDuration(audio.duration || 0)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoaded)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [audioRef.current])

  // Advance to next track when current ends
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnded = () => {
      setCurrentIndex((i) => (i + 1) % songs.length)
      setIsPlaying(true)
    }
    audio.addEventListener('ended', onEnded)
    return () => audio.removeEventListener('ended', onEnded)
  }, [])

  const playPause = () => {
    setIsPlaying((s) => !s)
  }

  const nextTrack = () => {
    setCurrentIndex((i) => (i + 1) % songs.length)
    setIsPlaying(true)
  }

  const prevTrack = () => {
    setCurrentIndex((i) => (i - 1 + songs.length) % songs.length)
    setIsPlaying(true)
  }

  const onSeek = (e) => {
    const t = Number(e.target.value)
    if (audioRef.current) audioRef.current.currentTime = t
    setCurrentTime(t)
  }

  const formatTime = (t) => {
    if (!t || isNaN(t)) return '0:00'
    const minutes = Math.floor(t / 60)
    const seconds = Math.floor(t % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  const toggleChat = () => {
    setOpenChat((s) => !s)
    if (openPlayer) setOpenPlayer(false)
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = { role: 'user', content: inputMessage.trim() }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `${deeContext}\n\nUser question: ${userMessage.content}\n\nPlease respond as Dee's AI assistant:` }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 300,
          }
        })
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('API Response:', data)
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${data.error?.message || 'Unknown error'}`)
      }
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        const assistantMessage = {
          role: 'assistant',
          content: data.candidates[0].content.parts[0].text
        }
        setMessages(prev => [...prev, assistantMessage])
      } else {
        console.error('Unexpected API response structure:', data)
        throw new Error('Invalid response structure from Gemini API')
      }
      } catch (error) {
      console.error('Gemini API Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `An error occurred while processing your request. Please try again later.`
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fab-panel" aria-hidden={false}>
      <div className="fab-buttons">
        <a href="/Dyah_Puspo_Rini.pdf" download="Dyah_Puspo_Rini_CV.pdf" className="fab-button" title="Download CV" aria-label="Download CV">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </a>

        <button className="fab-button" onClick={togglePlayer} title="Music Player" aria-label="Toggle music player">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19V6l12-2v13" />
            <circle cx="6" cy="18" r="2" />
            <circle cx="18" cy="16" r="2" />
          </svg>
        </button>

        <button className="fab-button" onClick={toggleChat} title="Chatbot" aria-label="Open chatbot">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {openPlayer && (
          <motion.div className="fab-panel-card player-card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }}>
            <div className="panel-header">Music Player</div>
            <div className="player-info">
              <div className="player-track">
                <div className="track-title">{songs[currentIndex].title}</div>
                <div className="track-artist">{songs[currentIndex].artist}</div>
              </div>
            </div>
            <div className="player-controls">
              <button className="player-btn" onClick={prevTrack} aria-label="Previous">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="19 20 9 12 19 4 19 20"></polygon>
                  <rect x="5" y="4" width="2" height="16"></rect>
                </svg>
              </button>

              <button className={`player-btn play-pause ${isPlaying ? 'playing' : ''}`} onClick={playPause} aria-label={isPlaying ? 'Pause' : 'Play'}>
                {isPlaying ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
              </button>

              <button className="player-btn" onClick={nextTrack} aria-label="Next">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 4 15 12 5 20 5 4"></polygon>
                  <rect x="17" y="4" width="2" height="16"></rect>
                </svg>
              </button>
            </div>
            <div className="player-timeline">
              <span className="time current">{formatTime(currentTime)}</span>
              <input type="range" min={0} max={duration || 0} value={currentTime} onChange={onSeek} className="progress" />
              <span className="time total">{formatTime(duration)}</span>
            </div>
            <audio ref={audioRef} className="player-audio" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {openChat && (
          <motion.div className="fab-panel-card chat-card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }}>
            <div className="panel-header">
              Chat with Dee — Professional Assistant
              <button 
                onClick={() => setOpenChat(false)} 
                className="chat-close"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>
            
            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`chat-message ${msg.role}`}>
                  <div className="message-content">
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="chat-message assistant">
                  <div className="message-content typing">
                    <span className="typing-indicator">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <textarea 
                className="chat-input" 
                placeholder="Ask about Dee's skills, projects, or experience."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={2}
                disabled={isLoading}
              />
              <button 
                className="chat-send" 
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22,2 15,22 11,13 2,9"></polygon>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FloatingActions
