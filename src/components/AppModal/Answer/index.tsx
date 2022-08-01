import { useRef } from 'react';
import { faCircleInfo, faHeart } from '@fortawesome/free-solid-svg-icons';

import { useStore } from 'store';
import { useModalClose } from 'hooks';
import { PopUpLink } from 'components/PopUpLink';
import Painting from 'interfaces';
import S from './styled';

type Props = {
  userAnswer: Painting | null;
  rightAnswer: Painting;
  isLifeAdded: boolean;
};

export default function Answer({
  userAnswer,
  rightAnswer,
  isLifeAdded,
}: Props) {
  const handleClick = useModalClose();

  const gameType = useStore(state => state.gameType);
  const { current: nextQuestionNum } = useRef(
    242 - useStore.getState().questionVariants.length
  );

  const { author, name, year } = rightAnswer;
  const isRightAnswer = userAnswer?.author === author;

  return (
    <S.Container>
      <S.Title isRightAnswer={isRightAnswer}>
        {userAnswer ? (isRightAnswer ? 'Верно' : 'Не верно') : 'Время истекло'}
      </S.Title>

      <S.Wrapper>
        <S.InfoIcon icon={faCircleInfo} />
        <S.Text>
          {isRightAnswer
            ? `Эта картина называется "${name}". ${author} написал её в ${year} году.`
            : `Подсказка: картина называется "${name}". Художник написал её в ${year} году.`}
        </S.Text>
      </S.Wrapper>

      {isLifeAdded && (
        <div>
          <S.HeartIcon icon={faHeart} />
          <S.Text>
            Поздравляем! За 5 правильных ответов подряд Вам была добавлена
            "жизнь"!
          </S.Text>
        </div>
      )}

      <PopUpLink
        onClick={handleClick}
        to={`${gameType}/${nextQuestionNum}`}
        replace
      >
        Следующий вопрос
      </PopUpLink>
    </S.Container>
  );
}
