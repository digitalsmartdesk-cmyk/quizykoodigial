import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { SUPPORT_EMAIL } from '@/data/faq';

export const metadata: Metadata = { title: 'Privacy Policy – Quizykoo', alternates: { canonical: '/privacy/' } };

export default function Page() {
  return (
    <ContentPage title="Privacy Policy" draft>
      <p>Quizykoo collects only what&apos;s needed to deliver your purchase: the mobile number you provide at checkout, used solely to send you access to your purchased tests and to let you recover your access on a new device. We do not require an account, we do not show advertising, and we do not sell or share your data with third parties.</p>
      <p>Quiz scores are visible only to the person using the device at the time and are never published or shared without your action.</p>
      <p>If you have questions about your data, contact us at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</p>
    </ContentPage>
  );
}
