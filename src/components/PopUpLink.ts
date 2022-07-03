import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PopUpLink = styled(Link)`
  margin: 3vh 0 2vh 0;
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
`;
