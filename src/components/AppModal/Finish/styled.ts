import styled from 'styled-components';
import imgUrl from 'assets/medal.png';

export default {
  Container: styled.div`
    width: min(100vw, 40vh);
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  Title: styled.h2`
    width: 90%;
    font-size: min(2.5vh, 10vw);
    letter-spacing: 0.1vh;
    text-align: center;
    color: var(--color-orange);
    padding-bottom: 1.5vh;
    border-bottom: 1px solid var(--color-orange);
    margin-bottom: 4vh;
  `,

  Medal: styled.div`
    margin-bottom: 2vh;
    width: min(85vw, 400px);
    height: min(85vw, 400px);
    background-image: ${`url(${imgUrl})`};
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    filter: drop-shadow(0 0 1.3vh var(--color-orange));
  `,
};
