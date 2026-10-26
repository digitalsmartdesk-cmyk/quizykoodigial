'use client';
import type { AgeMode, Screen } from '@/types/quiz';
import { D, U, container, pill, type Layout } from '@/lib/ui';
import Koo from './Koo';
import AgeChips from './AgeChips';
import TopicGrid from './TopicGrid';
import FaqGrid from './FaqGrid';

interface Props {
  L: Layout; ageMode: AgeMode; counts: Record<string, number>; total: number;
  onAge: (m: AgeMode) => void; onTopic: (id: string) => void; onGo: (s: Screen) => void;
}

const STEPS = [
  { c: '#2D6CDF', t: 'Choose your age', b: 'Explorer for ages 7–8: bigger text, friendly pace. Champion for 9–11: confident challenge mode.' },
  { c: '#FF8A2C', t: 'Pick a topic', b: '10 topics from Animal Kingdom to Mythology. Each 10-question test is drawn from a larger question bank. ₹15 per test.' },
  { c: '#5DCC4E', t: 'Play & celebrate', b: 'Answer 10 questions, see your score instantly, and celebrate with Koo. No waiting, no signup.' },
];

const PRICES = [
  { label: 'Single test', price: '₹15', desc: 'One topic · 10 questions', cta: 'Get a test' },
  { label: '5-test pack', price: '₹59', desc: 'Save 21% · any 5 topics', cta: 'Get 5 tests', hot: true },
  { label: '15-test pack', price: '₹149', desc: 'Best value · save 34%', cta: 'Get 15 tests' },
];

const h1s = (sz: number, c: string) => ({ fontFamily: D, fontWeight: 800, fontSize: sz, color: c, display: 'inline-block' } as const);

