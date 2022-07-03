import { useEffect } from 'react';

import { useStore } from 'store';
import { playAudio } from 'utils';
import { PopUpLink } from 'components/PopUpLink';
import C from 'constants';
import S from './styled';

export default function Finish() {
  const toggleModalOpen = useStore(state => state.toggleModalOpen);

  useEffect(() => playAudio(C.gameEndSound), []);

  function handleClick() {
    playAudio(C.clickSound);
    toggleModalOpen();
  }

  return (
    <S.Container>
      <S.Title>Вы завершили марафон!</S.Title>
      <S.Medal />
      <PopUpLink onClick={handleClick} to='/' replace>
        На главную страницу
      </PopUpLink>
    </S.Container>
  );
}
