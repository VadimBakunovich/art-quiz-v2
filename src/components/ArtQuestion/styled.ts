import styled from 'styled-components';

type BtnProps = { bgColor: string };

export default {
  Question: styled.p`
    padding-bottom: 2vh;
    font-size: 3.4vh;
    text-align: center;
    color: var(--color-orange);
    border-bottom: 1px solid var(--color-orange);
    margin-bottom: 3vh;
  `,

  Img: styled.div`
    margin: 0 auto;
    height: min(75vw, 55vh);
    width: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    margin-bottom: 3vh;
  `,

  Answers: styled.div`
    margin: 0 auto;
    width: 75%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    gap: 3vh;
    @media (max-width: 539px) {
      width: 80%;
      grid-template-rows: 1fr 1fr 1fr 1fr;
      grid-template-columns: 1fr;
      gap: 2.5vh;
    }
  `,

  AnswerBtn: styled.button<BtnProps>`
    padding: 1.3vh;
    font-size: max(2vh, 14px);
    background: ${({ bgColor }) => bgColor};
    border: 1px solid var(--color-orange);
    border-radius: 4vh;
    box-shadow: 8px 10px 12px #000;
    :hover {
      color: var(--color-orange);
    }
    :active {
      box-shadow: 4px 5px 6px #000;
    }
  `,
};
