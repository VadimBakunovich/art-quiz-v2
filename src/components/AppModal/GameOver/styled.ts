import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default {
  Container: styled.div`
    width: min(100vw, 40vh);
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  Title: styled.h2`
    width: 90%;
    font-size: min(2.9vh, 10vw);
    letter-spacing: 0.1vh;
    text-align: center;
    color: var(--color-red);
    padding-bottom: 1.5vh;
    border-bottom: 1px solid var(--color-orange);
    margin-bottom: 2vh;
  `,

  Wrapper: styled.div`
    display: flex;
    align-items: center;
  `,

  Text: styled.span`
    font-size: 2.4vh;
  `,

  HeartIcon: styled(FontAwesomeIcon)`
    margin-right: 2vh;
    font-size: 4vh;
    color: var(--color-red);
  `,
};
