'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTheme } from './ThemeProvider'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
]

function SunIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
    )
}

function MoonIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    )
}

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const { theme, toggle } = useTheme()

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
                    background: scrolled ? 'var(--color-nav-bg-scrolled)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(12px)' : 'none',
                    borderBottom: scrolled
                        ? '1px solid var(--color-nav-border)'
                        : '1px solid transparent',
                    transition: 'all 0.3s ease',
                }}
            >
                {/* Wordmark */}
                <a
                    href="#"
                    className="font-mono text-[13px] tracking-widest uppercase mr-auto select-none"
                    style={{ color: 'var(--color-ink)', letterSpacing: '0.18em' }}
                >
                    sultan<span style={{ color: 'var(--color-stone)' }}>.</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => handleNavClick(link.href)}
                            className="body-sm transition-colors duration-200 cursor-pointer bg-transparent border-none"
                            style={{ color: 'var(--color-charcoal)', fontFamily: 'inherit' }}
                            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-ink)')}
                            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-charcoal)')}
                        >
                            {link.label}
                        </button>
                    ))}
                </nav>

                {/* Right actions */}
                <div className="hidden lg:flex items-center ml-8 gap-3">
                    <a
                        href="mailto:work.sultanurulloh08@gmail.com"
                        className="body-sm transition-colors"
                        style={{ color: 'var(--color-charcoal)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-ink)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-charcoal)')}
                    >
                        Say hello
                    </a>

                    {/* Theme toggle */}
                    <button
                        onClick={toggle}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        className="flex items-center justify-center w-8 h-8 rounded-[8px] transition-all duration-200 border"
                        style={{
                            background: 'var(--color-surface-elevated)',
                            borderColor: 'var(--color-hairline-strong)',
                            color: 'var(--color-charcoal)',
                        }}
                    >
                        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                    </button>

                    <a
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                        className="inline-flex items-center justify-center h-9 px-4 rounded-[8px] text-[14px] font-medium leading-[1.43] transition-colors duration-200 select-none"
                        style={{
                            background: 'var(--color-ink)',
                            color: 'var(--color-canvas)',
                        }}
                    >
                        Hire me
                    </a>
                </div>

                {/* Mobile: theme toggle + hamburger */}
                <div className="lg:hidden flex items-center gap-3 ml-4">
                    <button
                        onClick={toggle}
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        className="flex items-center justify-center w-8 h-8 rounded-[8px] border transition-all duration-200"
                        style={{
                            background: 'var(--color-surface-elevated)',
                            borderColor: 'var(--color-hairline-strong)',
                            color: 'var(--color-charcoal)',
                        }}
                    >
                        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                    </button>

                    <button
                        className="flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? (
                            <X size={20} strokeWidth={1.75} style={{ color: 'var(--color-ink)' }} />
                        ) : (
                            <Menu size={20} strokeWidth={1.75} style={{ color: 'var(--color-ink)' }} />
                        )}
                    </button>
                </div>
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
                            background: 'var(--color-mobile-menu-bg)',
                            backdropFilter: 'blur(16px)',
                            borderBottom: '1px solid var(--color-mobile-menu-border)',
                        }}
                    >
                        <nav className="flex flex-col px-6 py-6 gap-6" aria-label="Mobile navigation">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className="text-left text-[16px] transition-colors bg-transparent border-none cursor-pointer"
                                    style={{ color: 'var(--color-charcoal)', fontFamily: 'inherit' }}
                                >
                                    {link.label}
                                </button>
                            ))}
                            <a
                                href="#contact"
                                onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
                                className="inline-flex items-center justify-center h-9 px-4 rounded-[8px] text-[14px] font-medium w-full mt-2 transition-colors"
                                style={{ background: 'var(--color-ink)', color: 'var(--color-canvas)' }}
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
