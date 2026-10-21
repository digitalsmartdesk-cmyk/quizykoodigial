'use client';

import { useState, useEffect } from 'react';
import HomeScreen from '@/components/HomeScreen';
import QuizScreen from '@/components/QuizScreen';
import ResultsScreen from '@/components/ResultsScreen';
import CheckoutModal from '@/components/CheckoutModal';
import type { AgeMode, Question, Screen } from '@/types/quiz';

type QuizData = Record<string, Question[]>;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [screen, setScreen] = useState<Screen>('home');
  const [ageMode, setAgeMode] = useState<AgeMode>('explorer');
  const [topic, setTopic] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    import('@/data/all_questions.json').then(m => setQuizData(m.default as QuizData));
  }, []);

  const questionCounts: Record<string, number> = quizData
    ? Object.fromEntries(Object.entries(quizData).map(([k, v]) => [k, v.length]))
    : {};

  function handleStartQuiz() {
    if (!topic || !quizData) return;
    const pool = shuffle(quizData[topic] ?? []).slice(0, 10);
    setQuestions(pool);
    setQIndex(0);
    setScore(0);
    setPicked(null);
    setScreen('quiz');
  }

  function handlePickAnswer(answer: string) {
    if (picked) return;
    const isCorrect = answer === questions[qIndex]?.correct;
    setPicked(answer);
    if (isCorrect) setScore(s => s + 1);
  }

  function handleNext() {
    const isLast = qIndex === 9;
    setPicked(null);
    if (isLast) {
      setScreen('results');
    } else {
      setQIndex(i => i + 1);
    }
  }

  function handleGoHome() {
    setScreen('home');
    setTopic(null);
    setQuestions([]);
    setQIndex(0);
    setScore(0);
    setPicked(null);
  }

  function handlePickTopic(id: string) {
    setTopic(prev => (prev === id ? null : id));
  }

  if (!quizData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, background: '#FBF7EC' }}>
        <img src="/images/logo.jpg" alt="Quizykoo" style={{ height: 40, width: 'auto' }} />
        <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, fontSize: 14, color: '#9aa3b8' }}>Loading questions…</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FBF7EC', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 420, minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#FBF7EC', position: 'relative' }}>

        {screen === 'home' && (
          <HomeScreen
            ageMode={ageMode}
            topic={topic}
            questionCounts={questionCounts}
            onSetAgeMode={setAgeMode}
            onPickTopic={handlePickTopic}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {screen === 'quiz' && questions.length > 0 && (
          <QuizScreen
            question={questions[qIndex]}
            qIndex={qIndex}
            score={score}
            ageMode={ageMode}
            topic={topic!}
            picked={picked}
            onPick={handlePickAnswer}
            onNext={handleNext}
            onGoHome={handleGoHome}
          />
        )}

        {screen === 'results' && (
          <ResultsScreen
            score={score}
            topic={topic!}
            onGoHome={handleGoHome}
            onBuyTests={() => setShowCheckout(true)}
          />
        )}

        {showCheckout && (
          <CheckoutModal onClose={() => setShowCheckout(false)} />
        )}
      </div>
    </div>
  );
}
