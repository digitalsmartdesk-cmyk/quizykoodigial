import type { ReactNode } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function ContentPage({ title, draft, children }: { title: string; draft?: boolean; children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main role="main" className="wrap" style={{ maxWidth: 820, padding: '48px 20px 72px' }}>
        {draft && (
          <div role="note" style={{ background: '#FFF8E1', border: '1.5px solid #FFCD2E', borderRadius: 12, padding: '10px 16px', marginBottom: 24, fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 13 }}>
            Draft copy — pending Quizykoo team review before launch.
          </div>
        )}
        <h1 style={{ margin: '0 0 24px', fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 34 }}>{title}</h1>
        <div className="prose">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
