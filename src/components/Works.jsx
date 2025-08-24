import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from './ScrollAnimation'

// Import project images
import Hanoman from '../assets/Hanoman.png'
import Faeza from '../assets/Webapp1.png'
import Blessed from '../assets/Blessed.png'
import Foxie from '../assets/Foxie.png'
import Design from '../assets/Design.png'
import Raturu from '../assets/Raturu.png'
import JobHive from '../assets/JobHive.png'
import Interntrack from '../assets/Interntrack.png'

const projects = [
    {
        id: 1,
        name: 'Internship Tracker Web App',
        type: 'web',
        imageUrl: Interntrack,
        url: 'https://interntrackme.vercel.app/',
        description: 'A simple Internship Tracker web built with HTML, CSS, and JavaScript. This project is a simple internship tracker web app that allows users to track their internship progress, and data is still stored in local storage.',
        status: 'future development',
    },
    {
        id: 2,
        name: 'Job Hive Web App',
        type: 'web',
        imageUrl: JobHive,
        url: 'https://sonervous.site/',
        description: 'Capstone project for KADA Bootcamp; developed a job portal web app with AI-powered CV analysis using GPT-4o for intelligent job matching and recommendations. Built backend APIs with Node.js, Express, and MongoDB, and implemented role-based authentication.',
        status: 'completed',
    },
    {
        id: 3,
        name: 'Hanoman Adventure',
        type: 'game',
        imageUrl: Hanoman,
        embedUrl: 'https://itch.io/embed-upload/14241671?color=bababa',
        description: 'Story of hanoman in a pixel-art platformer game developed in Unity for a commission project collaboration.',
        status: 'completed',
    },
    {
        id: 4,
        name: 'Blessed Are the Peacemakers',
        type: 'game',
        imageUrl: Blessed,
        embedUrl: 'https://itch.io/embed-upload/14252047?color=333333',
        description: 'Follow the story of Avery Ross, a woman who seeks justice for a crime she did not commit. Pixel-art game developed in Unity for academic project.',
        status: 'completed',
    },
    {
        id: 5,
        name: 'Raturu: Homefever',
        type: 'game',
        imageUrl: Raturu,
        url: 'https://baraaaa.itch.io/raturu-home-fever',
        description: 'RATURU : Home Fever, you step into the feverish dreams of a young child battling a high fever. Made for GIMJAM ITB 2025 using Unity and Blender for modelling and animation.',
        status: 'completed',
    },
    {
        id: 6,
        name: 'Faeza Store Web App',
        type: 'web',
        imageUrl: Faeza,
        url: 'https://reseller-shop-project.vercel.app/',
        description: 'A form-based e-commerce site with an admin dashboard for product management using React and Firebase.',
        status: 'completed',
    },
    {
        id: 7,
        name: 'Informatics Instagram Post Design',
        type: 'design',
        imageUrl: Design,
        url: 'https://www.instagram.com/informatics_presuniv/',
        description: 'Design for Informatics Instagram Post using Canva.',
        status: 'completed',
    },
    {
        id: 8,
        name: 'Ancient Egypt Animation',
        type: 'video',
        videoUrl: 'https://www.youtube.com/embed/bOSITPwlA9A?si=0q9DxMctK2g4wbAf',
        url: 'https://youtu.be/bOSITPwlA9A',
        description: 'An animation of ancient Egypt inspired by Moonknight, made using Blender for academic project.',
        status: 'completed',
    },
    {
        id: 9,
        name: 'AMV Edits — Reel',
        type: 'video',
        /* lightweight Instagram blockquote (script loaded separately) */
        embedHtml: `
      <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/Cv0puI1tvle/" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px rgba(0,0,0,0.5); margin: 1px; max-width:540px; padding:0; width:100%;">
        <a href="https://www.instagram.com/reel/Cv0puI1tvle/" target="_blank" rel="noopener noreferrer">View this AMV on Instagram</a>
      </blockquote>
    `,
        url: 'https://www.instagram.com/reel/Cv0puI1tvle/',
        description: 'AMV edits made using After Effects 2020',
        status: 'completed',
    },
]

