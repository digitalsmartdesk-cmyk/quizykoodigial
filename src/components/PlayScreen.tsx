'use client';
import type { AgeMode } from '@/types/quiz';
import { D, U, container, pill, type Layout } from '@/lib/ui';
import AgeChips from './AgeChips';
import TopicGrid from './TopicGrid';

interface Props {
  L: Layout; ageMode: AgeMode; topic: string | null; counts: Record<string, number>;
  onAge: (m: AgeMode) => void; onTopic: (id: string) => void; onNext: () => void;
}

export default function PlayScreen({ L, ageMode, topic, counts, onAge, onTopic, onNext }: Props) {
  return (
    <div style={{ minHeight: `calc(100vh - ${L.navH}px)`, display: 'flex', flexDirection: 'column', animation: 'fadeUp 0.3s ease' }}>
      <div style={{ flex: 1, maxWidth: 1280, margin: '0 auto', width: '100%', padding: L.playPad }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ margin: 0, fontFamily: D, fontWeight: 800, fontSize: L.playTitle }}>Choose a topic</h1>
          <div style={{ fontFamily: U, fontWeight: 600, fontSize: 14, color: '#5b6784', marginTop: 4 }}>
            {topic ? 'Topic selected — tap Choose a pack to continue' : '10 topics available'}
          </div>
        </div>
        <AgeChips value={ageMode} onChange={onAge} variant="play" />
        <TopicGrid L={L} counts={counts} selected={topic} onPick={onTopic} showCheck />
      </div>
      {topic && (
        <div style={{ position: 'sticky', bottom: 0, background: '#FBF7EC', borderTop: '2px solid #E7E2D4', padding: `14px ${L.pad}px`, zIndex: 50 }}>
          <div style={{ ...container(0), display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: D, fontWeight: 800, fontSize: 17 }}>{topic}</div>
              <div style={{ fontFamily: U, fontWeight: 600, fontSize: 12, color: '#5b6784' }}>{ageMode === 'explorer' ? 'Explorer' : 'Champion'} · {counts[topic] ?? 0} questions</div>
            </div>
            <button className="hov-btn" onClick={onNext} style={pill({ padding: '13px 36px', fontSize: 17 })}>Choose a pack →</button>
          </div>
        </div>
      )}
    </div>
  );
}
