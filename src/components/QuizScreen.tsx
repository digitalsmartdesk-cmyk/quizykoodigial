'use client';
import type { AgeMode, Question } from '@/types/quiz';
import { getTopicInfo } from '@/data/topics';
import { D, container, type Layout } from '@/lib/ui';
import Koo from './Koo';

interface Props {
  L: Layout; question: Question; qIndex: number; total: number; score: number; ageMode: AgeMode; topic: string;
  picked: string | null; onPick: (a: string) => void; onNext: () => void; onExit: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizScreen({ L, question, qIndex, total, score, ageMode, topic, picked, onPick, onNext, onExit }: Props) {
  const exp = ageMode === 'explorer'; const ti = getTopicInfo(topic);
  const answered = picked !== null; const correct = picked === question.correct;
  const last = qIndex === total - 1;
  const kooState = answered ? (correct ? 'cheering' : 'wink') : 'thinking';
  const qSz = exp ? (L.desktop ? 24 : 20) : (L.desktop ? 22 : 18);
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header role="banner" style={{ background: '#fff', borderBottom: '2px solid #15235E', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ ...container(L.pad), height: 62, display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={onExit} aria-label="Back to home" className="hov-btn" style={{ width: 38, height: 38, borderRadius: 999, border: '1.5px solid #E7E2D4', background: '#FBF7EC', fontSize: 16, color: '#15235E', flexShrink: 0 }}>←</button>
          {L.sm ? null : <div style={{ fontFamily: D, fontWeight: 800, fontSize: 12, color: '#5b6784', whiteSpace: 'nowrap' }}>{topic}</div>}
          <div role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={qIndex} style={{ flex: 1, height: 7, background: '#E7E2D4', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.round((qIndex / total) * 100) + 100 / total}%`, background: '#2D6CDF', borderRadius: 999, transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ fontFamily: D, fontWeight: 800, fontSize: 14, whiteSpace: 'nowrap' }}>Q{qIndex + 1}/{total}</div>
          <div style={{ background: '#EAF7E9', borderRadius: 999, padding: '5px 13px', fontFamily: D, fontWeight: 800, fontSize: 13, color: '#3FA832', whiteSpace: 'nowrap' }} aria-live="polite">{score} correct</div>
        </div>
      </header>
      <main role="main" style={{ flex: 1, ...container(0), width: '100%', padding: L.desktop ? '32px 48px' : '20px', display: 'flex', gap: 40, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {!L.desktop && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Koo state={kooState} size={60} />
              <div style={{ background: ti.tint, border: `1.5px solid ${ti.accent}`, borderRadius: 999, padding: '5px 13px', fontFamily: D, fontWeight: 800, fontSize: 11, color: ti.accent }}>{topic}</div>
            </div>
          )}
          <h2 style={{ margin: 0, fontFamily: D, fontWeight: 800, fontSize: qSz, lineHeight: 1.25, textWrap: 'pretty' }}>{question.q}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: exp ? 11 : 9 }}>
            {question.opts.map((text, i) => {
              const isC = text === question.correct; const isP = text === picked;
              let bg = '#fff', border = '1.5px solid #E7E2D4', bb = '#EAF1FC', bc = '#2D6CDF', bt = LETTERS[i], tc = '#15235E', tag = '', tagC = '#5b6784';
              if (answered) {
                if (isC) { bg = '#EAF7E9'; border = '2px solid #5DCC4E'; bb = '#5DCC4E'; bc = '#fff'; bt = '✓'; tag = 'Correct'; tagC = '#5DCC4E'; }
                else if (isP) { bg = '#F5F3EF'; border = '1.5px solid #D6D0C4'; bb = '#D6D0C4'; bc = '#9aa3b8'; tc = '#9aa3b8'; tag = 'Your pick'; tagC = '#9aa3b8'; }
                else { bg = '#F5F3EF'; bb = '#E7E2D4'; bc = '#9aa3b8'; tc = '#9aa3b8'; }
              }
              return (
                <button key={i} disabled={answered} onClick={() => onPick(text)}
                  style={{ display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', background: bg, border, borderRadius: 14, padding: '0 18px', minHeight: exp ? 60 : 54, cursor: answered ? 'default' : 'pointer', transition: 'background .2s, border .2s' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 999, background: bb, color: bc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: D, fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{bt}</div>
                  <div style={{ fontFamily: D, fontWeight: 700, fontSize: exp ? 17 : 15, color: tc, flex: 1, padding: '14px 0', lineHeight: 1.3 }}>{text}</div>
                  {tag && <div style={{ fontFamily: D, fontWeight: 800, fontSize: 11, color: tagC, whiteSpace: 'nowrap' }}>{tag}</div>}
                </button>
              );
            })}
          </div>
          {answered && (
            <>
              <div aria-live="assertive" role="status" style={{ background: correct ? '#EAF7E9' : '#FFF8E1', border: correct ? '1.5px solid #5DCC4E' : '1.5px solid #FFCD2E', borderRadius: 14, padding: '14px 18px', fontFamily: D, fontWeight: 700, fontSize: 14, lineHeight: 1.55, animation: 'fadeUp 0.25s ease' }}>
                {correct ? 'Correct! Great thinking.' : `The answer is: ${question.correct}`}
              </div>
              <button className="hov-btn" onClick={onNext} style={{ height: 56, background: '#2D6CDF', borderRadius: 999, fontFamily: D, fontWeight: 700, fontSize: 18, color: '#fff', animation: 'fadeUp 0.3s ease' }}>
                {last ? 'See your results →' : 'Next question →'}
              </button>
            </>
          )}
        </div>
        {L.desktop && (
          <aside style={{ width: 288, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 78 }}>
            <Koo state={kooState} size="100%" radius={24} style={{ aspectRatio: '1 / 1' }} />
            <div style={{ background: ti.tint, border: `2px solid ${ti.accent}`, borderRadius: 14, padding: '12px 16px', textAlign: 'center', fontFamily: D, fontWeight: 800, fontSize: 11, color: ti.accent, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{topic}</div>
            <div style={{ background: '#fff', border: '1.5px solid #E7E2D4', borderRadius: 14, padding: 16 }}>
              <div style={{ fontFamily: D, fontWeight: 800, fontSize: 10, color: '#9aa3b8', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Score so far</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
                <span style={{ fontFamily: D, fontWeight: 800, fontSize: 44, color: '#2D6CDF', lineHeight: 1 }}>{score}</span>
                <span style={{ fontFamily: D, fontWeight: 800, fontSize: 20, color: '#D6D0C4' }}>/ {qIndex + (answered ? 1 : 0)}</span>
              </div>
              <div style={{ fontFamily: D, fontWeight: 700, fontSize: 12, color: '#5b6784', marginTop: 2 }}>correct · question {qIndex + 1} of {total}</div>
            </div>
            <div style={{ background: exp ? '#EAF1FC' : '#F3ECFB', border: `1.5px solid ${exp ? '#2D6CDF' : '#9B5BDF'}`, borderRadius: 999, padding: '9px 16px', textAlign: 'center', fontFamily: D, fontWeight: 800, fontSize: 12, color: exp ? '#2D6CDF' : '#9B5BDF' }}>{exp ? 'Explorer' : 'Champion'} mode</div>
          </aside>
        )}
      </main>
    </div>
  );
}
