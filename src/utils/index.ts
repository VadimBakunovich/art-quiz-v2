import Painting from 'interfaces';
import C from 'constants';

const getRandomNum = (num: number) => Math.floor(Math.random() * num);

function shuffleArr(arr: Array<string | Painting>) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = getRandomNum(i + 1);
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
    const answerIdx = getRandomNum(wrongAnswers.length);
    const answerVariant = wrongAnswers[answerIdx];
    answerVariants.push(answerVariant);
    // exclusion of unnecessary filtering
    answerVariants.length < 4 &&
      (wrongAnswers = getFilteredVariants(wrongAnswers, answerVariant.author));
  }
  shuffleArr(answerVariants);
  return answerVariants;
}

export function getLevelParams(variants: Painting[]) {
  const rightAnswerIdx = getRandomNum(variants.length);
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

export const getIsMuted = (): boolean =>
  JSON.parse(localStorage.getItem('artQuiz_isMuted') ?? 'true');

export const getIsTimed = (): boolean =>
  JSON.parse(localStorage.getItem('artQuiz_isTimed') ?? 'false');

export function playAudio(
  audio: HTMLAudioElement,
  volume = localStorage.getItem('artQuiz_volume') ?? 0.5
) {
  audio.volume = +volume;
  getIsMuted() || audio.play();
}

export function stopAudio(audio: HTMLAudioElement) {
  audio.pause();
  audio.currentTime = 0;
}

export const getStopTimerFlag = (hasUserAnswer: boolean) =>
  getIsTimed() ? hasUserAnswer : false;

export const getImgUrl = (imageNum: string, size: '' | 'full' = 'full') =>
  `${C.imgBaseSrc + imageNum + size}.webp`;
