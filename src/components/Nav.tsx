'use client';
import type { Screen } from '@/types/quiz';
import { D, container, pill, type Layout } from '@/lib/ui';

interface Props { screen: Screen; L: Layout; onGo: (s: Screen) => void; onHome: () => void; onHow: () => void; }

const BACK: Partial<Record<Screen, { label: string; to: Screen }>> = {
  play: { label: 'Home', to: 'home' }, packs: { label: 'Topics', to: 'play' }, checkout: { label: 'Packs', to: 'packs' },
};
const TITLES: Partial<Record<Screen, string>> = { play: 'Choose a topic', packs: 'Choose a pack', checkout: 'Checkout', results: 'Your results' };

export default function Nav({ screen, L, onGo, onHome, onHow }: Props) {
  if (screen === 'processing' || screen === 'quiz') return null;
  const showLogo = ['home', 'packs', 'success', 'results'].includes(screen);
  const back = BACK[screen] ?? { label: 'Back', to: 'home' as Screen };
  const link = { fontFamily: D, fontWeight: 700, fontSize: 14, color: '#5b6784', cursor: 'pointer' } as const;
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 200, background: '#fff', borderBottom: '2px solid #15235E' }}>
      <div style={{ ...container(L.pad), height: L.navH, display: 'flex', alignItems: 'center', gap: 16 }}>
        {showLogo ? (
          <button onClick={onHome} aria-label="Quizykoo home" style={{ flexShrink: 0 }}>
            <img src="/images/logo.png" alt="Quizykoo" style={{ height: L.desktop ? 44 : 34, width: 'auto', display: 'block' }} />
          </button>
        ) : (
          <>
            <button onClick={() => onGo(back.to)} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, padding: '8px 0' }}>
              <span style={{ fontSize: 20, lineHeight: 1, color: '#15235E' }}>←</span>
              <span style={{ fontFamily: D, fontWeight: 700, fontSize: 13, color: '#15235E' }}>{back.label}</span>
            </button>
            <div style={{ flex: 1, textAlign: 'center', fontFamily: D, fontWeight: 800, fontSize: 16 }}>{TITLES[screen] ?? ''}</div>
          </>
        )}
        {screen === 'home' && L.desktop && (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 28 }}>
            <span style={link} onClick={onHow}>How it works</span>
            <span style={link} onClick={() => onGo('play')}>Topics</span>
            <span style={link} onClick={() => onGo('packs')}>Packs</span>
            <span style={link}>For parents</span>
          </div>
        )}
        {['home', 'play', 'results'].includes(screen) && (
          <button className="hov-btn" onClick={() => onGo('play')} style={{ ...pill({ padding: '9px 22px', fontSize: 15 }), marginLeft: 'auto', flexShrink: 0 }}>Try free quiz</button>
        )}
      </div>
    </nav>
  );
}
