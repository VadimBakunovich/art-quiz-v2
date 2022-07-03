import styled from 'styled-components';

type Props = { value: string };

export default {
  Question: styled.p`
    padding-bottom: 2vh;
    font-size: 3.2vh;
    text-align: center;
    color: var(--color-orange);
    border-bottom: 1px solid var(--color-orange);
    margin-bottom: 3vh;
  `,

  Answers: styled.div`
    margin: 0 auto;
    width: min(90vw, 75vh);
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    gap: 3vh;
    @media (max-width: 539px) {
      width: unset;
    }
  `,

  AnswerBtn: styled.img`
    height: min(34vh, 40vw);
    margin: 0 auto;
    filter: ${({ value }: Props) => value};
    border-radius: 1vh;
    box-shadow: 8px 10px 12px #000;
    transition: 0.3s;
    cursor: pointer;
    :hover {
      filter: brightness(1.3);
    }
  `,
};
