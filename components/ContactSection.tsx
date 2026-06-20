'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/sltnnt08',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/muhammadsultannurulloh',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:work.sultanurulloh08@gmail.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
]

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Red atmospheric glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,32,71,0.1) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Divider */}
        <div
          className="w-full h-px mb-24"
          style={{ background: 'rgba(255,255,255,0.06)' }}
          aria-hidden="true"
        />

        <div className="flex flex-col items-center text-center gap-8">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[12px] uppercase tracking-[0.18em] text-[#464a4d]"
          >
            Let&apos;s work together
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="display-xxl text-[#fcfdff] text-balance max-w-3xl"
          >
            Have a project
            <br />
            <span style={{ color: 'rgba(252,253,255,0.4)' }}>in mind?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg text-[rgba(252,253,255,0.7)] leading-[1.3]"
            style={{ fontSize: '20px', fontWeight: 400 }}
          >
            I&apos;m available for freelance and contract work. Let&apos;s build
            something that lasts.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-4 flex-wrap justify-center"
          >
            <a
              href="mailto:work.sultanurulloh08@gmail.com"
              className="inline-flex items-center justify-center h-9 px-4 rounded-[8px] bg-[#fcfdff] text-[#000000] text-[14px] font-medium hover:bg-[#f1f7fe] transition-colors duration-200"
            >
              Send an email
            </a>
            <a
              href="https://github.com/sltnnt08"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-9 px-4 rounded-[8px] text-[#fcfdff] text-[14px] font-medium transition-colors duration-200"
              style={{
                background: '#101012',
                border: '1px solid rgba(255,255,255,0.14)',
              }}
            >
              View GitHub
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex items-center gap-6 mt-4"
          >
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={link.label}
                className="text-[#464a4d] hover:text-[#fcfdff] transition-colors duration-200"
              >
                {link.icon}
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
