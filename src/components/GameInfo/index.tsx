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
    10 * +localStorage.getItem('artQuiz_time')!
  );

  const [isTimeRunOut, setIsTimeRunOut] = useState(maxValue === 50);

  const { current: isTimed } = useRef(getIsTimed());
  const progress = useRef<HTMLProgressElement | null>(null);
  let { current: timerId } = useRef<number | null>(null);
  const timerFlag = useRef(isTimerStopped);

  useEffect(() => {
    if (isTimed) {
      progress.current!.value = maxValue;
      timerId = setInterval(() => {
        const { value } = progress.current!;
        if (maxValue !== 50 && value === 50) setIsTimeRunOut(true);
        if (timerFlag.current || !value) clearInterval(timerId!);
        progress.current!.value -= 1;
      }, 100);
    }
    return () => clearInterval(timerId!);
  }, []);

  useEffect(() => {
    timerFlag.current = isTimerStopped;
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
