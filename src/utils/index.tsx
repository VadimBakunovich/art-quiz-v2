import { useEffect, useState } from 'react';

import Answer from 'components/AppModal/Answer';
import GameOver from 'components/AppModal/GameOver';
import Finish from 'components/AppModal/Finish';
import Painting from 'interfaces';
import C from 'constants';

type Params = {
  userAnswer: Painting | null;
  rightAnswer: Painting;
  isLifeAdded?: boolean;
  newVariants: Painting[];
  lifes: number;
  setLifes?(isAdd: boolean): void;
  setRightAnswInRow?(isAdd: boolean): void;
  setQuestionVariants(newVariants: Painting[]): void;
  toggleModalOpen(content?: JSX.Element): void;
};

export const getIsTimed = () =>
  JSON.parse(localStorage.getItem('artQuiz_isTimed')!) ?? false;

export function playAudio(
  audio: HTMLAudioElement,
  volume = +(localStorage.getItem('artQuiz_volume') ?? 0.5)
) {
  audio.volume = volume;
  const isMuted = JSON.parse(localStorage.getItem('artQuiz_isMuted')!) ?? true;
  if (!isMuted) audio.play();
}

export function stopAudio(audio: HTMLAudioElement) {
  audio.pause();
  audio.currentTime = 0;
}

const getRandomArrIdx = (arrLength: number) =>
  Math.floor(Math.random() * arrLength);

function shuffleArr(arr: Array<string | Painting>) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const getFilteredVariants = (variants: Painting[], author: string) =>
  variants.filter(variant => variant.author !== author);

function getAnswerVariants(
  wrongAnswers: Painting[],
  answerVariants: Painting[]
) {
  while (answerVariants.length < 4) {
    const answerIdx = getRandomArrIdx(wrongAnswers.length);
    const answerVariant = wrongAnswers[answerIdx];
    answerVariants.push(answerVariant);
    if (answerVariants.length < 4) {
      wrongAnswers = getFilteredVariants(wrongAnswers, answerVariant.author);
    }
  }

  shuffleArr(answerVariants);
  return answerVariants;
}

export function getLevelParams(variants: Painting[]) {
  const rightAnswerIdx = getRandomArrIdx(variants.length);
  const rightAnswer = variants[rightAnswerIdx];
  const newVariants = variants.filter((_, idx) => idx !== rightAnswerIdx);
  const uniqVariants = getFilteredVariants(newVariants, rightAnswer.author);
  const answerVariants = getAnswerVariants(uniqVariants, [rightAnswer]);

  return { rightAnswer, answerVariants, newVariants };
}

export const paintBtn = (isNotAnswer: boolean, isRightAnswer: boolean) =>
  isNotAnswer
    ? '#282828'
    : isRightAnswer
    ? 'var(--color-green)'
    : 'var(--color-red)';

export const styleBtn = (isNotAnswer: boolean, isRightAnswer: boolean) =>
  isNotAnswer
    ? 'none'
    : isRightAnswer
    ? 'brightness(.4) sepia(1) hue-rotate(50deg) saturate(10)'
    : 'brightness(.4) sepia(1) hue-rotate(-50deg) saturate(6)';

export function doActions(params: Params) {
  stopAudio(C.tickSound);
  params.setQuestionVariants(params.newVariants);

  let isGameOver = false;
  if (
    params.lifes === 1 &&
    params.userAnswer?.author !== params.rightAnswer.author
  )
    isGameOver = true;

  const content = isGameOver ? (
    <GameOver userAnswer={params.userAnswer} />
  ) : params.newVariants.length < 4 ? (
    <Finish />
  ) : (
    <Answer
      userAnswer={params.userAnswer}
      rightAnswer={params.rightAnswer}
      isLifeAdded={params.isLifeAdded!}
    />
  );
  params.toggleModalOpen(content);
}

export function getTimer(params: Params) {
  const delay = +(localStorage.getItem('artQuiz_time') ?? 30) * 1000;
  return getIsTimed()
    ? setTimeout(() => {
        playAudio(C.timeOverSound);
        params.setLifes!(false);
        params.setRightAnswInRow!(false);
        doActions(params);
      }, delay)
    : null;
}

export const getStopTimerFlag = (hasUserAnswer: boolean) =>
  getIsTimed() ? hasUserAnswer : false;

export const getImgUrl = (imageNum: string, type: '' | 'full' = 'full') =>
  `${C.baseImgSrc + imageNum + type}.webp`;

export function useImgOnload(src: string) {
  const img = new Image();
  img.src = src;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => (img.onload = () => setIsLoaded(true)), []);

  return isLoaded;
}

export function useImgsOnload(variants: Painting[]) {
  const promises = variants.map(({ imageNum }) => {
    const img = new Image();
    img.src = getImgUrl(imageNum, '');
    return img.decode();
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => ((await Promise.all(promises)) ? setIsLoaded(true) : null))();
  }, []);

  return isLoaded;
}
