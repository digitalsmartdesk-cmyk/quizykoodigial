'use client';
import type { AgeMode, PackId } from '@/types/quiz';
import { PACKS } from '@/data/topics';
import { D, U, pill, type Layout } from '@/lib/ui';

interface Props { L: Layout; ageMode: AgeMode; topic: string | null; pack: PackId; onPack: (p: PackId) => void; onProceed: () => void; }

const REASSURE = [
  'No subscription — pay only for what you use',
  'Secure UPI payment — no card details stored',
  'Curriculum-aligned content · reviewed by educators',
];

export default function PacksScreen({ L, ageMode, topic, pack, onPack, onProceed }: Props) {
  return (
    <div style={{ minHeight: `calc(100vh - ${L.navH}px)`, animation: 'fadeUp 0.3s ease' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: L.playPad }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ margin: 0, fontFamily: D, fontWeight: 800, fontSize: L.playTitle }}>Choose your pack</h1>
          <div style={{ fontFamily: U, fontWeight: 600, fontSize: 14, color: '#5b6784', marginTop: 4 }}>
            {topic ? `${topic} · ${ageMode === 'explorer' ? 'Explorer' : 'Champion'}` : 'All topics available'}
          </div>
        </div>
        <div role="radiogroup" aria-label="Pack" style={{ display: 'grid', gridTemplateColumns: L.desktop ? 'repeat(4,1fr)' : L.sm ? '1fr' : 'repeat(2,1fr)', gap: 18, marginBottom: 32 }}>
          {PACKS.map(p => {
            const sel = pack === p.id;
            return (
              <button key={p.id} role="radio" aria-checked={sel} className="hov-lift" onClick={() => onPack(p.id)}
                style={{ textAlign: 'left', background: p.bg, border: sel ? `2.5px solid ${p.accent}` : `1.5px solid ${p.accent}44`, borderRadius: 20, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', overflow: 'hidden' }}>
                {p.popular && <div style={{ position: 'absolute', top: 12, right: 12, background: '#FFCD2E', borderRadius: 999, padding: '3px 10px', fontFamily: D, fontWeight: 800, fontSize: 10, color: '#15235E' }}>Popular</div>}
                <div style={{ fontFamily: D, fontWeight: 800, fontSize: 11, color: p.labelColor, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{p.label}</div>
                <div style={{ fontFamily: D, fontWeight: 800, fontSize: 38, lineHeight: 1, color: p.priceColor }}>{p.price}</div>
                <div style={{ fontFamily: U, fontWeight: 600, fontSize: 13, color: p.descColor, lineHeight: 1.5 }}>{p.desc}</div>
                <div style={{ fontFamily: D, fontWeight: 800, fontSize: 11, color: p.accent }}>{p.qs}</div>
                {sel && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 18, height: 18, borderRadius: 999, background: '#5DCC4E', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>✓</div>
                    <span style={{ fontFamily: D, fontWeight: 800, fontSize: 12, color: '#5DCC4E' }}>Selected</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <button className="hov-btn" onClick={onProceed} style={pill({ padding: '16px 56px', fontSize: 18 })}>{pack === 'free' ? 'Start free trial →' : 'Proceed to checkout →'}</button>
          <div style={{ fontFamily: U, fontWeight: 600, fontSize: 12, color: '#9aa3b8' }}>Access never expires · Works on any device</div>
        </div>
        <div style={{ marginTop: 32, background: '#FBF7EC', border: '1.5px solid #E7E2D4', borderRadius: 16, padding: '20px 24px', display: 'grid', gridTemplateColumns: L.desktop ? 'repeat(3,1fr)' : '1fr', gap: 14 }}>
          {REASSURE.map(t => (
            <div key={t} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: '#EAF7E9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>✓</div>
              <div style={{ fontFamily: D, fontWeight: 700, fontSize: 13, lineHeight: 1.5 }}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
