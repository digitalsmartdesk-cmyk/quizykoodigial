import Link from 'next/link';

const LINKS = [
  { href: '/for-parents/', label: 'For parents' },
  { href: '/privacy/', label: 'Privacy Policy' },
  { href: '/terms/', label: 'Terms of Use' },
  { href: '/refund/', label: 'Refund Policy' },
  { href: '/contact/', label: 'Contact Us' },
];

export default function SiteFooter() {
  return (
    <footer role="contentinfo" style={{ background: '#15235E', padding: '40px 0' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24, paddingBottom: 24, marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Link href="/" aria-label="Quizykoo home">
            <img src="/images/logo.png" alt="Quizykoo" style={{ height: 52, maxWidth: 220, width: 'auto', display: 'block' }} />
          </Link>
          <nav aria-label="Footer" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {LINKS.map(l => (
              <Link key={l.href} href={l.href} className="foot-link">{l.label}</Link>
            ))}
          </nav>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
          <span>© 2026 Quizykoo. All rights reserved.</span><span>Play Smart. Learn Fast.</span>
        </div>
      </div>
    </footer>
  );
}
