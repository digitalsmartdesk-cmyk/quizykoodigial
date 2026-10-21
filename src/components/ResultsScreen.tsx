'use client';

import Image from 'next/image';
import { getTopicInfo } from '@/data/topics';

interface Props {
  score: number;
  topic: string;
  onGoHome: () => void;
  onBuyTests: () => void;
}

function getTierData(score: number) {
  if (score >= 9) return {
    headline: 'Outstanding!',
    msg: 'You got almost every one right. Incredible!',
    accent: '#FFCD2E',
    kooBg: 'linear-gradient(160deg,#FFF3C0,#FFCD2E)',
    kooSrc: '/images/koo-star-struck.jpg',
  };
  if (score >= 7) return {
    headline: 'Great work!',
    msg: 'You knew most of the answers. Keep it up!',
    accent: '#2D6CDF',
    kooBg: 'linear-gradient(160deg,#C0DBFF,#65BDFF)',
    kooSrc: '/images/koo-cheering.jpg',
  };
  if (score >= 4) return {
    headline: 'Good effort!',
    msg: 'A solid go. Try the topic again to beat your score.',
    accent: '#9B5BDF',
    kooBg: 'linear-gradient(160deg,#E8D8FF,#C89BFF)',
    kooSrc: '/images/koo-wink.jpg',
  };
  return {
    headline: 'Keep going!',
    msg: 'Every expert started somewhere. Want to try again?',
    accent: '#5b6784',
    kooBg: 'linear-gradient(160deg,#EDE8DC,#D6D0C4)',
    kooSrc: '/images/koo-idle.jpg',
  };
}

export default function ResultsScreen({ score, topic, onGoHome, onBuyTests }: Props) {
  const tier = getTierData(score);
  const topicInfo = getTopicInfo(topic);
  const shareText = encodeURIComponent(`I scored ${score}/10 on Quizykoo! 🎉 Play at quizykoo.in`);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '2px solid #E7E2D4', background: '#FBF7EC', flexShrink: 0 }}>
        <Image src="/images/logo.jpg" alt="Quizykoo" width={78} height={26} style={{ height: 26, width: 'auto' }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '28px 20px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center', overflowY: 'auto' }}>

        {/* Score */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: 80, lineHeight: 1, color: tier.accent }}>
            {score}
          </div>
          <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: 32, color: '#D6D0C4', lineHeight: 1 }}>
            /10
          </div>
        </div>

        {/* Koo */}
        <div style={{ width: 100, height: 100, borderRadius: 999, background: tier.kooBg, overflow: 'hidden', flexShrink: 0 }}>
          <Image src={tier.kooSrc} alt="Koo mascot" width={100} height={100} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 999 }} />
        </div>

        {/* Headline */}
        <div>
          <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: 26, color: '#15235E' }}>
            {tier.headline}
          </div>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 13.5, color: '#5b6784', marginTop: 6, lineHeight: 1.55, maxWidth: 300 }}>
            {tier.msg}
          </div>
        </div>

        {/* Topic chip */}
        <div style={{
          background: topicInfo.tint, border: `1.5px solid ${topicInfo.accent}`,
          borderRadius: 999, padding: '7px 14px',
          fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 11.5, color: topicInfo.accent,
        }}>
          {topic}
        </div>

        {/* WhatsApp share */}
        <a
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12.5, color: '#25D366',
            textDecoration: 'none',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Share on WhatsApp
        </a>

        {/* CTAs */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 9, marginTop: 4 }}>
          <button
            onClick={onGoHome}
            style={{
              height: 52, background: '#2D6CDF', borderRadius: 999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: 15, color: '#fff',
              cursor: 'pointer', width: '100%',
              boxShadow: '0 4px 24px rgba(45,108,223,0.35)',
            }}
          >
            Try another topic →
          </button>
          <button
            onClick={onBuyTests}
            style={{
              height: 52, border: '1.5px solid #2D6CDF', borderRadius: 999,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
              background: 'transparent', cursor: 'pointer', width: '100%',
            }}
          >
            <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: 14, color: '#2D6CDF' }}>Buy your next test</div>
            <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 10.5, color: '#5b6784' }}>5 tests from ₹59 · save 21%</div>
          </button>
        </div>

        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 11, color: '#9aa3b8' }}>
          ₹15 · ₹59 for 5 · ₹149 for 15
        </div>
      </div>
    </div>
  );
}
