/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Option from "./Options";

const QuestionsCard = ({ quizes, setParticipation, setRemaining }) => {
  const navigate = useNavigate();
  const { api } = useAxios();
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [quizeQuestions, setQuizeQuestions] = useState([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [errorMessage, setErrorMessage] = useState(""); // State for error message, when user didn't select

  const { id: quizId, questions } = quizes || {};

  //if questions has, then every question options random first
  useEffect(() => {
    if (questions) {
      const shuffled = questions.map((q) => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5),
      }));
      setQuizeQuestions(shuffled);
    }
  }, [questions]);

  // next questions fetch
  const handleNextClick = () => {
    const currentQuestionId = quizeQuestions[currentQuestionIndex]?.id;

    if (!selectedAnswers[currentQuestionId]) {
      setErrorMessage("Please select an answer before proceeding.");
    } else {
      setErrorMessage("");
      if (currentQuestionIndex < quizeQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setParticipation(currentQuestionIndex + 1);
        setRemaining((prev) => prev - 1);
      }
    }
  };

  //select one option
  const handleOptionClick = (id, option) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: option,
    }));
  };

   
  const handleSubmit = async () => {
    const formattedSubmission = {
      answers: { ...selectedAnswers },
    };

    try {
      const baseURL = import.meta.env.VITE_SERVER_BASE_URL;
      const endpoint = `/quizzes/${quizId}/attempt`;

      const response = await api.post(
        `${baseURL}${endpoint}`,
        formattedSubmission
      );

      const result = response.data;
      if (response.status === 200) {
        
        // console.log(result);
        // attempt_id: "3b611334-4971-49a9-9670-98b17ef859c0"
        // percentage: "50.00"
        // submitted_at: "2024-11-17T13:49:51.244Z"

        const quiz = result.data.quiz;
        const correct_answers = result.data.correct_answers;
        const submitted_answers = result.data.submitted_answers;

         
        navigate("/result-page", {
          state: { quiz, correct_answers, submitted_answers },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
      <div className="p-6">
        {quizeQuestions.length > 0 && (
          <Fragment>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                {currentQuestionIndex + 1}.{" "}
                {quizeQuestions[currentQuestionIndex]?.question}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quizeQuestions[currentQuestionIndex]?.options.map(
                (option, index) => (
                  <Option
                    key={index}
                    option={option}
                    isChecked={
                      selectedAnswers[
                        quizeQuestions[currentQuestionIndex]?.id
                      ] === option
                    }
                    onClick={() =>
                      handleOptionClick(
                        quizeQuestions[currentQuestionIndex]?.id,
                        option
                      )
                    }
                  />
                )
              )}
            </div>
            {errorMessage && (
              <div className="text-red-500 mt-4">{errorMessage}</div>
            )}
          </Fragment>
        )}

        {currentQuestionIndex < quizeQuestions.length - 1 ? (
          <button
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md mt-6 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-semibold"
            type="button"
            onClick={handleNextClick}
          >
            Next
          </button>
        ) : (
          <button
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md mt-6 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-semibold"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionsCard;
