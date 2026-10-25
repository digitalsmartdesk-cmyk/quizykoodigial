export interface Question { q: string; opts: string[]; correct: string; topic: string; }
export interface TopicInfo { id: string; letter: string; accent: string; tint: string; desc: string; }
export type Screen = 'home' | 'play' | 'packs' | 'checkout' | 'processing' | 'success' | 'quiz' | 'results';
export type AgeMode = 'explorer' | 'champion';
export type PackId = 'free' | 'single' | 'five' | 'fifteen';
export interface Pack {
  id: PackId; label: string; price: string; desc: string; qs: string; popular: boolean;
  accent: string; bg: string; priceColor: string; labelColor: string; descColor: string;
}
