/* eslint-disable react/prop-types */

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/backgrounds/5.jpg";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const QuizeCard = ({ quiz }) => {
  const { api } = useAxios();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const { id: userId } = auth.user;

  const {
    id: quizeId,
    title,
    description,
    thumbnail,

    is_attempted,
  } = quiz;

  // Fetch function
  const fetchQuiz = async () => {
    const response = await api.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizeId}/attempts`
    );
    if (response.status === 200) return response.data.data;
  };

  // Use Query
  const {
    data: quizes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["quizes", quizeId], // queryKey
    queryFn: fetchQuiz, // queryFn
    enabled: !!quizeId, // options
  });

  const attempts = quizes?.attempts;
  const newAttempts = attempts?.find((user) => user.user.id === userId);

  const handleClick = () => {
    if (is_attempted) {
      if (!isLoading && !isError && quizes?.attempts?.length > 0) {
        const quiz = quizes.quiz;
        const correct_answers = newAttempts.correct_answers ?? [];
        const submitted_answers = newAttempts.submitted_answers ?? [];

        navigate("/result-page", {
          state: { quiz, correct_answers, submitted_answers },
        });
      } else {
        // Handle the case when attempts are empty or loading
        console.log("No previous attempts found or still loading.");
        // Optionally show an error message or redirect elsewhere
      }
    } else {
      navigate(`/quiz-page/${quizeId}`);
    }
  };

  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative"
      onClick={handleClick}
    >
      {/* Background Image */}
      <img
        src={logo || thumbnail}
        alt={title}
        className="w-full h-full object-cover rounded transition-transform duration-200 ease-in-out group-hover:scale-105"
      />

      {is_attempted && (
        <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-green-500 group-hover:grid place-items-center">
          <div>
            <h1 className="text-3xl font-bold">Already Participated</h1>
          </div>
        </div>
      )}
      {/* Overlay */}
      <div className="group-hover:scale-105 absolute transition-all text-white text-center top-1/2 -translate-y-1/2 px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h1>
        <p className="text-sm sm:text-base">{description}</p>
      </div>
    </div>
  );
};

export default QuizeCard;