export default function HomeScreen({ L, ageMode, counts, total, onAge, onTopic, onGo }: Props) {
  const h1 = L.desktop ? 62 : L.sm ? 42 : 52;
  const ctaP = L.desktop ? '14px 32px' : '12px 24px'; const ctaSz = L.desktop ? 18 : 16;
  const secTitle = { fontFamily: D, fontWeight: 800, fontSize: L.secTitle } as const;
  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      <section style={{ padding: `${L.desktop ? 80 : 40}px 0` }}>
        <div style={{ ...container(L.pad), display: 'flex', alignItems: 'center', gap: 56, minHeight: L.desktop ? 500 : 0 }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div style={{ background: '#EAF1FC', borderRadius: 999, padding: '5px 14px', alignSelf: 'flex-start', fontFamily: D, fontWeight: 800, fontSize: 12, color: '#2D6CDF', letterSpacing: '0.05em' }}>Ages 7–11 · India&apos;s favourite quiz app</div>
            <h1 style={{ margin: 0, lineHeight: 1.15 }}>
              <span style={h1s(h1, '#2D6CDF')}>Play</span> <span style={h1s(h1, '#E0407D')}>Smart.</span><br />
              <span style={h1s(h1, '#FF8A2C')}>Learn</span> <span style={h1s(h1, '#5DCC4E')}>Fast.</span>
            </h1>
            <p style={{ margin: 0, fontFamily: U, fontWeight: 600, fontSize: L.desktop ? 17 : 15, color: '#5b6784', lineHeight: 1.65, maxWidth: 480 }}>
              10-question tests on topics kids love. Play in Explorer mode (ages 7–8) or Champion mode (ages 9–11). ₹15 per test — no subscription, no login.
            </p>
            <AgeChips value={ageMode} onChange={onAge} variant="hero" />
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="hov-btn" onClick={() => onGo('play')} style={pill({ padding: ctaP, fontSize: ctaSz })}>Try free quiz →</button>
              <button className="hov-btn" onClick={() => onGo('packs')} style={pill({ padding: ctaP, fontSize: ctaSz, background: '#fff', color: '#2D6CDF', border: '2px solid #2D6CDF' })}>See packs &amp; pricing</button>
            </div>
            <div style={{ fontFamily: D, fontWeight: 700, fontSize: 12, color: '#9aa3b8', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <span>✓ Curriculum-aligned</span><span>✓ No login needed</span><span>✓ Instant access</span>
            </div>
          </div>
          {L.desktop && (
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <Koo state="idle" size={300} style={{ boxShadow: '0 28px 80px rgba(21,35,94,0.3)', animation: 'kooFloat 3s ease-in-out infinite' }} />
              <div style={{ width: 320, background: '#fff', borderRadius: 18, padding: 18, boxShadow: '0 8px 32px rgba(0,0,0,0.11)', border: '1.5px solid #E7E2D4' }} aria-hidden>
                <div style={{ fontFamily: D, fontWeight: 800, fontSize: 10, color: '#9aa3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Science &amp; Nature · Q 4 of 10</div>
                <div style={{ fontFamily: D, fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Which planet is closest to the Sun?</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#EAF7E9', border: '2px solid #5DCC4E', borderRadius: 10, padding: '8px 12px' }}>
                    <div style={{ width: 24, height: 24, borderRadius: 999, background: '#5DCC4E', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: D, fontWeight: 800, fontSize: 11 }}>✓</div>
                    <span style={{ fontFamily: D, fontWeight: 700, fontSize: 14, flex: 1 }}>Mercury</span>
                    <span style={{ fontFamily: D, fontWeight: 800, fontSize: 10, color: '#5DCC4E' }}>Correct!</span>
                  </div>
                  {[['B', 'Venus'], ['C', 'Mars']].map(([l, t]) => (
                    <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F5F3EF', border: '1.5px solid #E7E2D4', borderRadius: 10, padding: '8px 12px', opacity: 0.5 }}>
                      <div style={{ width: 24, height: 24, borderRadius: 999, background: '#E7E2D4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: D, fontWeight: 800, fontSize: 11, color: '#9aa3b8' }}>{l}</div>
                      <span style={{ fontFamily: D, fontWeight: 700, fontSize: 14, color: '#9aa3b8' }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="how-it-works" style={{ background: '#15235E', padding: `${L.secPad}px 0` }}>
        <div style={container(L.pad)}>
          <div style={{ textAlign: 'center', marginBottom: L.secGap }}>
            <h2 style={{ ...secTitle, color: '#fff', margin: 0 }}>How it works</h2>
            <div style={{ fontFamily: U, fontWeight: 600, fontSize: 15, color: 'rgba(255,255,255,0.85)', marginTop: 8 }}>Simple for kids. Reassuring for parents.</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: L.desktop ? 'repeat(3,1fr)' : '1fr', gap: L.desktop ? 24 : 16 }}>
            {STEPS.map((s, i) => (
              <div key={s.t} style={{ background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '28px 24px' }}>
                <div style={{ width: 52, height: 52, borderRadius: 999, background: s.c, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, fontFamily: D, fontWeight: 800, fontSize: 22, color: '#fff' }}>{i + 1}</div>
                <div style={{ fontFamily: D, fontWeight: 800, fontSize: 20, color: '#fff', marginBottom: 8 }}>{s.t}</div>
                <div style={{ fontFamily: U, fontWeight: 600, fontSize: 14, color: '#fff', lineHeight: 1.6 }}>{s.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="topics" style={{ padding: `${L.secPad}px 0` }}>
        <div style={container(L.pad)}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: L.secGap, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 style={{ ...secTitle, margin: 0 }}>Browse topics</h2>
              <div style={{ fontFamily: U, fontWeight: 600, fontSize: 14, color: '#5b6784', marginTop: 4 }}>{total} questions ready · 10 topics</div>
            </div>
            <button className="hov-btn" onClick={() => onGo('play')} style={pill({ padding: '10px 22px', fontSize: 15 })}>Choose a topic →</button>
          </div>
          <TopicGrid L={L} counts={counts} selected={null} onPick={onTopic} />
        </div>
      </section>

      <section style={{ padding: `${L.secPad}px 0` }}>
        <div style={container(L.pad)}>
          <div style={{ textAlign: 'center', marginBottom: L.secGap }}>
            <h2 style={{ ...secTitle, margin: 0 }}>Questions parents ask</h2>
            <div style={{ fontFamily: U, fontWeight: 600, fontSize: 15, color: '#5b6784', marginTop: 8 }}>Honest answers before you spend a rupee.</div>
          </div>
          <FaqGrid />
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <a href="/for-parents/" className="hov-btn" style={pill({ display: 'inline-block', padding: '12px 28px', fontSize: 16, background: '#fff', color: '#2D6CDF', border: '2px solid #2D6CDF' })}>More information for parents →</a>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', borderTop: '2px solid #E7E2D4', borderBottom: '2px solid #E7E2D4', padding: `${L.secPad}px 0` }}>
        <div style={container(L.pad)}>
          <div style={{ textAlign: 'center', marginBottom: L.secGap }}>
            <h2 style={{ ...secTitle, margin: 0 }}>Simple, fair pricing</h2>
            <div style={{ fontFamily: U, fontWeight: 600, fontSize: 15, color: '#5b6784', marginTop: 8 }}>Pay per test. No subscription. Access never expires.</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: L.desktop ? 'repeat(3,1fr)' : '1fr', gap: 20, maxWidth: 860, margin: '0 auto' }}>
            {PRICES.map(p => (
              <div key={p.label} style={{ background: p.hot ? '#15235E' : '#FBF7EC', border: p.hot ? '2px solid #2D6CDF' : '1.5px solid #E7E2D4', borderRadius: 20, padding: '28px 24px', textAlign: 'center', position: 'relative' }}>
                {p.hot && <div style={{ position: 'absolute', top: 12, right: 12, background: '#FFCD2E', borderRadius: 999, padding: '3px 10px', fontFamily: D, fontWeight: 800, fontSize: 10, color: '#15235E' }}>Most popular</div>}
                <div style={{ fontFamily: D, fontWeight: 800, fontSize: 11, color: p.hot ? 'rgba(255,255,255,0.85)' : '#9aa3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }}>{p.label}</div>
                <div style={{ fontFamily: D, fontWeight: 800, fontSize: 44, color: p.hot ? '#fff' : '#15235E', lineHeight: 1 }}>{p.price}</div>
                <div style={{ fontFamily: U, fontWeight: 600, fontSize: 13, color: p.hot ? 'rgba(255,255,255,0.9)' : '#5b6784', margin: '10px 0 18px', lineHeight: 1.5 }}>{p.desc}</div>
                <button className="hov-btn" onClick={() => onGo('packs')} style={pill({ padding: '10px 20px', fontSize: 15, width: '100%', ...(p.hot ? { background: '#FFCD2E', color: '#15235E' } : {}) })}>{p.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
