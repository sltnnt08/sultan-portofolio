'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const PROJECTS = [
  {
    title: '3D Product Configurator',
    description:
      'A real-time 3D product configurator built with React Three Fiber, allowing users to customise materials, colours, and geometry on a live WebGL canvas.',
    tags: ['R3F', 'Next.js', 'TypeScript', 'Framer Motion'],
    glow: 'rgba(0,117,255,0.15)',
    accent: '#3b9eff',
    link: '#',
    featured: true,
  },
  {
    title: 'Dev Tools Dashboard',
    description:
      'An open-source developer dashboard aggregating CI/CD status, error logs, and deploy metrics in a unified, keyboard-first interface.',
    tags: ['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind'],
    glow: 'rgba(34,255,153,0.12)',
    accent: '#11ff99',
    link: '#',
    featured: true,
  },
  {
    title: 'Generative GLSL Shader Gallery',
    description:
      'A gallery of handwritten GLSL fragment shaders exploring noise fields, signed-distance functions, and procedural geometry.',
    tags: ['GLSL', 'Three.js', 'WebGL', 'Vite'],
    glow: 'rgba(255,197,61,0.12)',
    accent: '#ffc53d',
    link: '#',
    featured: false,
  },
  {
    title: 'Edge API Proxy',
    description:
      'A Vercel Edge Function API proxy with rate limiting, request coalescing, and response caching — handling 1M+ requests/month.',
    tags: ['Edge Functions', 'Upstash Redis', 'TypeScript'],
    glow: 'rgba(255,89,0,0.12)',
    accent: '#ff801f',
    link: '#',
    featured: false,
  },
  {
    title: 'Type-safe ORM Layer',
    description:
      'A lightweight TypeScript query builder that generates fully typed queries from schema definitions without code generation.',
    tags: ['TypeScript', 'PostgreSQL', 'Bun'],
    glow: 'rgba(252,253,255,0.06)',
    accent: '#fcfdff',
    link: '#',
    featured: false,
  },
  {
    title: 'Scroll-Driven Animation Kit',
    description:
      'A composable React animation library combining Framer Motion and GSAP ScrollTrigger with a declarative config API.',
    tags: ['GSAP', 'Framer Motion', 'React', 'npm'],
    glow: 'rgba(255,32,71,0.1)',
    accent: '#ff2047',
    link: '#',
    featured: false,
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
      style={{
        background: project.featured ? '#101012' : '#0a0a0c',
        border: '1px solid rgba(255,255,255,0.14)',
        transition: 'border-color 0.2s ease',
        borderColor: hovered ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.14)',
      }}
    >
      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[12px] transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${project.glow}, transparent)`,
          opacity: hovered ? 1 : 0.6,
        }}
        aria-hidden="true"
      />

      {/* Featured badge */}
      {project.featured && (
        <span
          className="relative self-start px-[10px] py-1 rounded-full text-[11px] leading-[1.5] font-medium text-[rgba(252,253,255,0.86)]"
          style={{ background: '#101012', border: '1px solid rgba(255,255,255,0.14)' }}
        >
          Featured
        </span>
      )}

      {/* Title */}
      <h3
        className="relative heading-md text-[#fcfdff] text-balance"
        style={{ fontFamily: 'inherit' }}
      >
        {project.title}
      </h3>

      {/* Description */}
      <p className="relative body-sm text-[rgba(252,253,255,0.7)] leading-[1.5] flex-1">
        {project.description}
      </p>

      {/* Tags */}
      <div className="relative flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-[3px] rounded-[4px] text-[11px] leading-[1.5]"
            style={{
              background: '#06060a',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(252,253,255,0.55)',
              fontFamily: 'var(--font-geist-mono), monospace',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Link */}
      <a
        href={project.link}
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
      style={{ background: '#000000' }}
    >
      {/* Orange atmospheric glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,89,0,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 text-[12px] uppercase tracking-[0.18em] text-[#464a4d]"
        >
          Selected work
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl text-[#fcfdff] text-balance max-w-2xl mb-14"
        >
          Projects shipped
          <br />
          <span style={{ color: 'rgba(252,253,255,0.4)' }}>to production.</span>
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
