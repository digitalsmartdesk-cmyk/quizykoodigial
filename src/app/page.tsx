'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { AgeMode, PackId, Question, Screen } from '@/types/quiz';
import { getLayout } from '@/lib/ui';
import { useViewport } from '@/lib/useViewport';
import Nav from '@/components/Nav';
import HomeScreen from '@/components/HomeScreen';
import PlayScreen from '@/components/PlayScreen';
import PacksScreen from '@/components/PacksScreen';
import CheckoutScreen from '@/components/CheckoutScreen';
import ProcessingScreen from '@/components/ProcessingScreen';
import SuccessScreen from '@/components/SuccessScreen';
import QuizScreen from '@/components/QuizScreen';
import ResultsScreen from '@/components/ResultsScreen';
import SiteFooter from '@/components/SiteFooter';

type QuizData = Record<string, Question[]>;
const FREE_TRIAL_QUESTIONS = 3;
const FULL_TEST_QUESTIONS = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const L = getLayout(useViewport());
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [screen, setScreen] = useState<Screen>('home');
  const [ageMode, setAgeModeState] = useState<AgeMode>('explorer');
  const [topic, setTopic] = useState<string | null>(null);
  const [pack, setPack] = useState<PackId>('five');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    import('@/data/all_questions.json').then(m => setQuizData(m.default as QuizData));
    const go = new URLSearchParams(window.location.search).get('go');
    if (go === 'play' || go === 'packs') setScreen(go);
    else if (go === 'how' || go === 'topics') setTimeout(() => scrollTo(go === 'how' ? 'how-it-works' : 'topics'), 150);
    try {
      const saved = localStorage.getItem('quizykoo.ageMode');
      if (saved === 'explorer' || saved === 'champion') setAgeModeState(saved);
    } catch {}
    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [screen]);

  const setAgeMode = (m: AgeMode) => {
    setAgeModeState(m);
    try { localStorage.setItem('quizykoo.ageMode', m); } catch {}
  };

  const counts: Record<string, number> = quizData
    ? Object.fromEntries(Object.entries(quizData).map(([k, v]) => [k, v.length])) : {};
  const total = Object.values(counts).reduce((s, n) => s + n, 0);

  const startQuiz = useCallback(() => {
    if (!quizData || !topic) return;
    const n = pack === 'free' ? FREE_TRIAL_QUESTIONS : FULL_TEST_QUESTIONS;
    setQuestions(shuffle(quizData[topic] ?? []).slice(0, n));
    setQIndex(0); setScore(0); setPicked(null); setScreen('quiz');
  }, [quizData, topic, pack]);

  const goHome = () => { setTopic(null); setScreen('home'); };
  const proceedFromPacks = () => {
    if (!topic) { setScreen('play'); return; }
    if (pack === 'free') startQuiz(); else setScreen('checkout');
  };
  const pay = () => {
    setScreen('processing');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setScreen('success'), 2300);
  };
  const pick = (answer: string) => {
    if (picked !== null) return;
    setPicked(answer);
    if (answer === questions[qIndex]?.correct) setScore(s => s + 1);
  };
  const next = () => {
    setPicked(null);
    if (qIndex >= questions.length - 1) setScreen('results'); else setQIndex(i => i + 1);
  };

  const homeScreenTopic = (id: string) => { setTopic(id); setScreen('play'); };
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  if (!quizData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <img src="/images/logo.png" alt="Quizykoo" style={{ height: 44, width: 'auto' }} />
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 14, color: '#9aa3b8' }}>Loading questions…</div>
      </div>
    );
  }

  return (
    <>
      <Nav screen={screen} L={L} onGo={setScreen} onHome={goHome} onHow={() => scrollTo('how-it-works')} onTopics={() => scrollTo('topics')} />
      {screen !== 'quiz' && (
        <main role="main">
        {screen === 'home' && <HomeScreen L={L} ageMode={ageMode} counts={counts} total={total} onAge={setAgeMode} onTopic={homeScreenTopic} onGo={setScreen} />}
        {screen === 'play' && <PlayScreen L={L} ageMode={ageMode} topic={topic} counts={counts} onAge={setAgeMode} onTopic={setTopic} onNext={() => setScreen('packs')} />}
        {screen === 'packs' && <PacksScreen L={L} ageMode={ageMode} topic={topic} pack={pack} onPack={setPack} onProceed={proceedFromPacks} />}
        {screen === 'checkout' && <CheckoutScreen L={L} ageMode={ageMode} topic={topic} pack={pack} onPay={pay} />}
        {screen === 'success' && <SuccessScreen L={L} topic={topic} ageMode={ageMode} onStart={startQuiz} onPickTopic={() => setScreen('play')} />}
          {screen === 'processing' && <ProcessingScreen />}
        {screen === 'results' && topic && (
          <ResultsScreen L={L} score={score} total={questions.length} topic={topic} ageMode={ageMode} onOther={() => setScreen('play')} onAgain={startQuiz} />
        )}
        </main>
      )}
      {screen !== 'quiz' && screen !== 'processing' && <SiteFooter />}
      {screen === 'quiz' && questions[qIndex] && (
        <QuizScreen L={L} question={questions[qIndex]} qIndex={qIndex} total={questions.length} score={score} ageMode={ageMode} topic={topic!}
          picked={picked} onPick={pick} onNext={next} onExit={goHome} />
      )}
    </>
  );
}
