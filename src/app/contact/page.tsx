import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { SUPPORT_EMAIL } from '@/data/faq';

export const metadata: Metadata = { title: 'Contact Us – Quizykoo', alternates: { canonical: '/contact/' } };

export default function Page() {
  return (
    <ContentPage title="Contact Us" draft>
      <p>For help with a purchase, a question about a topic, or anything else, email us at <strong><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></strong> and we&apos;ll get back to you as soon as we can.</p>
      <p>For press or partnership inquiries, use the same address with the subject line &quot;Partnerships&quot;.</p>
    </ContentPage>
  );
}
