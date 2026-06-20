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
      style={{ background: '#000000' }}
    >
      {/* 3D Canvas — fills entire hero */}
      <div className="absolute inset-0 z-0">
        <Scene3D />
      </div>

      {/* Subtle bottom fade so content below blends */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent, #000000)',
        }}
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
            className="inline-flex items-center gap-2 px-[10px] py-1 rounded-full text-[12px] leading-[1.5] text-[rgba(252,253,255,0.86)]"
            style={{ background: '#101012', border: '1px solid rgba(255,255,255,0.14)' }}
          >
            <span
              className="w-2 h-2 rounded-full bg-[#11ff99] animate-pulse"
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
          className="display-xxl text-[#fcfdff] text-balance max-w-4xl"
        >
          Building interfaces
          <br />
          <span style={{ color: 'rgba(252,253,255,0.45)' }}>that feel alive.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 max-w-xl text-[rgba(252,253,255,0.7)] leading-[1.3]"
          style={{ fontSize: '20px', fontWeight: 400 }}
        >
          Full-stack developer crafting immersive 3D web experiences,
          performant applications, and precise developer tooling.
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
            className="inline-flex items-center justify-center h-9 px-4 rounded-[8px] bg-[#fcfdff] text-[#000000] text-[14px] font-medium hover:bg-[#f1f7fe] transition-colors duration-200"
          >
            View projects
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center justify-center h-9 px-4 rounded-[8px] text-[#fcfdff] text-[14px] font-medium transition-colors duration-200"
            style={{
              background: '#101012',
              border: '1px solid rgba(255,255,255,0.14)',
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
          <span className="body-sm text-[#464a4d] uppercase tracking-widest text-[11px]">
            scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  )
}
