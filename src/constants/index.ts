import clickSoundSrc from 'assets/sounds/click.mp3';
import tickSoundSrc from 'assets/sounds/tick.mp3';
import rightAnswSoundSrc from 'assets/sounds/right.mp3';
import wrongAnswSoundSrc from 'assets/sounds/wrong.mp3';
import timeOverSoundSrc from 'assets/sounds/time-over.mp3';
import gameEndSoundSrc from 'assets/sounds/game-end.mp3';

const isDev = import.meta.env.MODE === 'development';

export default {
  clickSound: new Audio(clickSoundSrc),
  tickSound: new Audio(tickSoundSrc),
  rightAnswSound: new Audio(rightAnswSoundSrc),
  wrongAnswSound: new Audio(wrongAnswSoundSrc),
  timeOverSound: new Audio(timeOverSoundSrc),
  gameEndSound: new Audio(gameEndSoundSrc),
  imgBaseSrc: isDev ? '/src/assets/img/' : '/assets/img/',
};
