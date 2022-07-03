import { SkeletonImg } from 'components/SkeletonImg';
import { getImgUrl, styleBtn, useImgsOnload } from 'utils';
import Painting from 'interfaces';
import S from './styled';

type Props = {
  answerVariants: Painting[];
  rightAnswer: Painting;
  userAnswer: string | undefined;
  checkAnswer(userAnswer: Painting): void;
};

export function PaintQuestion({
  answerVariants,
  userAnswer,
  rightAnswer,
  checkAnswer,
}: Props) {
  const isImgsLoaded = useImgsOnload(answerVariants);

  return (
    <div>
      <S.Question>
        Какую из этих картин написал(а) {rightAnswer.author}?
      </S.Question>
      <S.Answers>
        {isImgsLoaded
          ? answerVariants.map(answerVariant => (
              <S.AnswerBtn
                src={getImgUrl(answerVariant.imageNum, '')}
                value={styleBtn(
                  userAnswer !== answerVariant.author,
                  userAnswer === rightAnswer.author
                )}
                key={answerVariant.imageNum}
                onClick={() => checkAnswer(answerVariant)}
              />
            ))
          : answerVariants.map(i => <SkeletonImg key={i.imageNum} />)}
      </S.Answers>
    </div>
  );
}
