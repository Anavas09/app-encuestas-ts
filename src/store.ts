import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Question = {
  id: number;
  type: 'single' | 'multiple' | 'rating';
  question: string;
  options: string[];
};

export type Answer = {
  [key: number]: string | string[] | number;
};

export interface SurveyState {
  answers: Answer;
  setAnswer: (id: number, value: string | string[] | number) => void;
  reset: () => void;
}

export const useSurveyStore = create<SurveyState>()(
  persist(
    (set) => ({
      answers: {},
      setAnswer: (id, value) => set((state) => ({ answers: { ...state.answers, [id]: value } })),
      reset: () => set({ answers: {} }),
    }),
    {
      name: 'survey-answers', // clave en localStorage
    }
  )
);
