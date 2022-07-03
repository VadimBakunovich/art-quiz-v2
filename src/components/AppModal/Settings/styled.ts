import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CheckBoxLabel = styled.label`
  position: absolute;
  width: 52px;
  height: 30px;
  border-radius: 15px;
  background: var(--color-grey);
  cursor: pointer;
  ::after {
    content: '';
    display: block;
    margin: 3px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #fff;
    transition: 0.2s;
  }
`;

const height = '30px';
const lowerBackground =
  'linear-gradient(to bottom, var(--color-orange), var(--color-orange)) 100% 50% / 100% 10px no-repeat transparent';
const disabledBackground =
  'linear-gradient(to bottom, var(--color-grey), var(--color-grey)) 100% 50% / 100% 10px no-repeat transparent';

const makeLongShadow = () => {
  const size = '-10px';
  const color = 'var(--color-grey)';
  let i = 18;
  let shadow = `${i}px 0 0 ${size} ${color}`;

  for (; i < 306; i++) {
    shadow = `${shadow}, ${i}px 0 0 ${size} ${color}`;
  }
  return shadow;
};

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
    color: var(--color-orange);
    text-transform: capitalize;
    padding-bottom: 2vh;
    border-bottom: 1px solid var(--color-orange);
    margin-bottom: 4vh;
  `,

  OptionWrapper: styled.div`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5vh;
  `,

  OptionName: styled.span`
    font-size: 2.3vh;
    text-transform: uppercase;
    transition: 0.3s;
  `,

  Switch: styled.div`
    position: relative;
    display: flex;
  `,

  CheckBox: styled.input`
    opacity: 0;
    width: 52px;
    height: 30px;
    :checked + ${CheckBoxLabel} {
      background: var(--color-orange);
      ::after {
        margin-left: 25px;
      }
    }
  `,

  Icon: styled(FontAwesomeIcon)`
    font-size: 3.5vh;
    color: var(--color-grey);
  `,

  Range: styled.input`
    width: 100%;
    max-width: min(65%, 25vh);
    height: ${height};
    display: block;
    overflow: hidden;
    appearance: none;
    background-color: inherit;
    cursor: pointer;
    :focus {
      outline: none;
    }

    ::-webkit-slider-runnable-track {
      width: 100%;
      height: ${height};
      background: ${lowerBackground};
    }

    :disabled::-webkit-slider-runnable-track {
      width: 100%;
      height: ${height};
      background: ${disabledBackground};
    }

    ::-webkit-slider-thumb {
      position: relative;
      top: 50%;
      appearance: none;
      height: ${height};
      width: ${height};
      background-color: #ddd;
      border-radius: 50%;
      transform: translateY(-50%);
      box-shadow: ${makeLongShadow()};
      transition: background-color 150ms;
    }

    :disabled::-webkit-slider-thumb {
      display: none;
    }
  `,

  Time: styled.input`
    width: 15%;
    font-size: 2.5vh;
    color: var(--color-orange);
    background: inherit;
  `,

  Delimeter: styled.div`
    width: 85%;
    border-bottom: 1px solid #777;
    margin-bottom: 5vh;
  `,

  Btn: styled.button`
    margin-bottom: 2vh;
    padding: 1.5vh 3.2vh;
    color: #333;
    font-size: 2vh;
    font-weight: 700;
    text-transform: uppercase;
    background-color: var(--color-orange);
    border: none;
    border-radius: 4vh;
    box-shadow: 0.5vh 0.5vh 0.8vh black;
    :hover {
      background-color: #fdac00;
      color: #000;
    }
    :active {
      box-shadow: unset;
    }
  `,
};
