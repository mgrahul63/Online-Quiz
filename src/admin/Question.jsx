/* eslint-disable react/prop-types */
import ToastMessage from "../components/ToastMessage";
import useAxios from "../hooks/useAxios";
import { Actions } from "./actions";
import { useQuizContext } from "./contexts";

const Question = ({ question, questionIndex }) => {
  const { api } = useAxios();
  const { dispatch } = useQuizContext();

  const correctAnswer = question?.correctAnswer;

  //delete question
  const handleDeleteQuestion = async (id, questionId) => {
    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/questions/${questionId}`
      );
      if (response.data?.status === "success") {
        // console.log(response.data?.status);

        dispatch({
          type: Actions.DELETE_QUESTION,
          payload: { id, questionId },
        });
        ToastMessage({ type: "error", message: "Question deleted!" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditQuestion = async (id, questionId) => {
    dispatch({ type: Actions.SET_EDIT_QUESTION, payload: { id, questionId } });
  };

  return (
    <>
      <div key={questionIndex} className="mb-6">
        {/* Question Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {questionIndex + 1}. {question?.question}
          </h3>
        </div>

        {/* Question Options */}
        <fieldset className="space-y-2">
          {question?.options?.map((option, optionIndex) => (
            <label key={optionIndex} className="flex items-center space-x-3">
              <input
                type="radio"
                name={`answer-${questionIndex}`}
                className="form-radio text-buzzr-purple"
                checked={option === correctAnswer}
                readOnly
              />
              <span>{option}</span>
            </label>
          ))}
        </fieldset>

        {/* Question Controls */}
        <div className="flex space-x-4 bg-primary/10 px-6 py-2 mt-4">
          <button
            onClick={() => handleDeleteQuestion(question?.quizId, question?.id)}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Delete
          </button>
          <button
            onClick={() => handleEditQuestion(question?.quizId, question?.id)}
            className="text-primary hover:text-primary/80 font-medium"
          >
            Edit Question
          </button>
        </div>
      </div>
    </>
  );
};

export default Question;
