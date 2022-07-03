import { faGear } from '@fortawesome/free-solid-svg-icons';

import { useStore } from 'store';
import { AnimatedContainer } from 'components/AnimatedContainer';
import Settings from 'components/AppModal/Settings';
import { playAudio } from 'utils';
import { GameType } from 'interfaces';
import C from 'constants';
import S from './styled';

export default function HomePage() {
  const startGame = useStore(state => state.startGame);
  const toggleModalOpen = useStore(state => state.toggleModalOpen);

  function handleLinkClick(gameType: GameType) {
    playAudio(C.clickSound);
    startGame(gameType);
  }

  function handleBtnClick() {
    playAudio(C.clickSound);
    toggleModalOpen(<Settings />);
  }

  return (
    <AnimatedContainer>
      <S.Container>
        <S.Wrapper>
          <S.Title>
            <S.TitleBegin>Art</S.TitleBegin>Quiz
            <S.Version>v.2 marathon</S.Version>
          </S.Title>
          <S.Link
            to='artQuestion/1'
            onClick={() => handleLinkClick('artQuestion')}
            replace
          >
            угадай художника
          </S.Link>
          <S.Link
            to='paintQuestion/1'
            onClick={() => handleLinkClick('paintQuestion')}
            replace
          >
            угадай картину
          </S.Link>
          <S.Btn onClick={handleBtnClick}>
            <S.Icon icon={faGear} />
            Настройки
          </S.Btn>
        </S.Wrapper>
      </S.Container>
    </AnimatedContainer>
  );
}
