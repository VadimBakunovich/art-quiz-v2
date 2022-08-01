import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';

import { useModalClose } from 'hooks';
import { PopUpLink } from 'components/PopUpLink';
import Painting from 'interfaces';
import S from './styled';

type Props = {
  userAnswer: Painting | null;
};

export default function GameOver({ userAnswer }: Props) {
  const handleClick = useModalClose();

  return (
    <S.Container>
      <S.Title>{userAnswer ? 'Не верно' : 'Время истекло'}</S.Title>
      <S.Wrapper>
        <S.HeartIcon icon={faHeartCrack} />
        <S.Text>К сожалению Вы проиграли.</S.Text>
      </S.Wrapper>
      <PopUpLink onClick={handleClick} to='/' replace>
        На главную страницу
      </PopUpLink>
    </S.Container>
  );
}