const Works = () => {
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [selectedProject, setSelectedProject] = useState(null)

    useEffect(() => {
        // If there is an instagram embed on the page, load Instagram's embed script
        const hasInstagramEmbed = projects.some(p => p.embedHtml && p.embedHtml.includes('instagram'))
        if (!hasInstagramEmbed) return

        // Avoid loading script multiple times
        if (window.instgrm) {
            try { window.instgrm.Embeds.process() } catch (e) { }
            return
        }

        const script = document.createElement('script')
        script.async = true
        script.src = '//www.instagram.com/embed.js'
        script.onload = () => {
            try { window.instgrm && window.instgrm.Embeds && window.instgrm.Embeds.process() } catch (e) { }
        }
        document.body.appendChild(script)

        return () => {
            // keep script in DOM; no cleanup required
        }
    }, [])

    const filters = [
        { key: 'all', label: 'All Projects' },
        { key: 'web', label: 'Web Development' },
        { key: 'game', label: 'Game Development' },
        { key: 'design', label: 'Design' },
        { key: 'video', label: 'Animation' },
    ]

    const filteredProjects = selectedFilter === 'all'
        ? projects
        : projects.filter(project => project.type === selectedFilter)

    const getTypeIcon = (type) => {
        switch (type) {
            case 'web':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                )
            case 'game':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V5a1 1 0 011-1h3a1 1 0 001-1V3a2 2 0 012-2z" />
                    </svg>
                )
            case 'design':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                )
            case 'video':
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                )
            default:
                return null
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'future development':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'in progress':
                return 'bg-blue-100 text-blue-800 border-blue-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    return (
        <section id="works" className="works-section">
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
                        Portfolio
                    </motion.span>
                    <motion.h2
                        className="works-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        My <span className="works-title-accent">Works</span>
                    </motion.h2>
                    <motion.p
                        className="works-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        A collection of projects that showcase my skills and creativity
                    </motion.p>
                </ScrollReveal>

                {/* Filter Buttons */}
                <ScrollReveal delay={0.2}>
                    <div className="filter-container">
                        {filters.map((filter, index) => (
                            <motion.button
                                key={filter.key}
                                onClick={() => setSelectedFilter(filter.key)}
                                className={`filter-button ${selectedFilter === filter.key ? 'active' : ''}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                            >
                                {filter.label}
                            </motion.button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Projects Grid */}
                <motion.div
                    className="projects-grid"
                    layout
                >
                    <AnimatePresence mode="wait">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="project-card-wrapper"
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className="project-card">
                                    <div className="project-image">
                                        {project.embedHtml ? (
                                            <div className="embed-wrapper" dangerouslySetInnerHTML={{ __html: project.embedHtml }} />
                                        ) : project.type === 'video' && project.videoUrl ? (
                                            <iframe
                                                src={project.videoUrl}
                                                title={project.name}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="video-embed"
                                            ></iframe>
                                        ) : (
                                            <img
                                                src={project.imageUrl}
                                                alt={project.name}
                                                className="project-img"
                                            />
                                        )}
                                        <div className="project-overlay">
                                            <div className="project-actions">
                                                {project.url && (
                                                    <a
                                                        href={project.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="action-button"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                )}
                                                {project.embedUrl && (
                                                    <a
                                                        href={project.embedUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="action-button"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-4v4" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="project-content">
                                        <div className="project-header">
                                            <div className="project-type">
                                                {getTypeIcon(project.type)}
                                                <span>{project.type}</span>
                                            </div>
                                            <span className={`project-status ${getStatusColor(project.status)}`}>
                                                {project.status}
                                            </span>
                                        </div>

                                        <h3 className="project-title">{project.name}</h3>
                                        <p className="project-description">{project.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}

export default Works
