import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StyledSkeleton = styled(Skeleton)`
  width: min(34vh, 40vw);
  border-radius: 1vh;
`;

export const SkeletonImg = () => (
  <StyledSkeleton
    baseColor='#303030'
    highlightColor='var(--color-orange)'
    height='min(34vh, 40vw)'
  />
);
