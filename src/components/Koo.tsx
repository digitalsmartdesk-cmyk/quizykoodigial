import type { CSSProperties } from 'react';

export type KooState = 'cheering' | 'thinking' | 'wink' | 'star-struck' | 'idle' | 'sleepy';

interface Props { state: KooState; size?: number | string; radius?: number | string; style?: CSSProperties; }

export default function Koo({ state, size = 100, radius = 999, style }: Props) {
  return (
    <div style={{ width: size, height: size, borderRadius: radius, background: '#15235E', overflow: 'hidden', flexShrink: 0, ...style }}>
      <img src={`/images/koo-${state}.jpg`} alt="Koo the Quizykoo mascot" style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'screen', display: 'block' }} />
    </div>
  );
}
