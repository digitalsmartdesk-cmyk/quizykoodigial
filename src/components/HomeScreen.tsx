'use client';

import Image from 'next/image';
import { TOPICS } from '@/data/topics';
import type { AgeMode, Question } from '@/types/quiz';

interface Props {
  ageMode: AgeMode;
  topic: string | null;
  questionCounts: Record<string, number>;
  onSetAgeMode: (mode: AgeMode) => void;
  onPickTopic: (id: string) => void;
  onStartQuiz: () => void;
}

export default function HomeScreen({
  ageMode,
  topic,
  questionCounts,
  onSetAgeMode,
  onPickTopic,
  onStartQuiz,
}: Props) {
  const isExplorer = ageMode === 'explorer';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        borderBottom: '2px solid #15235E',
        background: '#FBF7EC',
        flexShrink: 0,
      }}>
        <Image src="/images/logo.jpg" alt="Quizykoo" width={90} height={30} style={{ height: 30, width: 'auto' }} />
        <span style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 12, color: '#5b6784' }}>
          Ages 7–11 · ₹15 per test
        </span>
      </nav>

      {/* Scrollable body */}
      <div style={{ flex: 1, padding: '20px 20px 40px', display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
          <h1 style={{
            fontFamily: 'Fredoka, sans-serif',
            fontWeight: 700,
            fontSize: 26,
            lineHeight: 1.15,
            color: '#15235E',
            margin: 0,
          }}>
            Pick a topic, answer 10 questions, see your score.
          </h1>
          <p style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 600, fontSize: 13, color: '#5b6784', marginTop: 8, marginBottom: 0 }}>
            No login needed. No subscription.
          </p>
        </div>

        {/* Age selector */}
        <div>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 10, color: '#5b6784', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
            Who's playing?
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => onSetAgeMode('explorer')}
              style={{
                flex: 1, padding: '11px 8px', borderRadius: 12, textAlign: 'center', cursor: 'pointer',
                background: isExplorer ? '#2D6CDF' : '#fff',
                border: isExplorer ? '1.5px solid #2D6CDF' : '1.5px solid #D6D0C4',
              }}
            >
              <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: 14, color: isExplorer ? '#fff' : '#15235E' }}>Explorer</div>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 10.5, color: isExplorer ? 'rgba(255,255,255,0.8)' : '#5b6784', marginTop: 2 }}>Ages 7–8</div>
            </button>
            <button
              onClick={() => onSetAgeMode('champion')}
              style={{
                flex: 1, padding: '11px 8px', borderRadius: 12, textAlign: 'center', cursor: 'pointer',
                background: !isExplorer ? '#2D6CDF' : '#fff',
                border: !isExplorer ? '1.5px solid #2D6CDF' : '1.5px solid #D6D0C4',
              }}
            >
              <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: 14, color: !isExplorer ? '#fff' : '#15235E' }}>Champion</div>
              <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 10.5, color: !isExplorer ? 'rgba(255,255,255,0.8)' : '#5b6784', marginTop: 2 }}>Ages 9–11</div>
            </button>
          </div>
        </div>

        {/* Topic grid */}
        <div>
          <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: 17, color: '#15235E', marginBottom: 3 }}>Pick a topic</div>
          <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 11, color: '#9aa3b8', marginBottom: 12 }}>
            {TOPICS.length} topics available
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {TOPICS.map(t => {
              const selected = topic === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onPickTopic(t.id)}
                  style={{
                    background: t.tint,
                    border: selected ? `2px solid ${t.accent}` : `1.5px solid ${t.accent}30`,
                    borderRadius: 14,
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 7,
                    minHeight: 96,
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: selected ? `0 4px 16px ${t.accent}33` : 'none',
                    transition: 'box-shadow 0.15s, border 0.15s',
                  }}
                >
                  <div style={{
                    width: 30, height: 30, borderRadius: 999,
                    background: t.accent, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: 11.5,
                    flexShrink: 0,
                  }}>
                    {t.letter}
                  </div>
                  <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: 13, color: '#15235E', lineHeight: 1.2, flex: 1 }}>
                    {t.id}
                  </div>
                  <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 10, color: '#5b6784' }}>
                    {questionCounts[t.id] ?? 0} questions
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sticky CTA */}
        {topic && (
          <div style={{ position: 'sticky', bottom: 0, padding: '12px 0 4px', background: '#FBF7EC' }}>
            <button
              onClick={onStartQuiz}
              style={{
                width: '100%',
                height: 52,
                background: '#2D6CDF',
                borderRadius: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Fredoka, sans-serif',
                fontWeight: 600,
                fontSize: 16,
                color: '#fff',
                cursor: 'pointer',
                boxShadow: '0 4px 24px rgba(45,108,223,0.35)',
              }}
            >
              Start: {topic} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
