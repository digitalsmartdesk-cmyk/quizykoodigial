import type { AgeMode } from '@/types/quiz';
import { D } from '@/lib/ui';
import Koo from './Koo';

interface Props { value: AgeMode; onChange: (m: AgeMode) => void; variant: 'hero' | 'play'; }

const OPTIONS: { id: AgeMode; hero: [string, string]; play: [string, string] }[] = [
  { id: 'explorer', hero: ['Explorer', 'Ages 7–8 · clear & playful'], play: ['Explorer · Ages 7–8', 'Bigger text, clearer language'] },
  { id: 'champion', hero: ['Champion', 'Ages 9–11 · challenge mode'], play: ['Champion · Ages 9–11', 'Standard sizing, challenge tone'] },
];

export default function AgeChips({ value, onChange, variant }: Props) {
  const hero = variant === 'hero';
  return (
    <div role="radiogroup" aria-label="Age mode" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: hero ? 0 : 28 }}>
      {OPTIONS.map(o => {
        const on = value === o.id; const [title, sub] = o[variant];
        return (
          <button key={o.id} role="radio" aria-checked={on} onClick={() => onChange(o.id)} className="hov-btn"
            style={{ display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', background: on ? '#2D6CDF' : '#fff', border: on ? '2px solid #2D6CDF' : '1.5px solid #D6D0C4', borderRadius: 14, padding: hero ? '12px 18px' : '12px 20px', minWidth: hero ? 160 : undefined }}>
            <Koo state={o.id === 'explorer' ? 'wink' : 'star-struck'} size={44} />
            <div>
              <div style={{ fontFamily: D, fontWeight: 800, fontSize: hero ? 17 : 16, color: on ? '#fff' : '#15235E' }}>{title}</div>
              <div style={{ fontFamily: D, fontWeight: 700, fontSize: 11, marginTop: 2, color: on ? 'rgba(255,255,255,0.8)' : '#5b6784' }}>{sub}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
