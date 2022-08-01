import { useEffect } from 'react';

import { useModalClose } from 'hooks';
import { playAudio } from 'utils';
import { PopUpLink } from 'components/PopUpLink';
import C from 'constants';
import S from './styled';

export default function Finish() {
  const handleClick = useModalClose();

  useEffect(() => playAudio(C.gameEndSound), []);

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
