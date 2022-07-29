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

  const handleClick = (gameType?: GameType) => () => {
    playAudio(C.clickSound);
    gameType ? startGame(gameType) : toggleModalOpen(<Settings />);
  };

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
            onClick={handleClick('artQuestion')}
            replace
          >
            угадай художника
          </S.Link>

          <S.Link
            to='paintQuestion/1'
            onClick={handleClick('paintQuestion')}
            replace
          >
            угадай картину
          </S.Link>

          <S.Btn onClick={handleClick()}>
            <S.Icon icon={faGear} />
            Настройки
          </S.Btn>
        </S.Wrapper>
      </S.Container>
    </AnimatedContainer>
  );
}
