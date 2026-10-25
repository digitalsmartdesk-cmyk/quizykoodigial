import type { Pack, TopicInfo } from '@/types/quiz';

export const TOPICS: TopicInfo[] = [
  { id: 'Animal Kingdom', letter: 'AK', accent: '#5DCC4E', tint: '#EAF7E9', desc: 'Fishes, wildlife & nature' },
  { id: 'English Language', letter: 'EN', accent: '#2D6CDF', tint: '#EAF1FC', desc: 'Words, grammar & stories' },
  { id: 'Sports', letter: 'SP', accent: '#E0407D', tint: '#FDEAF1', desc: 'Games, records & athletes' },
  { id: "Children's Stories", letter: 'CS', accent: '#9B5BDF', tint: '#F3ECFB', desc: 'Harry Potter & classics' },
  { id: 'General Knowledge', letter: 'GK', accent: '#FF8A2C', tint: '#FFEEE0', desc: 'World facts & current affairs' },
  { id: 'Geography', letter: 'GE', accent: '#65BDFF', tint: '#EAF7FF', desc: 'Countries & landforms' },
  { id: 'Indian History', letter: 'IH', accent: '#FFCD2E', tint: '#FFF8E1', desc: 'Railways, heroes & culture' },
  { id: 'Logic & Puzzles', letter: 'LO', accent: '#9B5BDF', tint: '#F3ECFB', desc: 'Think, deduce & discover' },
  { id: 'Mythology', letter: 'MY', accent: '#FF8A2C', tint: '#FFEEE0', desc: 'Ramayana & divine tales' },
  { id: 'Science & Nature', letter: 'SN', accent: '#5DCC4E', tint: '#EAF7E9', desc: 'Inventions & discoveries' },
];

export function getTopicInfo(id: string | null): TopicInfo {
  return TOPICS.find(t => t.id === id) ?? TOPICS[0];
}

export const PACKS: Pack[] = [
  { id: 'free', label: 'Free Trial', price: '₹0', desc: '3 sample questions, no payment', qs: '3 questions', popular: false, accent: '#5b6784', bg: '#fff', priceColor: '#5b6784', labelColor: '#9aa3b8', descColor: '#5b6784' },
  { id: 'single', label: '1 Test', price: '₹15', desc: 'One topic · 10 questions', qs: '10 questions', popular: false, accent: '#2D6CDF', bg: '#fff', priceColor: '#2D6CDF', labelColor: '#9aa3b8', descColor: '#5b6784' },
  { id: 'five', label: '5 Tests', price: '₹59', desc: 'Any 5 topics · save 21%', qs: '50 questions', popular: true, accent: '#FF8A2C', bg: '#15235E', priceColor: '#fff', labelColor: 'rgba(255,255,255,0.55)', descColor: 'rgba(255,255,255,0.65)' },
  { id: 'fifteen', label: '15 Tests', price: '₹149', desc: 'Best value · save 34%', qs: '150 questions', popular: false, accent: '#9B5BDF', bg: '#fff', priceColor: '#9B5BDF', labelColor: '#9aa3b8', descColor: '#5b6784' },
];
