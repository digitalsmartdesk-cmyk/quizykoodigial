import type { Metadata } from 'next';
import Link from 'next/link';
import ContentPage from '@/components/ContentPage';
import FaqGrid from '@/components/FaqGrid';
import { SUPPORT_EMAIL } from '@/data/faq';

export const metadata: Metadata = {
  title: 'For parents – Quizykoo',
  description: 'How Quizykoo works for parents: pay-per-test pricing, no login, age-banded questions for children aged 7–11.',
  alternates: { canonical: '/for-parents/' },
};

export default function Page() {
  return (
    <ContentPage title="For parents">
      <p>Quizykoo is a pay-per-test quiz app built for Indian children aged 7 to 11. There&apos;s no subscription, no login, and no account required — you pay ₹15 for a single topic, or save with a 5- or 15-test pack. Every question is written and reviewed for the stated age band, and your child&apos;s score is shown only to you and them, never shared or published anywhere.</p>
      <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 24, margin: '36px 0 16px' }}>Common questions</h2>
      <FaqGrid />
      <div style={{ marginTop: 40, textAlign: 'center', background: '#fff', border: '1.5px solid #E7E2D4', borderRadius: 20, padding: '32px 20px' }}>
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 22 }}>Still have questions?</div>
        <p style={{ margin: '8px 0 20px' }}><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></p>
        <Link href="/?go=play" className="nav-cta" style={{ marginLeft: 0, padding: '13px 32px', fontSize: 17 }}>Try a free quiz →</Link>
      </div>
    </ContentPage>
  );
}
