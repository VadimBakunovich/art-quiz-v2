import { ChangeEventHandler, useEffect, useRef, useState } from 'react';

import { useStore } from 'store';
import { playAudio, getIsMuted, getIsTimed } from 'utils';
import C from 'constants';

type Handler = ChangeEventHandler<HTMLInputElement>;

export function useSettings() {
  const toggleModalOpen = useStore(state => state.toggleModalOpen);

  const [isMuted, setMuted] = useState<boolean>(getIsMuted());
  const [isTimed, setTimed] = useState<boolean>(getIsTimed());

  const volume = useRef(localStorage.getItem('artQuiz_volume') ?? '0.5');
  const time = useRef(localStorage.getItem('artQuiz_time') ?? '30');
  const timeText = useRef<HTMLInputElement>(null);

  useEffect(
    () => localStorage.setItem('artQuiz_isMuted', `${isMuted}`),
    [isMuted]
  );

  useEffect(
    () => () => {
      localStorage.setItem('artQuiz_volume', volume.current);
      localStorage.setItem('artQuiz_time', time.current);
    },
    []
  );

  const formatTime = (value: string) =>
    +value < 10 ? `0${value} с` : `${value} с`;

  const getTimeApperance = () =>
    isTimed ? formatTime(time.current) : '  - - ';

  useEffect(() => {
    timeText.current!.value = getTimeApperance();
    return () => localStorage.setItem('artQuiz_isTimed', `${isTimed}`);
  }, [isTimed]);

  function toggleMuteHandler() {
    setMuted(!isMuted);
    playAudio(C.clickSound, volume.current);
    localStorage.getItem('artQuiz_volume') ||
      localStorage.setItem('artQuiz_volume', '0.5');
  }

  const volumeChangeHandler: Handler = ({ target }) => {
    volume.current = target.value;
    playAudio(C.clickSound, volume.current);
  };

  function toggleTimed() {
    setTimed(!isTimed);
    playAudio(C.clickSound, volume.current);
  }

  const timeChangeHandler: Handler = ({ target }) => {
    time.current = target.value;
    timeText.current!.value = formatTime(time.current);
    playAudio(C.clickSound, volume.current);
  };

  function handleClick() {
    playAudio(C.clickSound, volume.current);
    toggleModalOpen();
  }

  return {
    toggleMuteHandler,
    volume,
    volumeChangeHandler,
    isMuted,
    toggleTimed,
    isTimed,
    time,
    timeChangeHandler,
    timeText,
    getTimeApperance,
    handleClick,
  };
}
