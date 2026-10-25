import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Quizykoo – Fun quizzes for kids ages 7–11',
  description: 'Pay-per-test quiz app for Indian children aged 7–11. Pick a topic, answer 10 questions, see your score. ₹15 per test.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
