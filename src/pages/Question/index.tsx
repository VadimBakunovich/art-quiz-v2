import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useStore } from 'store';
import {
  getLevelParams,
  getStopTimerFlag,
  getTimer,
  doActions,
  playAudio,
  stopAudio,
} from 'utils';
import { AnimatedContainer } from 'components/AnimatedContainer';
import ArtQuestion from 'components/ArtQuestion';
import { PaintQuestion } from 'components/PaintQuestion';
import GameInfo from 'components/GameInfo';
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

  let { current: timerId } = useRef<number | null>(null);

  useEffect(() => {
    if (gameType) {
      timerId = getTimer({
        userAnswer: null,
        rightAnswer,
        newVariants,
        lifes,
        setLifes,
        setRightAnswInRow,
        setQuestionVariants,
        toggleModalOpen,
      });
      if (timerId) playAudio(C.tickSound);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
      if (!C.tickSound.paused) stopAudio(C.tickSound);
    };
  }, []);

  function checkAnswer(userAnswer: Painting) {
    if (timerId) clearTimeout(timerId);

    playAudio(C.clickSound);
    answer.current = userAnswer;
    let isLifeAdded = false;

    if (userAnswer.author === rightAnswer.author) {
      playAudio(C.rightAnswSound);
      setRightAnswInRow(true);
      if (!((rightAnswInRow + 1) % 5)) {
        isLifeAdded = true;
        setLifes(true);
      }
    } else {
      playAudio(C.wrongAnswSound);
      setRightAnswInRow(false);
      setLifes(false);
    }

    doActions({
      userAnswer,
      rightAnswer,
      isLifeAdded,
      newVariants,
      lifes,
      setQuestionVariants,
      toggleModalOpen,
    });
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
