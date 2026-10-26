'use client';
import { useState } from 'react';
import type { AgeMode, PackId } from '@/types/quiz';
import { PACKS, getTopicInfo } from '@/data/topics';
import { D, U, type Layout } from '@/lib/ui';

interface Props { L: Layout; ageMode: AgeMode; topic: string | null; pack: PackId; onPay: () => void; }

export default function CheckoutScreen({ L, ageMode, topic, pack, onPay }: Props) {
  const [phone, setPhone] = useState('');
  const p = PACKS.find(x => x.id === pack) ?? PACKS[1];
  const card = { background: '#fff', border: '1.5px solid #E7E2D4', borderRadius: 20, padding: '20px 24px', marginBottom: 18 } as const;
  return (
    <div style={{ minHeight: `calc(100vh - ${L.navH}px)`, animation: 'fadeUp 0.3s ease' }}>
      <div style={{ maxWidth: 520, margin: '0 auto', padding: L.playPad }}>
        <div style={card}>
          <div style={{ fontFamily: D, fontWeight: 800, fontSize: 11, color: '#9aa3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>Order summary</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: D, fontWeight: 800, fontSize: 19 }}>{p.label}</div>
              <div style={{ fontFamily: U, fontWeight: 600, fontSize: 13, color: '#5b6784', marginTop: 2 }}>{p.label} · 10-question test</div>
            </div>
            <div style={{ fontFamily: D, fontWeight: 800, fontSize: 32, color: '#2D6CDF' }}>{p.price}</div>
          </div>
          {topic && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #E7E2D4', display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: 999, background: getTopicInfo(topic).accent }} />
              <span style={{ fontFamily: D, fontWeight: 700, fontSize: 12, color: '#5b6784' }}>Topic: {topic} · {ageMode === 'explorer' ? 'Explorer' : 'Champion'}</span>
            </div>
          )}
        </div>
        <div style={card}>
          <label htmlFor="phone" style={{ display: 'block', fontFamily: D, fontWeight: 800, fontSize: 13, marginBottom: 6 }}>Your mobile number</label>
          <div style={{ fontFamily: U, fontWeight: 600, fontSize: 12, color: '#5b6784', marginBottom: 12 }}>We use this to deliver your quiz access. No spam, ever.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#FBF7EC', border: '1.5px solid #D6D0C4', borderRadius: 12, padding: '13px 16px' }}>
            <span style={{ fontFamily: D, fontWeight: 700, fontSize: 15, color: '#5b6784' }}>+91</span>
            <span style={{ width: 1, height: 20, background: '#D6D0C4' }} />
            <input id="phone" inputMode="numeric" maxLength={10} value={phone} placeholder="Enter 10-digit number"
              onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
              style={{ flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent', fontFamily: U, fontWeight: 600, fontSize: 15, color: '#15235E' }} />
          </div>
        </div>
        <button className="hov-btn" onClick={onPay} style={{ width: '100%', height: 60, background: '#2D6CDF', borderRadius: 999, fontFamily: D, fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: 12 }}>Pay {p.price} →</button>
        <div style={{ textAlign: 'center', fontFamily: U, fontWeight: 600, fontSize: 12, color: '#9aa3b8', marginBottom: 8 }}>Safe &amp; secure · UPI · Instant access</div>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontFamily: D, fontWeight: 700, fontSize: 11, color: '#E0407D', background: '#FDEAF1', borderRadius: 999, padding: '4px 14px', display: 'inline-block' }}>Prototype: tap Pay to simulate payment</span>
        </div>
      </div>
    </div>
  );
}
