/* eslint-disable no-unused-vars */
import useAxios from "../hooks/useAxios";
import { useQuizContext } from "./contexts";
import Question from "./Question";

/* eslint-disable react/prop-types */
const QuestionsList = ({ id }) => {
  const { api } = useAxios();

  const { state, dispatch } = useQuizContext();

  const questionList = state?.quizzes?.find(
    (quiz) => quiz.id === id
  )?.Questions;

  // console.log(questionList);

  return (
    <div className="px-4">
      <div className="rounded-lg overflow-hidden shadow-sm mb-4">
        <div className="bg-white p-6 !pb-2">
          {questionList &&
            questionList?.map((question, questionIndex) => {
              return (
                <Question
                  key={question.id}
                  question={question}
                  questionIndex={questionIndex}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default QuestionsList;
