import type { Metadata } from 'next';
import './globals.css';

const SITE = 'https://digital.quizykoo.com';
const TITLE = 'Quizykoo – Fun quizzes for kids ages 7–11';
const DESC = 'Pay-per-test quiz app for Indian children aged 7–11. Pick a topic, answer 10 questions, see your score. ₹15 per test.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/' },
  openGraph: { title: TITLE, description: DESC, url: `${SITE}/`, type: 'website', images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, images: ['/og-image.png'] },
};

const JSON_LD = [
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'Quizykoo', url: `${SITE}/`, logo: `${SITE}/logo.png` },
  {
    '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Quizykoo', url: `${SITE}/`,
    description: 'Pay-per-test quiz app for Indian children aged 7-11',
    offers: [
      { '@type': 'Offer', name: 'Single Test', price: '15', priceCurrency: 'INR' },
      { '@type': 'Offer', name: '5-Test Pack', price: '59', priceCurrency: 'INR' },
      { '@type': 'Offer', name: '15-Test Pack', price: '149', priceCurrency: 'INR' },
    ],
  },
];

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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
