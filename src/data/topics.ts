import type { TopicInfo } from '@/types/quiz';

export const TOPICS: TopicInfo[] = [
  { id: 'Animal Kingdom',    letter: 'An', accent: '#5DCC4E', tint: '#EAF7E9' },
  { id: 'English Language',  letter: 'En', accent: '#2D6CDF', tint: '#EAF1FC' },
  { id: 'Sports',            letter: 'Sp', accent: '#E0407D', tint: '#FDEAF1' },
  { id: "Children's Stories",letter: 'St', accent: '#9B5BDF', tint: '#F3ECFB' },
  { id: 'General Knowledge', letter: 'GK', accent: '#FF8A2C', tint: '#FFEEE0' },
  { id: 'Geography',         letter: 'Ge', accent: '#65BDFF', tint: '#EAF7FF' },
  { id: 'Indian History',    letter: 'IH', accent: '#FF8A2C', tint: '#FFF3E0' },
  { id: 'Logic & Puzzles',   letter: 'Lo', accent: '#9B5BDF', tint: '#F3ECFB' },
  { id: 'Mythology',         letter: 'My', accent: '#FFCD2E', tint: '#FFF8E1' },
  { id: 'Science & Nature',  letter: 'Sc', accent: '#5DCC4E', tint: '#EAF7E9' },
];

export function getTopicInfo(id: string | null): TopicInfo {
  return TOPICS.find(t => t.id === id) ?? TOPICS[0];
}
