import { ChangeEventHandler, useState, useEffect, useRef } from 'react';
import {
  faVolumeXmark,
  faVolumeHigh,
  faHourglass,
} from '@fortawesome/free-solid-svg-icons';

import { useStore } from 'store';
import { playAudio } from 'utils';
import C from 'constants';
import S, { CheckBoxLabel } from './styled';

type Handler = ChangeEventHandler<HTMLInputElement>;

export default function Settings() {
  const { toggleModalOpen } = useStore();

  const [isMuted, setMuted] = useState<boolean>(
    JSON.parse(localStorage.getItem('artQuiz_isMuted')!) ?? true
  );

  const [isTimed, setTimed] = useState<boolean>(
    JSON.parse(localStorage.getItem('artQuiz_isTimed')!) ?? false
  );

  const volume = useRef(+(localStorage.getItem('artQuiz_volume') ?? 0.5));
  const time = useRef(+(localStorage.getItem('artQuiz_time') ?? 30));
  const timeText = useRef<HTMLInputElement>(null);

  useEffect(
    () => localStorage.setItem('artQuiz_isMuted', JSON.stringify(isMuted)),
    [isMuted]
  );

  useEffect(
    () => () => {
      localStorage.setItem('artQuiz_volume', volume.current.toString());
      localStorage.setItem('artQuiz_time', time.current.toString());
    },
    []
  );

  const getTimeDeps = () => (isTimed ? getTime(time.current) : '  - - ');

  useEffect(() => {
    timeText.current!.value = getTimeDeps();
    return () =>
      localStorage.setItem('artQuiz_isTimed', JSON.stringify(isTimed));
  }, [isTimed]);

  function toggleMuteHandler() {
    setMuted(!isMuted);
    playAudio(C.clickSound, volume.current);
    localStorage.getItem('artQuiz_volume') ||
      localStorage.setItem('artQuiz_volume', '0.5');
  }

  const volumeChangeHandler: Handler = ({ target }) => {
    volume.current = Number(target.value);
    playAudio(C.clickSound, volume.current);
  };

  function getTime(value: number) {
    return +value < 10 ? `0${value} с` : `${value} с`;
  }

  function toggleTimed() {
    setTimed(!isTimed);
    playAudio(C.clickSound, volume.current);
  }

  const timeChangeHandler: Handler = ({ target }) => {
    time.current = Number(target.value);
    timeText.current!.value = getTime(time.current);
    playAudio(C.clickSound, volume.current);
  };

  function handleClick() {
    playAudio(C.clickSound, volume.current);
    toggleModalOpen();
  }

  return (
    <S.Container>
      <S.Title>настройки</S.Title>

      <S.OptionWrapper>
        <S.OptionName>звуки</S.OptionName>
        <S.Switch>
          <S.CheckBox
            type='checkbox'
            id='mute'
            onChange={toggleMuteHandler}
            checked={!isMuted}
          />
          <CheckBoxLabel htmlFor='mute' />
        </S.Switch>
      </S.OptionWrapper>

      <S.OptionWrapper>
        <S.Icon icon={faVolumeXmark} />
        <S.Range
          type='range'
          defaultValue={volume.current}
          step='0.01'
          max='1'
          onChange={volumeChangeHandler}
          disabled={isMuted}
        />
        <S.Icon icon={faVolumeHigh} />
      </S.OptionWrapper>

      <S.Delimeter />

      <S.OptionWrapper>
        <S.OptionName>игра на время</S.OptionName>
        <S.Switch>
          <S.CheckBox
            type='checkbox'
            id='timer'
            onChange={toggleTimed}
            checked={isTimed}
          />
          <CheckBoxLabel htmlFor='timer' />
        </S.Switch>
      </S.OptionWrapper>

      <S.OptionWrapper>
        <S.Icon icon={faHourglass} />
        <S.Range
          type='range'
          defaultValue={time.current}
          min='5'
          step='5'
          max='30'
          onChange={timeChangeHandler}
          disabled={!isTimed}
        />
        <S.Time
          type='text'
          ref={timeText}
          defaultValue={getTimeDeps()}
          disabled
        />
      </S.OptionWrapper>
      <S.Btn onClick={handleClick}>закрыть</S.Btn>
    </S.Container>
  );
}
