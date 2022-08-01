import { Navigate } from 'react-router-dom';

import { useGame } from 'hooks/useGame';

import { AnimatedContainer } from 'components/AnimatedContainer';
import ArtQuestion from 'components/ArtQuestion';
import PaintQuestion from 'components/PaintQuestion';
import GameInfo from 'components/GameInfo';

import S from './styled';

export default function Question() {
  const { gameType, params, isTimerStopped } = useGame();

  return gameType ? (
    <AnimatedContainer>
      <S.Container>
        {gameType === 'artQuestion' && <ArtQuestion {...params} />}
        {gameType === 'paintQuestion' && <PaintQuestion {...params} />}
        <GameInfo isTimerStopped={isTimerStopped} />
      </S.Container>
    </AnimatedContainer>
  ) : (
    <Navigate to='/' />
  );
}
