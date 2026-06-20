'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const PROJECT_LINK = 'https://www.linkedin.com/in/muhammadsultannurulloh/details/projects/'

const PROJECTS = [
    {
        title: 'SentraWarga',
        description:
            'Civic reporting platform enabling citizens to report environmental issues (waste, flooding, pollution) with real-time status tracking and an admin verification dashboard. Awarded Best Capstone Team out of 117 teams at Coding Camp 2026 (DBS Foundation).',
        tags: ['React', 'Express.js', 'PostgreSQL', 'Supabase', 'JavaScript'],
        glow: 'rgba(0,117,255,0.12)',
        accent: 'var(--color-accent-blue)',
        link: '#',
        featured: true,
        award: 'Best Capstone Team — Top 15/117',
    },
    {
        title: 'Agrify',
        description:
            'Smart agriculture AI applying computer vision to optimize crop monitoring and farming practices. Represented Indonesia at the India AI Impact Summit 2025 in New Delhi.',
        tags: ['Python', 'Computer Vision', 'AI / ML', 'OpenCV'],
        glow: 'rgba(34,255,153,0.09)',
        accent: 'var(--color-accent-green)',
        link: '#',
        featured: true,
        award: 'Intel AI Global Impact Festival 2025 — Country Winner',
    },
    {
        title: 'IoT Greenhouse Dashboard',
        description:
            'All-in-one management platform for greenhouse operations including IoT sensor monitoring (temperature & humidity), financial management, product tracking, and employee administration.',
        tags: ['Laravel 11', 'JavaScript', 'MySQL', 'IoT'],
        glow: 'rgba(255,197,61,0.09)',
        accent: 'var(--color-accent-yellow)',
        link: '#',
        featured: false,
        award: null,
    },
    {
        title: 'Segilik-Seguluk Brand Identity',
        description:
            'Bali-inspired coffee brand identity featuring a visual system with cultural motifs (frangipani flower, turtle shell), an earthy color palette, and refined typography — blending tradition with modern design.',
        tags: ['Brand Design', 'Typography', 'Visual System'],
        glow: 'rgba(255,89,0,0.09)',
        accent: 'var(--color-accent-orange)',
        link: '#',
        featured: false,
        award: null,
    },
]

function ProjectCard({
    project,
    index,
}: {
    project: (typeof PROJECTS)[number]
    index: number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-50px' })
    const [hovered, setHovered] = useState(false)

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative p-8 rounded-[12px] flex flex-col gap-4 overflow-hidden cursor-pointer"
            className="relative p-8 rounded-lg flex flex-col gap-4 overflow-hidden cursor-pointer"
            style={{
                background: project.featured ? 'var(--color-surface-elevated)' : 'var(--color-surface-card)',
                border: `1px solid ${hovered ? 'var(--color-hairline-strong)' : 'var(--color-hairline)'}`,
                transition: 'border-color 0.2s ease',
            }}
        >
            {/* Atmospheric glow */}
            <div
                className="absolute inset-0 pointer-events-none rounded-lg transition-opacity duration-300"
                style={{
                    background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${project.glow}, transparent)`,
                    opacity: hovered ? 1 : 0.6,
                }}
                aria-hidden="true"
            />

            {/* Badges row */}
            <div className="relative flex flex-wrap gap-2">
                {project.featured && (
                    <span
                        className="self-start px-2.5 py-1 rounded-full text-[11px] leading-normal font-medium"
                        style={{
                            background: 'var(--color-surface-elevated)',
                            border: '1px solid var(--color-hairline-strong)',
                            color: 'var(--color-body-text)',
                        }}
                    >
                        Featured
                    </span>
                )}
                {project.award && (
                    <span
                        className="self-start px-2.5 py-1 rounded-full text-[11px] leading-normal font-medium"
                        style={{
                            background: 'rgba(255,197,61,0.08)',
                            border: '1px solid rgba(255,197,61,0.22)',
                            color: 'var(--color-accent-yellow)',
                        }}
                    >
                        {project.award}
                    </span>
                )}
            </div>

            {/* Title */}
            <h3
                className="relative heading-md text-balance"
                style={{ color: 'var(--color-ink)' }}
            >
                {project.title}
            </h3>

            {/* Description */}
            <p
                className="relative body-sm leading-normal flex-1"
                style={{ color: 'var(--color-charcoal)' }}
            >
                {project.description}
            </p>

            {/* Tags */}
            <div className="relative flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-0.75 rounded-xs text-[11px] leading-normal"
                        style={{
                            background: 'var(--color-surface-deep)',
                            border: '1px solid var(--color-hairline)',
                            color: 'var(--color-ash)',
                            fontFamily: 'var(--font-geist-mono), monospace',
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Link */}
            <a
                href={PROJECT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-1.5 text-[14px] font-medium leading-[1.43] tracking-[0.35px] transition-colors duration-200"
                style={{ color: project.accent }}
                aria-label={`View ${project.title}`}
            >
                View project
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </a>
        </motion.article>
    )
}

export default function ProjectsSection() {
    const ref = useRef<HTMLElement>(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section
            id="projects"
            ref={ref}
            className="relative py-24 overflow-hidden"
            style={{ background: 'var(--color-canvas)' }}
        >
            {/* Orange atmospheric glow */}
            <div
                className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,89,0,0.09) 0%, transparent 70%)',
                }}
                aria-hidden="true"
            />

            <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
                {/* Label */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-4 text-[12px] uppercase tracking-[0.18em]"
                    style={{ color: 'var(--color-stone)' }}
                >
                    Selected work
                </motion.p>

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="display-xl text-balance max-w-2xl mb-14"
                    style={{ color: 'var(--color-ink)' }}
                >
                    Projects shipped
                    <br />
                    <span style={{ color: 'var(--color-ink)' }}>to production.</span>
                </motion.h2>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PROJECTS.map((p, i) => (
                        <ProjectCard key={p.title} project={p} index={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}
