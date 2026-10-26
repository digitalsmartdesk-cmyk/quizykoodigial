import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header role="banner" className="hdr">
      <div className="wrap">
        <Link href="/" aria-label="Go to homepage" style={{ flexShrink: 0 }}>
          <img src="/images/logo.png" alt="Quizykoo" className="hdr-logo" />
        </Link>
        <nav aria-label="Main navigation" className="hdr-links">
          <Link href="/?go=how" className="hdr-link">How it works</Link>
          <Link href="/?go=topics" className="hdr-link">Topics</Link>
          <Link href="/?go=packs" className="hdr-link">Packs</Link>
          <Link href="/for-parents/" className="hdr-link">For parents</Link>
        </nav>
        <Link href="/?go=play" className="nav-cta">Try free quiz</Link>
      </div>
    </header>
  );
}
