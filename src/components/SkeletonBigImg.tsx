import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const StyledSkeleton = styled(Skeleton)`
  display: block;
  width: 85%;
  margin: 0 auto 3vh auto;
`;

export const SkeletonBigImg = () => (
  <StyledSkeleton
    baseColor='#303030'
    highlightColor='var(--color-orange)'
    height='min(75vw, 55vh)'
  />
);
