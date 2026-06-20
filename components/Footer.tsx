export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-16 px-6 lg:px-10"
      style={{
        background: 'var(--color-canvas)',
        borderTop: '1px solid var(--color-divider-soft)',
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <p
              className="font-mono text-[13px] tracking-widest uppercase mb-3"
              style={{ letterSpacing: '0.18em', color: 'var(--color-ink)' }}
            >
              sultan<span style={{ color: 'var(--color-stone)' }}>.</span>
            </p>
            <p
              className="text-[14px] leading-[1.43] max-w-[200px]"
              style={{ color: 'var(--color-stone)' }}
            >
              Full-stack developer. Cloud &amp; AI builder.
              Building things for the open web.
            </p>
          </div>

          {/* Work */}
          <div>
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-4"
              style={{ color: 'var(--color-stone)' }}
            >
              Work
            </p>
            <ul className="flex flex-col gap-3">
              {['Projects', 'Open Source', 'Writing', 'Resume'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[14px] leading-[1.43] transition-colors duration-200"
                    style={{ color: 'var(--color-ash)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-body-text)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-ash)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-4"
              style={{ color: 'var(--color-stone)' }}
            >
              Stack
            </p>
            <ul className="flex flex-col gap-3">
              {['React / Next.js', 'Python / Laravel', 'Docker / Nginx', 'AWS / GCP'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[14px] leading-[1.43] transition-colors duration-200"
                    style={{ color: 'var(--color-ash)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-body-text)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-ash)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p
              className="text-[12px] uppercase tracking-[0.18em] mb-4"
              style={{ color: 'var(--color-stone)' }}
            >
              Connect
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'GitHub', href: 'https://github.com/sltnnt08' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/muhammadsultannurulloh' },
                { label: 'Email', href: 'mailto:work.sultanurulloh08@gmail.com' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[14px] leading-[1.43] transition-colors duration-200"
                    style={{ color: 'var(--color-ash)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-body-text)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-ash)')}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid var(--color-divider-soft)' }}
        >
          <p
            className="text-[12px] leading-[1.5]"
            style={{ color: 'var(--color-stone)' }}
          >
            &copy; {year} Muhammad Sultan Nurulloh Telaumbanua. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: 'var(--color-accent-green)' }}
              aria-label="All systems operational"
            />
            <span
              className="text-[12px] leading-[1.5]"
              style={{ color: 'var(--color-stone)' }}
            >
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
