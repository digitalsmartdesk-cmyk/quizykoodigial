import { TOPICS } from '@/data/topics';
import { D, U, type Layout } from '@/lib/ui';

interface Props { L: Layout; counts: Record<string, number>; selected: string | null; onPick: (id: string) => void; showCheck?: boolean; }

export default function TopicGrid({ L, counts, selected, onPick, showCheck }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: L.topicGrid, gap: L.cardGap }}>
      {TOPICS.map(t => {
        const sel = selected === t.id;
        return (
          <button key={t.id} className="hov-lift" onClick={() => onPick(t.id)} aria-pressed={showCheck ? sel : undefined}
            style={{ textAlign: 'left', background: t.tint, border: sel ? `2.5px solid ${t.accent}` : `1.5px solid ${t.accent}55`, borderRadius: 16, padding: L.cardPad, display: 'flex', flexDirection: 'column', gap: 10, minHeight: L.cardH }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: t.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: D, fontWeight: 800, fontSize: 12 }}>{t.letter}</div>
              {showCheck && sel && <div style={{ width: 22, height: 22, borderRadius: 999, background: '#5DCC4E', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>✓</div>}
            </div>
            <div style={{ fontFamily: D, fontWeight: 800, fontSize: L.cardNameSz, color: '#15235E', lineHeight: 1.25, flex: 1 }}>{t.id}</div>
            <div style={{ fontFamily: U, fontWeight: 600, fontSize: 11, color: '#5b6784' }}>{t.desc}</div>
            <div style={{ fontFamily: D, fontWeight: 800, fontSize: 11, color: t.accent }}>{counts[t.id] ?? 0} questions available</div>
          </button>
        );
      })}
    </div>
  );
}
