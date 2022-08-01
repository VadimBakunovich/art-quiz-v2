import {
  faVolumeXmark,
  faVolumeHigh,
  faHourglass,
} from '@fortawesome/free-solid-svg-icons';

import { useSettings } from 'hooks/useSettings';
import S, { CheckBoxLabel } from './styled';

export default function Settings() {
  const settings = useSettings();

  return (
    <S.Container>
      <S.Title>настройки</S.Title>

      <S.OptionWrapper>
        <S.OptionName>звуки</S.OptionName>
        <S.Switch>
          <S.CheckBox
            type='checkbox'
            id='mute'
            onChange={settings.toggleMuteHandler}
            checked={!settings.isMuted}
          />
          <CheckBoxLabel htmlFor='mute' />
        </S.Switch>
      </S.OptionWrapper>

      <S.OptionWrapper>
        <S.Icon icon={faVolumeXmark} />
        <S.Range
          type='range'
          defaultValue={settings.volume.current}
          step='0.01'
          max='1'
          onChange={settings.volumeChangeHandler}
          disabled={settings.isMuted}
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
            onChange={settings.toggleTimed}
            checked={settings.isTimed}
          />
          <CheckBoxLabel htmlFor='timer' />
        </S.Switch>
      </S.OptionWrapper>

      <S.OptionWrapper>
        <S.Icon icon={faHourglass} />
        <S.Range
          type='range'
          defaultValue={settings.time.current}
          min='5'
          step='5'
          max='30'
          onChange={settings.timeChangeHandler}
          disabled={!settings.isTimed}
        />
        <S.Time
          type='text'
          ref={settings.timeText}
          defaultValue={settings.getTimeApperance()}
          disabled
        />
      </S.OptionWrapper>
      <S.Btn onClick={settings.handleClick}>закрыть</S.Btn>
    </S.Container>
  );
}
