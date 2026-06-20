'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 lg:px-10"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Wordmark */}
        <a
          href="#"
          className="font-mono text-[#fcfdff] text-[13px] tracking-widest uppercase mr-auto select-none"
          style={{ letterSpacing: '0.18em' }}
        >
          dev<span style={{ color: 'rgba(252,253,255,0.4)' }}>.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="body-sm text-[rgba(252,253,255,0.7)] hover:text-[#fcfdff] transition-colors duration-200 cursor-pointer bg-transparent border-none"
              style={{ fontFamily: 'inherit' }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center ml-8 gap-4">
          <a
            href="mailto:dev@example.com"
            className="text-[rgba(252,253,255,0.7)] body-sm hover:text-[#fcfdff] transition-colors"
          >
            Say hello
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
            className="inline-flex items-center justify-center h-9 px-4 rounded-[8px] bg-[#fcfdff] text-[#000000] text-[14px] font-medium leading-[1.43] hover:bg-[#f1f7fe] transition-colors duration-200 select-none"
          >
            Hire me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] ml-4"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className="block w-5 h-px bg-[#fcfdff] transition-all duration-300"
            style={{
              transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none',
            }}
          />
          <span
            className="block w-5 h-px bg-[#fcfdff] transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px bg-[#fcfdff] transition-all duration-300"
            style={{
              transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none',
            }}
          />
        </button>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden"
            style={{
              background: 'rgba(0,0,0,0.96)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <nav className="flex flex-col px-6 py-6 gap-6" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-[rgba(252,253,255,0.7)] text-[16px] hover:text-[#fcfdff] transition-colors bg-transparent border-none cursor-pointer"
                  style={{ fontFamily: 'inherit' }}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                className="inline-flex items-center justify-center h-9 px-4 rounded-[8px] bg-[#fcfdff] text-[#000000] text-[14px] font-medium w-full mt-2"
              >
                Hire me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
