import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouseChimney,
  faHeart,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';

import { useStore } from 'store';
import { getIsTimed } from 'utils';
import S from './styled';

type Props = {
  isTimerStopped: boolean;
};

export default function GameInfo({ isTimerStopped }: Props) {
  const lifes = useStore(state => state.lifes);
  const { current: questionNum } = useRef(
    242 - useStore.getState().questionVariants.length
  );

  const { current: maxValue } = useRef(
    50 * +localStorage.getItem('artQuiz_time')!
  );

  const [isTimeRunOut, setIsTimeRunOut] = useState(maxValue === 250);

  const { current: isTimed } = useRef(getIsTimed());
  const progress = useRef<HTMLProgressElement | null>(null);
  const timerId = useRef<number | null>(null);

  function timerCallBack() {
    const { value } = progress.current!;
    maxValue !== 250 && value === 250 && setIsTimeRunOut(true);
    value || clearInterval(timerId.current!);
    requestAnimationFrame(() => (progress.current!.value -= 1));
  }

  useEffect(() => {
    if (isTimed) {
      progress.current!.value = maxValue;
      timerId.current = setInterval(timerCallBack, 20);
    }
    return () => clearInterval(timerId.current!);
  }, []);

  useEffect(() => {
    isTimerStopped && clearInterval(timerId.current!);
  }, [isTimerStopped]);

  return (
    <S.Container>
      <S.Link to='/' replace>
        <FontAwesomeIcon icon={faHouseChimney} />
      </S.Link>

      {isTimed && (
        <S.ProgressBar
          isTimeRunOut={isTimeRunOut}
          ref={progress}
          max={maxValue}
        />
      )}

      <S.Wrapper>
        <S.HeartIcon icon={faHeart} />
        <S.Text>× {lifes}</S.Text>
        <S.QuestionIcon icon={faQuestionCircle} />
        <S.Text>{questionNum} / 237</S.Text>
      </S.Wrapper>
    </S.Container>
  );
}
