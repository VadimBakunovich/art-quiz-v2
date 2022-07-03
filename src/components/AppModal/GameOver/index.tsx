import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';

import { useStore } from 'store';
import { playAudio } from 'utils';
import { PopUpLink } from 'components/PopUpLink';
import Painting from 'interfaces';
import C from 'constants';
import S from './styled';

type Props = {
  userAnswer: Painting | null;
};

export default function GameOver({ userAnswer }: Props) {
  const toggleModalOpen = useStore(state => state.toggleModalOpen);

  function handleClick() {
    playAudio(C.clickSound);
    toggleModalOpen();
  }

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
