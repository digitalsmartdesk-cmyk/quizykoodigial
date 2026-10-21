'use client';

import Image from 'next/image';
import { getTopicInfo } from '@/data/topics';
import type { AgeMode, Question } from '@/types/quiz';

interface Props {
  question: Question;
  qIndex: number;
  score: number;
  ageMode: AgeMode;
  topic: string;
  picked: string | null;
  onPick: (answer: string) => void;
  onNext: () => void;
  onGoHome: () => void;
}

const LETTERS = ['A', 'B', 'C', 'D'];

export default function QuizScreen({
  question, qIndex, score, ageMode, topic, picked, onPick, onNext, onGoHome,
}: Props) {
  const isExplorer = ageMode === 'explorer';
  const topicInfo = getTopicInfo(topic);
  const hasAnswered = !!picked;
  const isCorrectPick = picked === question.correct;
  const isLastQ = qIndex === 9;
  const progressPct = Math.round((qIndex / 10) * 100);

  const qFontSize = isExplorer ? 20 : 18;
  const optHeight = isExplorer ? 56 : 52;
  const optGap = isExplorer ? 10 : 8;
  const optFontSize = qFontSize - 2;

  // Koo state
  let kooSrc = '/images/koo-thinking.jpg';
  let kooGradA = '#FFE9A8', kooGradB = '#FFCD2E';
  if (hasAnswered) {
    if (isCorrectPick) {
      kooSrc = '/images/koo-cheering.jpg';
      kooGradA = '#B8F5B0'; kooGradB = '#5DCC4E';
    } else {
      kooSrc = '/images/koo-wink.jpg';
      kooGradA = '#FFE9A8'; kooGradB = '#FFCD2E';
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Chrome */}
      <div style={{ background: '#FBF7EC', borderBottom: '2px solid #E7E2D4', flexShrink: 0 }}>
        <div style={{ height: 52, display: 'flex', alignItems: 'center', padding: '0 20px' }}>
          <button
            onClick={onGoHome}
            aria-label="Back to home"
            style={{
              width: 36, height: 36, borderRadius: 999,
              border: '1.5px solid #E7E2D4', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, color: '#15235E', cursor: 'pointer', flexShrink: 0,
            }}
          >
            ←
          </button>
          <div style={{ flex: 1, textAlign: 'center', fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: 15, color: '#15235E' }}>
            Question {qIndex + 1} of 10
          </div>
          <div style={{ width: 36, textAlign: 'right', fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: 13, color: '#2D6CDF' }}>
            {score}/{qIndex + (hasAnswered ? 1 : 0)}
          </div>
        </div>
        <div style={{ height: 5, background: '#E7E2D4', margin: '0 20px 10px', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progressPct}%`, background: '#2D6CDF', borderRadius: 999, transition: 'width 0.3s' }} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '16px 20px 28px', display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>

        {/* Koo + topic chip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 999,
            background: `linear-gradient(160deg, ${kooGradA}, ${kooGradB})`,
            overflow: 'hidden', flexShrink: 0,
            transition: 'background 0.3s',
          }}>
            <Image src={kooSrc} alt="Koo mascot" width={72} height={72} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 999 }} />
          </div>
          <div style={{
            background: topicInfo.tint,
            border: `1.5px solid ${topicInfo.accent}`,
            borderRadius: 999, padding: '5px 12px',
            fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 11, color: topicInfo.accent,
          }}>
            {topic}
          </div>
        </div>

        {/* Question */}
        <div style={{
          fontFamily: 'Fredoka, sans-serif', fontWeight: 700,
          fontSize: qFontSize, lineHeight: 1.25, color: '#15235E',
        }}>
          {question.q}
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: optGap }}>
          {question.opts.map((text, i) => {
            const isCorrect = text === question.correct;
            const isPicked = text === picked;

            let bg = '#fff';
            let border = '1.5px solid #E7E2D4';
            let badgeBg = '#EAF1FC';
            let badgeColor = '#2D6CDF';
            let badgeText: string = LETTERS[i];
            let textColor = '#15235E';
            let showTag = false;
            let tag = '';
            let tagColor = '#5b6784';

            if (hasAnswered) {
              if (isCorrect) {
                bg = '#EAF7E9'; border = '2px solid #5DCC4E';
                badgeBg = '#5DCC4E'; badgeColor = '#fff'; badgeText = '✓';
                showTag = true; tag = 'Correct'; tagColor = '#5DCC4E';
              } else if (isPicked) {
                bg = '#F5F3EF'; border = '1.5px solid #D6D0C4';
                badgeBg = '#D6D0C4'; badgeColor = '#9aa3b8';
                textColor = '#9aa3b8';
                showTag = true; tag = 'Your pick'; tagColor = '#9aa3b8';
              } else {
                bg = '#F5F3EF'; border = '1.5px solid #E7E2D4';
                badgeBg = '#E7E2D4'; badgeColor = '#9aa3b8'; textColor = '#9aa3b8';
              }
            }

            return (
              <button
                key={i}
                onClick={() => !hasAnswered && onPick(text)}
                disabled={hasAnswered}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: bg, border, borderRadius: 13,
                  padding: '0 14px', minHeight: optHeight,
                  cursor: hasAnswered ? 'default' : 'pointer',
                  textAlign: 'left', width: '100%',
                  transition: 'background 0.2s, border 0.2s',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: 999,
                  background: badgeBg, color: badgeColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Fredoka, sans-serif', fontWeight: 700, fontSize: 12,
                  flexShrink: 0,
                }}>
                  {badgeText}
                </div>
                <div style={{ fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: optFontSize, color: textColor, flex: 1, lineHeight: 1.25, padding: '10px 0' }}>
                  {text}
                </div>
                {showTag && (
                  <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: 10, color: tagColor, whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {tag}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback + next */}
        {hasAnswered && (
          <>
            <div style={{
              background: isCorrectPick ? '#EAF7E9' : '#FFF8E1',
              border: isCorrectPick ? '1.5px solid #5DCC4E' : '1.5px solid #FFCD2E',
              borderRadius: 14, padding: '12px 14px',
              fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 13, color: '#15235E', lineHeight: 1.5,
            }}>
              {isCorrectPick ? "That's right! Great thinking." : `The answer is: ${question.correct}`}
            </div>
            <button
              onClick={onNext}
              style={{
                height: 52, background: '#2D6CDF', borderRadius: 999,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Fredoka, sans-serif', fontWeight: 600, fontSize: 16, color: '#fff',
                cursor: 'pointer', width: '100%', marginTop: 4,
                boxShadow: '0 4px 24px rgba(45,108,223,0.35)',
              }}
            >
              {isLastQ ? 'See results →' : 'Next question →'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
