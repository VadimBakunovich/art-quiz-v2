import { SkeletonBigImg } from 'components/SkeletonBigImg';
import { getImgUrl, paintBtn } from 'utils';
import { useImgOnload } from 'hooks';
import Painting from 'interfaces';
import S from './styled';

type Props = {
  answerVariants: Painting[];
  rightAnswer: Painting;
  userAnswer: string | undefined;
  checkAnswer(userAnswer: Painting): void;
};

export default function ArtQuestion({
  answerVariants,
  userAnswer,
  rightAnswer,
  checkAnswer,
}: Props) {
  const isLoaded = useImgOnload(getImgUrl(rightAnswer.imageNum));

  return (
    <div>
      <S.Question>Кто автор этой картины?</S.Question>
      {/* Reason for inline styling: styled components console warning:
          'Over 200 classes were generated for component styled.div' */}
      {isLoaded ? (
        <S.Img
          style={{
            backgroundImage: `url(${getImgUrl(rightAnswer.imageNum)}`,
          }}
        />
      ) : (
        <SkeletonBigImg />
      )}
      <S.Answers>
        {answerVariants.map(answerVariant => (
          <S.AnswerBtn
            bgColor={paintBtn(
              userAnswer !== answerVariant.author,
              userAnswer === rightAnswer.author
            )}
            key={answerVariant.imageNum}
            onClick={() => checkAnswer(answerVariant)}
          >
            {answerVariant.author}
          </S.AnswerBtn>
        ))}
      </S.Answers>
    </div>
  );
}
