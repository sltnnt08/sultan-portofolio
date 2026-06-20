'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

type Token = { type: string; text: string }

const CODE_TABS: { label: string; lang: string; code: Token[] }[] = [
  {
    label: 'SentraWarga.tsx',
    lang: 'tsx',
    code: [
      { type: 'comment', text: '// React — real-time report status feed' },
      { type: 'punct', text: '\n' },
      { type: 'keyword', text: 'export function' },
      { type: 'fn', text: ' ReportFeed' },
      { type: 'punct', text: '() {' },
      { type: 'punct', text: '\n  ' },
      { type: 'keyword', text: 'const' },
      { type: 'punct', text: ' [reports, setReports] = ' },
      { type: 'fn', text: 'useState' },
      { type: 'punct', text: '<Report[]>([])' },
      { type: 'punct', text: '\n\n  ' },
      { type: 'fn', text: 'useEffect' },
      { type: 'punct', text: '(() => {' },
      { type: 'punct', text: '\n    ' },
      { type: 'keyword', text: 'const' },
      { type: 'fn', text: ' channel' },
      { type: 'punct', text: ' = supabase' },
      { type: 'punct', text: '\n      .' },
      { type: 'fn', text: 'channel' },
      { type: 'punct', text: '(' },
      { type: 'string', text: "'reports'" },
      { type: 'punct', text: ')' },
      { type: 'punct', text: '\n      .' },
      { type: 'fn', text: 'on' },
      { type: 'punct', text: '(' },
      { type: 'string', text: "'postgres_changes'" },
      { type: 'punct', text: ', { event: ' },
      { type: 'string', text: "'INSERT'" },
      { type: 'punct', text: ' },' },
      { type: 'punct', text: '\n        (payload) => ' },
      { type: 'fn', text: 'setReports' },
      { type: 'punct', text: '(prev => [payload.new, ...prev]))' },
      { type: 'punct', text: '\n      .' },
      { type: 'fn', text: 'subscribe' },
      { type: 'punct', text: '()' },
      { type: 'punct', text: '\n    ' },
      { type: 'keyword', text: 'return' },
      { type: 'punct', text: ' () => supabase.' },
      { type: 'fn', text: 'removeChannel' },
      { type: 'punct', text: '(channel)' },
      { type: 'punct', text: '\n  }, [])' },
      { type: 'punct', text: '\n\n  ' },
      { type: 'keyword', text: 'return' },
      { type: 'punct', text: ' <' },
      { type: 'type', text: 'ReportList' },
      { type: 'punct', text: ' reports={reports} />' },
      { type: 'punct', text: '\n}' },
    ],
  },
  {
    label: 'greenhouse.php',
    lang: 'php',
    code: [
      { type: 'comment', text: '// Laravel — IoT sensor data endpoint' },
      { type: 'punct', text: '\n' },
      { type: 'keyword', text: 'class' },
      { type: 'fn', text: ' SensorController' },
      { type: 'keyword', text: ' extends' },
      { type: 'type', text: ' Controller' },
      { type: 'punct', text: '\n{' },
      { type: 'punct', text: '\n  ' },
      { type: 'keyword', text: 'public function' },
      { type: 'fn', text: ' store' },
      { type: 'punct', text: '(' },
      { type: 'type', text: 'Request' },
      { type: 'punct', text: ' $request) {' },
      { type: 'punct', text: '\n    $validated = $request->' },
      { type: 'fn', text: 'validate' },
      { type: 'punct', text: '([' },
      { type: 'punct', text: "\n      'temperature' => 'required|numeric'," },
      { type: 'punct', text: "\n      'humidity'    => 'required|numeric'," },
      { type: 'punct', text: "\n      'device_id'   => 'required|exists:devices,id'," },
      { type: 'punct', text: '\n    ])' },
      { type: 'punct', text: '\n\n    ' },
      { type: 'type', text: 'SensorLog' },
      { type: 'punct', text: '::' },
      { type: 'fn', text: 'create' },
      { type: 'punct', text: '($validated)' },
      { type: 'punct', text: '\n\n    ' },
      { type: 'keyword', text: 'return' },
      { type: 'fn', text: ' response' },
      { type: 'punct', text: '()->' },
      { type: 'fn', text: 'json' },
      { type: 'punct', text: "(['status' => 'ok'], 201)" },
      { type: 'punct', text: '\n  }\n}' },
    ],
  },
  {
    label: 'agrify_train.py',
    lang: 'python',
    code: [
      { type: 'comment', text: '# Python — Agrify crop classifier training' },
      { type: 'punct', text: '\n' },
      { type: 'keyword', text: 'import' },
      { type: 'fn', text: ' tensorflow' },
      { type: 'keyword', text: ' as' },
      { type: 'fn', text: ' tf' },
      { type: 'punct', text: '\n' },
      { type: 'keyword', text: 'from' },
      { type: 'fn', text: ' tensorflow.keras' },
      { type: 'keyword', text: ' import' },
      { type: 'fn', text: ' layers, Sequential' },
      { type: 'punct', text: '\n\n' },
      { type: 'fn', text: 'model' },
      { type: 'punct', text: ' = ' },
      { type: 'fn', text: 'Sequential' },
      { type: 'punct', text: '([' },
      { type: 'punct', text: '\n  ' },
      { type: 'fn', text: 'layers.Conv2D' },
      { type: 'punct', text: '(32, (3,3), activation=' },
      { type: 'string', text: "'relu'" },
      { type: 'punct', text: ', input_shape=(224,224,3)),' },
      { type: 'punct', text: '\n  ' },
      { type: 'fn', text: 'layers.MaxPooling2D' },
      { type: 'punct', text: '(),' },
      { type: 'punct', text: '\n  ' },
      { type: 'fn', text: 'layers.Flatten' },
      { type: 'punct', text: '(),' },
      { type: 'punct', text: '\n  ' },
      { type: 'fn', text: 'layers.Dense' },
      { type: 'punct', text: '(5, activation=' },
      { type: 'string', text: "'softmax'" },
      { type: 'punct', text: ')' },
      { type: 'punct', text: '\n])' },
      { type: 'punct', text: '\n\nmodel.' },
      { type: 'fn', text: 'compile' },
      { type: 'punct', text: "(optimizer='adam', loss='sparse_categorical_crossentropy')" },
      { type: 'punct', text: '\nmodel.' },
      { type: 'fn', text: 'fit' },
      { type: 'punct', text: '(train_ds, epochs=' },
      { type: 'type', text: '20' },
      { type: 'punct', text: ', validation_data=val_ds)' },
    ],
  },
  {
    label: 'docker-compose.yml',
    lang: 'yaml',
    code: [
      { type: 'comment', text: '# Docker — multi-service deployment stack' },
      { type: 'punct', text: '\n' },
      { type: 'fn', text: 'services' },
      { type: 'punct', text: ':' },
      { type: 'punct', text: '\n  ' },
      { type: 'fn', text: 'app' },
      { type: 'punct', text: ':' },
      { type: 'punct', text: '\n    ' },
      { type: 'keyword', text: 'build' },
      { type: 'punct', text: ': .' },
      { type: 'punct', text: '\n    ' },
      { type: 'keyword', text: 'ports' },
      { type: 'punct', text: ': ["3000:3000"]' },
      { type: 'punct', text: '\n    ' },
      { type: 'keyword', text: 'depends_on' },
      { type: 'punct', text: ': [db]' },
      { type: 'punct', text: '\n    ' },
      { type: 'keyword', text: 'environment' },
      { type: 'punct', text: ':' },
      { type: 'punct', text: '\n      ' },
      { type: 'fn', text: 'DATABASE_URL' },
      { type: 'punct', text: ': ' },
      { type: 'string', text: '"postgres://db:5432/app"' },
      { type: 'punct', text: '\n  ' },
      { type: 'fn', text: 'db' },
      { type: 'punct', text: ':' },
      { type: 'punct', text: '\n    ' },
      { type: 'keyword', text: 'image' },
      { type: 'punct', text: ': ' },
      { type: 'string', text: 'postgres:16-alpine' },
      { type: 'punct', text: '\n    ' },
      { type: 'keyword', text: 'volumes' },
      { type: 'punct', text: ': [pgdata:/var/lib/postgresql/data]' },
      { type: 'punct', text: '\n  ' },
      { type: 'fn', text: 'nginx' },
      { type: 'punct', text: ':' },
      { type: 'punct', text: '\n    ' },
      { type: 'keyword', text: 'image' },
      { type: 'punct', text: ': ' },
      { type: 'string', text: 'nginx:alpine' },
      { type: 'punct', text: '\n    ' },
      { type: 'keyword', text: 'ports' },
      { type: 'punct', text: ': ["80:80", "443:443"]' },
    ],
  },
  {
    label: 'api.ts',
    lang: 'ts',
    code: [
      { type: 'comment', text: '// Elysia — type-safe backend API' },
      { type: 'punct', text: '\n' },
      { type: 'keyword', text: 'import' },
      { type: 'punct', text: ' { ' },
      { type: 'fn', text: 'Elysia' },
      { type: 'punct', text: ' }' },
      { type: 'keyword', text: ' from' },
      { type: 'string', text: " 'elysia'" },
      { type: 'punct', text: '\n' },
      { type: 'keyword', text: 'import' },
      { type: 'punct', text: ' { ' },
      { type: 'fn', text: 't' },
      { type: 'punct', text: ' }' },
      { type: 'keyword', text: ' from' },
      { type: 'string', text: " 'elysia/type-system'" },
      { type: 'punct', text: '\n\n' },
      { type: 'keyword', text: 'const' },
      { type: 'fn', text: ' app' },
      { type: 'punct', text: ' = ' },
      { type: 'keyword', text: 'new' },
      { type: 'fn', text: ' Elysia' },
      { type: 'punct', text: '()' },
      { type: 'punct', text: '\n  .' },
      { type: 'fn', text: 'post' },
      { type: 'punct', text: '(' },
      { type: 'string', text: "'/reports'" },
      { type: 'punct', text: ', async ({ body }) => {' },
      { type: 'punct', text: '\n    ' },
      { type: 'keyword', text: 'const' },
      { type: 'fn', text: ' report' },
      { type: 'punct', text: ' = ' },
      { type: 'keyword', text: 'await' },
      { type: 'fn', text: ' db.insert' },
      { type: 'punct', text: '(reports).' },
      { type: 'fn', text: 'values' },
      { type: 'punct', text: '(body)' },
      { type: 'punct', text: '\n    ' },
      { type: 'keyword', text: 'return' },
      { type: 'punct', text: ' { report }' },
      { type: 'punct', text: '\n  }, {' },
      { type: 'punct', text: '\n    body: t.' },
      { type: 'fn', text: 'Object' },
      { type: 'punct', text: '({ title: t.' },
      { type: 'fn', text: 'String' },
      { type: 'punct', text: '(), location: t.' },
      { type: 'fn', text: 'String' },
      { type: 'punct', text: '() })' },
      { type: 'punct', text: '\n  })' },
      { type: 'punct', text: '\n  .' },
      { type: 'fn', text: 'listen' },
      { type: 'punct', text: '(3000)' },
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
      key={tab.label}
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
              Across every language and framework — clean architecture,
              explicit validation, and code that explains itself.
            </motion.p>

            {/* Feature list */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-3"
            >
              {[
                { dot: '#3b9eff', text: 'React with typed Supabase real-time subscriptions' },
                { dot: '#11ff99', text: 'Laravel with validated request objects & Eloquent' },
                { dot: '#ffc53d', text: 'Python AI pipelines with model.fit & OpenCV' },
                { dot: '#ff801f', text: 'Docker + Nginx multi-service deployment configs' },
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
