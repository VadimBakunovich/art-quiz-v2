import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import imgUrl from 'assets/img/title.webp';

const Btn = styled.button`
  width: min(35vh, 70vw);
  height: min(7.2vh, 14vw);
  font-size: min(2.5vh, 5vw);
  line-height: min(7vh, 14vw);
  font-weight: 500;
  text-transform: uppercase;
  border: 2px solid antiquewhite;
  border-radius: 9vh;
  margin-bottom: 4vh;
  box-shadow: 8px 10px 12px #000;
  backface-visibility: hidden;
  :hover {
    color: var(--color-orange);
    border: 2px solid var(--color-orange);
  }
  :active {
    width: min(34.8vh, 70vw);
    font-size: 2.48vh;
    box-shadow: 4px 5px 6px #000;
  }
`;

export default {
  Container: styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: ${`url(${imgUrl})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  `,

  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  Title: styled.h1`
    position: relative;
    font-size: min(8vh, 20vw);
    font-weight: 700;
    color: #698d9c;
    margin-bottom: 15vh;
    ::before,
    ::after {
      position: absolute;
      content: '';
      width: 1.8em;
      height: 1.8em;
      top: -0.1em;
      left: -0.25em;
      border: 2px solid antiquewhite;
      border-radius: 50%;
    }
    ::after {
      left: 0.65em;
    }
  `,

  TitleBegin: styled.span`
    margin-right: 0.1em;
    color: chocolate;
  `,

  Version: styled.span`
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 0.2em;
    color: chocolate;
  `,

  Link: Btn.withComponent(Link),

  Btn: styled(Btn)`
    width: min(27vh, 70vw);
    :active {
      width: min(26.8vh, 70vw);
    }
  `,

  Icon: styled(FontAwesomeIcon)`
    margin-right: 2vh;
  `,
};
