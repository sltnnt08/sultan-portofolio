'use client'

import { useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false })

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: EASE },
  }),
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--color-canvas)' }}
    >
      {/* 3D Canvas — fills entire hero */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Subtle bottom fade so content below blends */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-canvas))' }}
      />

      {/* Hero content */}
      <div className="relative z-20 max-w-[1200px] mx-auto px-6 lg:px-10 pt-32 pb-24">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-2 px-[10px] py-1 rounded-full text-[12px] leading-[1.5]"
            style={{
              background: 'var(--color-surface-elevated)',
              border: '1px solid var(--color-hairline-strong)',
              color: 'var(--color-body-text)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: 'var(--color-accent-green)' }}
              aria-hidden="true"
            />
            Open to work — Worldwide
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="display-xxl text-balance max-w-4xl"
          style={{ color: 'var(--color-ink)' }}
        >
          Building interfaces
          <br />
          <span style={{ color: 'var(--color-stone)' }}>that feel alive.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 max-w-xl leading-[1.3]"
          style={{ fontSize: '20px', fontWeight: 400, color: 'var(--color-charcoal)' }}
        >
          Full-stack developer building performant web applications,
          cloud-native systems, and applied AI solutions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center justify-center h-9 px-4 rounded-[8px] text-[14px] font-medium transition-colors duration-200"
            style={{ background: 'var(--color-ink)', color: 'var(--color-canvas)' }}
          >
            View projects
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center justify-center h-9 px-4 rounded-[8px] text-[14px] font-medium transition-colors duration-200"
            style={{
              background: 'var(--color-surface-elevated)',
              border: '1px solid var(--color-hairline-strong)',
              color: 'var(--color-ink)',
            }}
          >
            Get in touch
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="mt-20 flex items-center gap-3"
        >
          <div
            className="w-px h-12 bg-gradient-to-b from-transparent via-[rgba(252,253,255,0.2)] to-transparent"
            aria-hidden="true"
          />
          <span
            className="body-sm uppercase tracking-widest text-[11px]"
            style={{ color: 'var(--color-stone)' }}
          >
            scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  )
}
