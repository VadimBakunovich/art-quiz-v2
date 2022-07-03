import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  isTimeRunOut: boolean;
};

export default {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Link: styled(Link)`
    font-size: 4vh;
    color: var(--color-orange);
    :hover {
      color: #fdac00;
    }
  `,

  ProgressBar: styled.progress`
    height: 1vh;
    width: 50%;
    @media (max-width: 539px) {
      width: min(16vh, 30vw);
    }
    appearance: none;
    border-radius: 10px;
    ::-webkit-progress-bar {
      border-radius: 10px;
    }
    ::-webkit-progress-value {
      background: ${({ isTimeRunOut }: Props) =>
        isTimeRunOut ? 'var(--color-red)' : 'var(--color-green)'};
      border-radius: 10px;
    }
  `,

  Wrapper: styled.div`
    display: flex;
    align-items: center;
  `,

  HeartIcon: styled(FontAwesomeIcon)`
    margin-right: 0.7vh;
    font-size: 3vh;
    color: var(--color-red);
  `,

  QuestionIcon: styled(FontAwesomeIcon)`
    margin: 0 1vh 0 2vh;
    font-size: 2.5vh;
    color: var(--color-orange);
  `,

  Text: styled.span`
    font-size: 2vh;
  `,
};
