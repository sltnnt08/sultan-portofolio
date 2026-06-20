'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILLS = [
  {
    category: 'Development',
    color: 'var(--color-accent-blue)',
    items: ['Python', 'JavaScript', 'PHP (Laravel)', 'TypeScript', 'REST & GraphQL', 'SQL'],
  },
  {
    category: 'Web Apps',
    color: 'var(--color-accent-green)',
    items: ['React', 'Next.js', 'Express', 'Elysia', 'Supabase', 'PostgreSQL'],
  },
  {
    category: 'DevOps & Cloud',
    color: 'var(--color-accent-yellow)',
    items: ['Docker', 'Nginx', 'Linux', 'AWS', 'GCP', 'CI/CD'],
  },
  {
    category: 'AI / ML',
    color: 'var(--color-accent-orange)',
    items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'OpenCV', 'OpenAI API', 'Jupyter'],
  },
]

function SkillCard({
  category,
  color,
  items,
  index,
}: {
  category: string
  color: string
  items: string[]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="p-8 rounded-[12px] flex flex-col gap-5"
      style={{
        background: 'var(--color-surface-card)',
        border: '1px solid var(--color-hairline-strong)',
      }}
    >
      {/* Category label */}
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: color }}
          aria-hidden="true"
        />
        <span
          className="text-[14px] font-medium leading-[1.43]"
          style={{ color: 'var(--color-ink)' }}
        >
          {category}
        </span>
      </div>

      {/* Skill chips */}
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 rounded-full text-[12px] leading-[1.5]"
            style={{
              background: 'var(--color-surface-elevated)',
              border: '1px solid var(--color-hairline)',
              color: 'var(--color-charcoal)',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: 'var(--color-canvas)' }}
    >
      {/* Blue atmospheric glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,117,255,0.1) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 text-[12px] uppercase tracking-[0.18em]"
          style={{ color: 'var(--color-stone)' }}
        >
          Technical skills
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl text-balance max-w-2xl mb-14"
          style={{ color: 'var(--color-ink)' }}
        >
          The stack behind
          <br />
          <span style={{ color: 'var(--color-stone)' }}>the craft.</span>
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {SKILLS.map((s, i) => (
            <SkillCard key={s.category} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
