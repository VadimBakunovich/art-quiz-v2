import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useStore } from 'store';
import {
  getLevelParams,
  getStopTimerFlag,
  getIsTimed,
  playAudio,
  stopAudio,
} from 'utils';

import { AnimatedContainer } from 'components/AnimatedContainer';
import ArtQuestion from 'components/ArtQuestion';
import PaintQuestion from 'components/PaintQuestion';
import GameInfo from 'components/GameInfo';
import Answer from 'components/AppModal/Answer';
import GameOver from 'components/AppModal/GameOver';
import Finish from 'components/AppModal/Finish';

import Painting from 'interfaces';
import C from 'constants';
import S from './styled';

export default function Question() {
  const gameType = useStore(state => state.gameType);

  const lifes = useStore(state => state.lifes);
  const setLifes = useStore(state => state.setLifes);

  const rightAnswInRow = useStore(state => state.rightAnswInRow);
  const setRightAnswInRow = useStore(state => state.setRightAnswInRow);

  const { current: questionVariants } = useRef(
    useStore.getState().questionVariants
  );
  const setQuestionVariants = useStore(state => state.setQuestionVariants);

  const toggleModalOpen = useStore(state => state.toggleModalOpen);

  const [{ rightAnswer, answerVariants, newVariants }] = useState(() =>
    getLevelParams(questionVariants)
  );

  const answer = useRef<Painting | null>(null);
  const timerId = useRef<number | null>(null);

  function performActions(isLifeAdded: boolean) {
    setQuestionVariants(newVariants);

    const isGameOver =
      lifes === 1 && answer.current?.author !== rightAnswer.author
        ? true
        : false;

    const content = isGameOver ? (
      <GameOver userAnswer={answer.current} />
    ) : newVariants.length < 4 ? (
      <Finish />
    ) : (
      <Answer
        userAnswer={answer.current}
        rightAnswer={rightAnswer}
        isLifeAdded={isLifeAdded!}
      />
    );
    toggleModalOpen(content);
  }

  function doIfWrongAnswer(sound: HTMLAudioElement) {
    playAudio(sound);
    setLifes(false); // causes rerender
    setRightAnswInRow(false); // causes rerender
  }

  function startTimer() {
    const delay = +(localStorage.getItem('artQuiz_time') ?? 30) * 1000;
    playAudio(C.tickSound);

    return setTimeout(() => {
      stopAudio(C.tickSound);
      doIfWrongAnswer(C.timeOverSound);
      performActions(false);
    }, delay);
  }

  useEffect(() => {
    gameType && getIsTimed() && (timerId.current = startTimer());

    return () => {
      timerId.current && clearTimeout(timerId.current!);
      C.tickSound.paused || stopAudio(C.tickSound);
    };
  }, []);

  function checkAnswer(userAnswer: Painting) {
    timerId.current && stopAudio(C.tickSound);
    timerId.current && clearTimeout(timerId.current!);

    playAudio(C.clickSound);
    answer.current = userAnswer;
    let isLifeAdded = false;

    if (userAnswer.author === rightAnswer.author) {
      playAudio(C.rightAnswSound);
      setRightAnswInRow(true); // causes rerender
      (rightAnswInRow + 1) % 5 || (isLifeAdded = true);
      (rightAnswInRow + 1) % 5 || setLifes(true); // causes rerender
    } else doIfWrongAnswer(C.wrongAnswSound);

    performActions(isLifeAdded);
  }

  const props = {
    answerVariants,
    checkAnswer,
    rightAnswer,
    userAnswer: answer.current?.author,
  };

  return gameType ? (
    <AnimatedContainer>
      <S.Container>
        {gameType === 'artQuestion' && <ArtQuestion {...props} />}
        {gameType === 'paintQuestion' && <PaintQuestion {...props} />}
        <GameInfo isTimerStopped={getStopTimerFlag(!!answer.current)} />
      </S.Container>
    </AnimatedContainer>
  ) : (
    <Navigate to='/' />
  );
}
