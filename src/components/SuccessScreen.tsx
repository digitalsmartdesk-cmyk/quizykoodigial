'use client';
import type { AgeMode } from '@/types/quiz';
import { D, U, pill, type Layout } from '@/lib/ui';
import Koo from './Koo';

interface Props { L: Layout; topic: string | null; ageMode: AgeMode; onStart: () => void; onPickTopic: () => void; }

export default function SuccessScreen({ L, topic, ageMode, onStart, onPickTopic }: Props) {
  return (
    <div style={{ minHeight: `calc(100vh - ${L.navH}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', animation: 'fadeUp 0.4s ease', textAlign: 'center', gap: 20 }}>
      <Koo state="cheering" size={148} style={{ boxShadow: '0 16px 48px rgba(21,35,94,0.25)' }} />
      <div style={{ background: '#EAF7E9', border: '1.5px solid #5DCC4E', borderRadius: 999, padding: '6px 18px', fontFamily: D, fontWeight: 800, fontSize: 13, color: '#3FA832' }}>✓ Payment confirmed!</div>
      <div>
        <div style={{ fontFamily: D, fontWeight: 800, fontSize: 32 }}>You&apos;re all set!</div>
        <div style={{ fontFamily: U, fontWeight: 600, fontSize: 15, color: '#5b6784', marginTop: 8, maxWidth: 380, lineHeight: 1.6 }}>
          {topic ? `${topic} · ${ageMode === 'explorer' ? 'Explorer' : 'Champion'} · 10 questions ready` : 'Pick a topic to begin'}
        </div>
      </div>
      <button className="hov-btn" onClick={topic ? onStart : onPickTopic} style={pill({ padding: '16px 52px', fontSize: 20 })}>{topic ? 'Start your quiz →' : 'Choose a topic →'}</button>
    </div>
  );
}
