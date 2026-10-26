import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';
import { SUPPORT_EMAIL } from '@/data/faq';

export const metadata: Metadata = { title: 'Refund Policy – Quizykoo', alternates: { canonical: '/refund/' } };

export default function Page() {
  return (
    <ContentPage title="Refund Policy" draft>
      <p>If a purchased test has not yet been started, you may request a full refund within 7 days of purchase by contacting <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> with your mobile number and order details.</p>
      <p>Once a test has been started, it is considered used and is not eligible for a refund.</p>
      <p>Pack purchases (5-test or 15-test) are refundable only for the unused portion, calculated at the single-test price of ₹15 per completed test, with the remainder refunded.</p>
    </ContentPage>
  );
}
