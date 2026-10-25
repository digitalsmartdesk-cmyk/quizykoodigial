import type { CSSProperties } from 'react';
import type { AgeMode } from '@/types/quiz';

export const D = 'Outfit, sans-serif';
export const U = '"DM Sans", sans-serif';

export interface Layout {
  desktop: boolean; sm: boolean; navH: number; pad: number; secPad: number; secGap: number; secTitle: number;
  topicGrid: string; cardGap: number; cardPad: string; cardH: number; cardNameSz: number; playPad: string; playTitle: number;
}

export function getLayout(vw: number): Layout {
  const desktop = vw >= 1024; const sm = vw < 520;
  return {
    desktop, sm,
    navH: desktop ? 70 : 60, pad: desktop ? 48 : 20,
    secPad: desktop ? 72 : 48, secGap: desktop ? 40 : 28, secTitle: desktop ? 34 : 26,
    topicGrid: desktop ? 'repeat(5,1fr)' : sm ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
    cardGap: desktop ? 16 : 12, cardPad: desktop ? '18px' : '14px', cardH: desktop ? 140 : 120, cardNameSz: desktop ? 14 : 13,
    playPad: desktop ? '40px 48px' : '24px 20px', playTitle: desktop ? 30 : 24,
  };
}

export const container = (pad: number, max = 1280): CSSProperties => ({ maxWidth: max, margin: '0 auto', padding: `0 ${pad}px` });
export const pill = (extra?: CSSProperties): CSSProperties => ({
  background: '#2D6CDF', color: '#fff', borderRadius: 999, fontFamily: D, fontWeight: 700, cursor: 'pointer', textAlign: 'center', whiteSpace: 'nowrap', ...extra,
});

export const AGE = {
  explorer: { name: 'Explorer', sub: 'Ages 7–8', badgeBg: '#EAF1FC', badgeColor: '#2D6CDF' },
  champion: { name: 'Champion', sub: 'Ages 9–11', badgeBg: '#F3ECFB', badgeColor: '#9B5BDF' },
} as const satisfies Record<AgeMode, object>;
