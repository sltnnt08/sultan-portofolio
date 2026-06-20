'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SKILLS = [
  {
    category: 'Development',
    color: '#3b9eff',
    items: ['Python', 'JavaScript', 'PHP (Laravel)', 'TypeScript', 'REST & GraphQL', 'SQL'],
  },
  {
    category: 'Web Apps',
    color: '#11ff99',
    items: ['React', 'Next.js', 'Express', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    category: 'DevOps & Cloud',
    color: '#ffc53d',
    items: ['Docker', 'Nginx', 'Linux', 'AWS', 'GCP', 'CI/CD'],
  },
  {
    category: 'AI / ML',
    color: '#ff801f',
    items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'LangChain', 'OpenAI API', 'Vector DBs'],
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
        background: '#0a0a0c',
        border: '1px solid rgba(255,255,255,0.14)',
      }}
    >
      {/* Category label */}
      <div className="flex items-center gap-2">
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: color }}
          aria-hidden="true"
        />
        <span className="text-[14px] font-medium leading-[1.43] text-[#fcfdff]">
          {category}
        </span>
      </div>

      {/* Skill chips */}
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 rounded-full text-[12px] leading-[1.5] text-[rgba(252,253,255,0.7)]"
            style={{
              background: '#101012',
              border: '1px solid rgba(255,255,255,0.08)',
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
      style={{ background: '#000000' }}
    >
      {/* Blue atmospheric glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(0,117,255,0.14) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 text-[12px] uppercase tracking-[0.18em] text-[#464a4d]"
        >
          Technical skills
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl text-[#fcfdff] text-balance max-w-2xl mb-14"
        >
          The stack behind
          <br />
          <span style={{ color: 'rgba(252,253,255,0.4)' }}>the craft.</span>
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
