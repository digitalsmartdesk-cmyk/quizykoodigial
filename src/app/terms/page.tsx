import type { Metadata } from 'next';
import ContentPage from '@/components/ContentPage';

export const metadata: Metadata = { title: 'Terms of Use – Quizykoo', alternates: { canonical: '/terms/' } };

export default function Page() {
  return (
    <ContentPage title="Terms of Use" draft>
      <p>By using Quizykoo, you agree that each purchase grants access to the stated number of tests (1, 5, or 15), which do not expire and can be used from any device by entering the mobile number used at checkout.</p>
      <p>Quiz content is provided for educational and entertainment purposes for children aged 7 to 11. Purchases are intended to be made by a parent or guardian on behalf of a child.</p>
      <p>Quizykoo reserves the right to update topics, questions, and pricing at any time; existing unused test credits are honoured at their original terms.</p>
    </ContentPage>
  );
}
