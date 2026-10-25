'use client';
import type { AgeMode } from '@/types/quiz';
import { getTopicInfo } from '@/data/topics';
import { D, U, type Layout } from '@/lib/ui';
import Koo, { type KooState } from './Koo';

interface Props { L: Layout; score: number; total: number; topic: string; ageMode: AgeMode; onOther: () => void; onAgain: () => void; }

const TIERS: { min: number; headline: string; msg: string; accent: string; koo: KooState }[] = [
  { min: 9, headline: 'Outstanding!', msg: "Almost perfect — you're a true quiz champion!", accent: '#FFCD2E', koo: 'star-struck' },
  { min: 7, headline: 'Great work!', msg: 'You knew most of the answers. Keep it up!', accent: '#2D6CDF', koo: 'cheering' },
  { min: 4, headline: 'Good effort!', msg: 'A solid run. Try again to beat your score.', accent: '#9B5BDF', koo: 'wink' },
  { min: 0, headline: 'Keep going!', msg: "Every expert started somewhere — you've got this!", accent: '#5b6784', koo: 'idle' },
];

export default function ResultsScreen({ L, score, total, topic, ageMode, onOther, onAgain }: Props) {
  const scaled = Math.round((score / total) * 10);
  const tier = TIERS.find(t => scaled >= t.min) ?? TIERS[3];
  const ti = getTopicInfo(topic);
  return (
    <div style={{ minHeight: `calc(100vh - ${L.navH}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', animation: 'fadeUp 0.4s ease', textAlign: 'center' }}>
      <div style={{ maxWidth: 540, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontFamily: D, fontWeight: 800, fontSize: L.desktop ? 96 : 72, lineHeight: 1, color: tier.accent }}>{score}</span>
          <span style={{ fontFamily: D, fontWeight: 800, fontSize: L.desktop ? 44 : 32, lineHeight: 1, color: '#D6D0C4' }}>/{total}</span>
        </div>
        <Koo state={tier.koo} size={152} style={{ boxShadow: '0 16px 56px rgba(21,35,94,0.28)' }} />
        <div>
          <div style={{ fontFamily: D, fontWeight: 800, fontSize: L.desktop ? 32 : 26 }}>{tier.headline}</div>
          <div style={{ fontFamily: U, fontWeight: 600, fontSize: L.desktop ? 16 : 14, color: '#5b6784', marginTop: 8, lineHeight: 1.6, maxWidth: 380 }}>{tier.msg}</div>
        </div>
        <div style={{ background: ti.tint, border: `1.5px solid ${ti.accent}`, borderRadius: 999, padding: '7px 18px', fontFamily: D, fontWeight: 800, fontSize: 12, color: ti.accent }}>
          {topic} · {ageMode === 'explorer' ? 'Explorer' : 'Champion'}
        </div>
        <div style={{ width: '100%', maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="hov-btn" onClick={onOther} style={{ height: 56, background: '#2D6CDF', borderRadius: 999, fontFamily: D, fontWeight: 700, fontSize: 18, color: '#fff' }}>Try another topic →</button>
          <button className="hov-btn" onClick={onAgain} style={{ height: 56, border: '2px solid #2D6CDF', borderRadius: 999, fontFamily: D, fontWeight: 700, fontSize: 17, color: '#2D6CDF' }}>Play this topic again</button>
        </div>
        <div style={{ fontFamily: D, fontWeight: 700, fontSize: 12, color: '#9aa3b8' }}>₹15 per test · ₹59 for 5 · ₹149 for 15</div>
      </div>
    </div>
  );
}
