import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import logoWhite from "../assets/logo-white.svg";
import LeftSide from "../components/result/LeftSide";
import RightSide from "../components/result/RightSide";
import useAxios from "../hooks/useAxios";
const ResultPage = () => {
  const location = useLocation();
  const { quiz, correct_answers, submitted_answers } = location?.state || {};
  const { api } = useAxios();

  // quiz.id:  '287e6049-9e59-49ea-bb41-9a0387dce648'

  const fetchQuiz = async ({ queryKey }) => {
    const response = await api.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${queryKey[1]}`
    );
    if (response.status === 200) return response.data.data;
  };

  // Use Query
  const { data: quizes } = useQuery({
    queryKey: ["quizes", quiz?.id], // queryKey
    queryFn: fetchQuiz, // queryFn
    enabled: !!quiz?.id, // options
  });

  if (!location.state) {
    return <p>No results available. Please try again!</p>;
  }

  return (
    <div className="flex min-h-screen overflow-hidden">
      <img src={logoWhite} className="max-h-11 fixed left-6 top-6 z-50" />

      {/* <!-- Left side --> */}
      <LeftSide
        quiz={quiz}
        correct_answers={correct_answers}
        submitted_answers={submitted_answers}
      />
      {/* <!-- Right side --> */}
      <RightSide
        questions={quizes?.questions}
        submitted_answers={submitted_answers}
      />
    </div>
  );
};

export default ResultPage;
