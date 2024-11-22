/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuestionsCard from "../components/questions/QuestionsCard";
import QuestionText from "../components/questions/QuestionText";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const QuizPage = () => {
  const { id } = useParams();
  const { auth } = useAuth();

  const { api } = useAxios();
  const [participation, setParticipation] = useState(0);
  const [remaining, setRemaining] = useState(0);
  // Fetch function
  const fetchQuiz = async () => {
    const response = await api.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${id}`
    );
    if (response.status === 200) return response.data.data;
  };

  // id: 287e6049-9e59-49ea-bb41-9a0387dce648

  // Use Query
  const {
    data: quizes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["quizes", id], // queryKey
    queryFn: fetchQuiz, // queryFn
    enabled: !!id, // options
  });

  const {
    stats: { total_questions: totalQuestions } = {},
    user_attempt: { attempted: isAttempted, attempt_id } = {},
  } = quizes || {};

  useEffect(() => {
    setRemaining(totalQuestions);
  }, [totalQuestions]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message || "An error occurred."}</p>;

  // Destructure data if available
  return (
    <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full p-4">
        {/* Left Column */}
        {quizes && (
          <QuestionText
            quizes={quizes}
            participation={participation}
            remaining={remaining}
          />
        )}

        {/* Right Column */}
        <QuestionsCard
          quizes={quizes}
          setParticipation={setParticipation}
          setRemaining={setRemaining}
        />
      </div>
    </main>
  );
};

export default QuizPage;
