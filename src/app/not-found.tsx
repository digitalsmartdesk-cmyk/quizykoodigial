import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Koo from '@/components/Koo';

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main role="main" className="wrap" style={{ textAlign: 'center', padding: '72px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <Koo state="sleepy" size={160} />
        <h1 style={{ margin: 0, fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 32 }}>Oops — page not found</h1>
        <p style={{ margin: 0, fontFamily: '"DM Sans", sans-serif', fontWeight: 600, color: '#5b6784' }}>Koo fell asleep and lost this page.</p>
        <Link href="/" className="nav-cta" style={{ marginLeft: 0, padding: '13px 32px' }}>Back to home</Link>
      </main>
      <SiteFooter />
    </>
  );
}
