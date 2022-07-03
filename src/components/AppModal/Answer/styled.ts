import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  isRightAnswer: boolean;
};

export default {
  Container: styled.div`
    width: min(100vw, 40vh);
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  Title: styled.h2<Props>`
    width: 90%;
    font-size: min(2.9vh, 10vw);
    letter-spacing: 0.1vh;
    text-align: center;
    color: ${({ isRightAnswer }) =>
      isRightAnswer ? 'var(--color-green)' : 'var(--color-red)'};
    padding-bottom: 1.5vh;
    border-bottom: 1px solid var(--color-orange);
    margin-bottom: 2vh;
  `,

  Wrapper: styled.div`
    margin-bottom: 2vh;
  `,

  InfoIcon: styled(FontAwesomeIcon)`
    margin-right: 1vh;
    font-size: 2vh;
    color: var(--color-orange);
  `,

  HeartIcon: styled(FontAwesomeIcon)`
    margin-right: 1vh;
    font-size: 2vh;
    color: var(--color-red);
  `,

  Text: styled.span`
    font-size: 2vh;
  `,
};
