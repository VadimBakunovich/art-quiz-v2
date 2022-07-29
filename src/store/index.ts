import create from 'zustand';

import db from 'db.json';
import Painting, { GameType } from 'interfaces';

interface State {
  gameType: GameType;
  startGame(gameType: GameType): void;

  questionVariants: Painting[];
  setQuestionVariants(variants: Painting[]): void;

  lifes: number;
  setLifes(isAdd: boolean): void;

  rightAnswInRow: number;
  setRightAnswInRow(isAdd: boolean): void;

  isModalOpen: boolean;
  modalContent: JSX.Element | null;
  toggleModalOpen(modalContent?: JSX.Element): void;
}

export const useStore = create<State>(set => ({
  gameType: '',
  startGame: gameType =>
    set(() => ({
      gameType,
      questionVariants: db,
      lifes: 3,
      rightAnswInRow: 0,
    })),

  questionVariants: db,
  setQuestionVariants: variants => set(() => ({ questionVariants: variants })),

  lifes: 3,
  setLifes: isAdd =>
    set(({ lifes }) => ({ lifes: isAdd ? lifes + 1 : lifes - 1 })),

  rightAnswInRow: 0,
  setRightAnswInRow: isAdd =>
    set(({ rightAnswInRow }) => ({
      rightAnswInRow: isAdd ? rightAnswInRow + 1 : 0,
    })),

  isModalOpen: false,
  modalContent: null,
  toggleModalOpen: modalContent =>
    set(() =>
      modalContent
        ? { isModalOpen: true, modalContent }
        : { isModalOpen: false }
    ),
}));
