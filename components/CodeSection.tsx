'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const CODE_TABS = [
  {
    label: 'scene.tsx',
    lang: 'tsx',
    code: [
      { type: 'comment', text: '// R3F scene with GSAP scroll camera rig' },
      { type: 'keyword', text: 'import' },
      { type: 'fn', text: ' { Canvas, useFrame }' },
      { type: 'keyword', text: ' from' },
      { type: 'string', text: " '@react-three/fiber'" },
      { type: 'punct', text: '\n' },
      { type: 'keyword', text: 'import' },
      { type: 'fn', text: ' gsap' },
      { type: 'keyword', text: ' from' },
      { type: 'string', text: " 'gsap'" },
      { type: 'punct', text: '\n\n' },
      { type: 'keyword', text: 'function' },
      { type: 'fn', text: ' CameraRig' },
      { type: 'punct', text: '() {' },
      { type: 'punct', text: '\n  ' },
      { type: 'keyword', text: 'const' },
      { type: 'fn', text: ' { camera }' },
      { type: 'punct', text: ' = ' },
      { type: 'fn', text: 'useThree' },
      { type: 'punct', text: '()' },
      { type: 'punct', text: '\n  ' },
      { type: 'fn', text: 'useFrame' },
      { type: 'punct', text: '(() => {' },
      { type: 'punct', text: '\n    ' },
      { type: 'fn', text: 'camera.position.lerp' },
      { type: 'punct', text: '(target, ' },
      { type: 'type', text: '0.05' },
      { type: 'punct', text: ')' },
      { type: 'punct', text: '\n  })' },
      { type: 'punct', text: '\n}' },
    ],
  },
  {
    label: 'useScroll.ts',
    lang: 'ts',
    code: [
      { type: 'comment', text: '// Custom scroll-driven GSAP hook' },
      { type: 'keyword', text: 'export function' },
      { type: 'fn', text: ' useScrollTimeline' },
      { type: 'punct', text: '(' },
      { type: 'fn', text: 'ref' },
      { type: 'punct', text: ': ' },
      { type: 'type', text: 'RefObject<HTMLElement>' },
      { type: 'punct', text: ') {' },
      { type: 'punct', text: '\n  ' },
      { type: 'keyword', text: 'const' },
      { type: 'fn', text: ' tl' },
      { type: 'punct', text: ' = ' },
      { type: 'fn', text: 'gsap.timeline' },
      { type: 'punct', text: '({' },
      { type: 'punct', text: '\n    ' },
      { type: 'fn', text: 'scrollTrigger' },
      { type: 'punct', text: ': {' },
      { type: 'punct', text: '\n      ' },
      { type: 'fn', text: 'trigger' },
      { type: 'punct', text: ': ref.current,' },
      { type: 'punct', text: '\n      ' },
      { type: 'fn', text: 'scrub' },
      { type: 'punct', text: ': ' },
      { type: 'type', text: '1.4' },
      { type: 'punct', text: ',' },
      { type: 'punct', text: '\n    }' },
      { type: 'punct', text: '\n  })' },
      { type: 'punct', text: '\n  ' },
      { type: 'keyword', text: 'return' },
      { type: 'fn', text: ' tl' },
      { type: 'punct', text: '\n}' },
    ],
  },
  {
    label: 'api/route.ts',
    lang: 'ts',
    code: [
      { type: 'comment', text: '// Edge API route with type-safe response' },
      { type: 'keyword', text: 'export const' },
      { type: 'fn', text: ' runtime' },
      { type: 'punct', text: ' = ' },
      { type: 'string', text: "'edge'" },
      { type: 'punct', text: '\n\n' },
      { type: 'keyword', text: 'export async function' },
      { type: 'fn', text: ' GET' },
      { type: 'punct', text: '(req: ' },
      { type: 'type', text: 'Request' },
      { type: 'punct', text: ') {' },
      { type: 'punct', text: '\n  ' },
      { type: 'keyword', text: 'const' },
      { type: 'fn', text: ' data' },
      { type: 'punct', text: ' = ' },
      { type: 'keyword', text: 'await' },
      { type: 'fn', text: ' fetchProjects' },
      { type: 'punct', text: '()' },
      { type: 'punct', text: '\n  ' },
      { type: 'keyword', text: 'return' },
      { type: 'type', text: ' Response' },
      { type: 'punct', text: '.json({ data })' },
      { type: 'punct', text: '\n}' },
    ],
  },
]

function CodeWindow({
  tab,
  inView,
}: {
  tab: (typeof CODE_TABS)[number]
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[12px] overflow-hidden w-full"
      style={{
        background: '#06060a',
        border: '1px solid rgba(255,255,255,0.14)',
      }}
    >
      {/* Traffic lights */}
      <div
        className="flex items-center gap-2 px-5 py-3"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span className="w-3 h-3 rounded-full bg-[#ff2047]" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#ffc53d]" aria-hidden="true" />
        <span className="w-3 h-3 rounded-full bg-[#11ff99]" aria-hidden="true" />
        <span
          className="ml-3 text-[12px] leading-[1.5] text-[rgba(252,253,255,0.7)]"
          style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
        >
          {tab.label}
        </span>
      </div>

      {/* Code */}
      <pre
        className="p-6 text-[13px] leading-[1.6] overflow-x-auto"
        style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
      >
        <code>
          {tab.code.map((token, i) => (
            <span key={i} className={`token-${token.type}`}>
              {token.text}
            </span>
          ))}
        </code>
      </pre>
    </motion.div>
  )
}

export default function CodeSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Green atmospheric glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(34,255,153,0.1) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* 2-up split layout */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16">
          {/* Left: copy */}
          <div className="flex-1 lg:max-w-[440px]">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-4 text-[12px] uppercase tracking-[0.18em] text-[#464a4d]"
            >
              Code quality
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl text-[#fcfdff] text-balance mb-6"
            >
              Written for
              <br />
              <span style={{ color: 'rgba(252,253,255,0.4)' }}>humans first.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="body-lg text-[rgba(252,253,255,0.7)] mb-8"
            >
              Every file is typed. Every abstraction earns its existence.
              Performance is measured before it is optimised.
            </motion.p>

            {/* Feature list */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-3"
            >
              {[
                { dot: '#3b9eff', text: 'Full TypeScript, strict mode everywhere' },
                { dot: '#11ff99', text: 'GSAP + R3F with strict animation lanes' },
                { dot: '#ffc53d', text: 'Edge-first API design on Vercel' },
                { dot: '#ff801f', text: 'Geometry / material disposal on unmount' },
              ].map(({ dot, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span
                    className="w-2 h-2 rounded-full mt-[6px] flex-shrink-0"
                    style={{ background: dot }}
                    aria-hidden="true"
                  />
                  <span className="body-sm text-[rgba(252,253,255,0.7)]">{text}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Right: code window */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Tab strip */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {CODE_TABS.map((tab, i) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(i)}
                  className="px-3 py-[6px] rounded-[6px] text-[13px] leading-[1.6] whitespace-nowrap transition-colors duration-150 bg-transparent border-none cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-geist-mono), monospace',
                    color: activeTab === i ? '#fcfdff' : 'rgba(252,253,255,0.5)',
                    background: activeTab === i ? '#101012' : 'transparent',
                    borderBottom:
                      activeTab === i
                        ? '1px solid rgba(255,255,255,0.14)'
                        : '1px solid transparent',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <CodeWindow tab={CODE_TABS[activeTab]} inView={inView} />
          </div>
        </div>
      </div>
    </section>
  )
}
