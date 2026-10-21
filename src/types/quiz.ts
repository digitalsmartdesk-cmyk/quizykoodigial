export interface Question {
  q: string;
  opts: string[];
  correct: string;
  topic: string;
}

export interface TopicInfo {
  id: string;
  letter: string;
  accent: string;
  tint: string;
}

export type Screen = 'home' | 'quiz' | 'results';
export type AgeMode = 'explorer' | 'champion';

export interface QuizState {
  screen: Screen;
  ageMode: AgeMode;
  topic: string | null;
  questions: Question[];
  qIndex: number;
  score: number;
  picked: string | null;
}
