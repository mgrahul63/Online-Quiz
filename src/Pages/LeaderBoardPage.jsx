/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import LeaderBoardList from "../components/leadrboard/LeaderBoardList";
import MyBoard from "../components/leadrboard/MyBoard";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import calculateMark from "../utils/CalculateMark";
const LeaderBoardPage = () => {
  const { id: quizId } = useParams();
  const { api } = useAxios();
  const { auth } = useAuth();
  const { id: userId, full_name } = auth.user;
  // Fetch function
  const fetchQuiz = async () => {
    const response = await api.get(
      `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes/${quizId}/attempts`
    );
    if (response.status === 200) return response.data.data;
  };

  // Use Query
  const { data: quizes } = useQuery({
    queryKey: ["quizes", quizId], // queryKey
    queryFn: fetchQuiz, // queryFn
    enabled: !!quizId, // options
  });

  const attempts = quizes?.attempts;
  const quizTitle = quizes?.quiz?.title;

// console.log(quizes);


  //calculate the mark for individual user
  const results = attempts?.map((attempt) => {
    const correctAnswers = attempt?.correct_answers;
    const submitAnswers = attempt?.submitted_answers;
    const user_name = attempt?.user?.full_name;
    const user_id = attempt?.user?.id;

    const { mark, correctCount, incorrectCount } = calculateMark(
      correctAnswers,
      submitAnswers
    );

    return {
      user_name,
      user_id,
      mark,
    };
  });

  // Calculate the mark for the logged-in user
  const myResult = (() => {
    const newAttempts = attempts?.find((user) => user?.user?.id === userId);

    if (!newAttempts) return null; // Handle cases where no attempts are found

    const {
      correct_answers: correctAnswers,
      submitted_answers: submitAnswers,
      user,
    } = newAttempts;
    const { mark, correctCount, incorrectCount } = calculateMark(
      correctAnswers,
      submitAnswers
    );

    return {
      user_name: user?.full_name,
      user_id: user?.id,
      mark,
      correctCount,
      incorrectCount,
    };
  })();

  // Sort results by marks in descending order
  const sortedResults = results?.sort((a, b) => b.mark - a.mark);

  // Find the position of the logged-in user
  const myPosition =
    sortedResults?.findIndex(
      (result) => result?.user_id === myResult?.user_id
    ) + 1;

  return (
    <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* <!-- Left Column --> */}
          <MyBoard
            full_name={full_name}
            myPosition={myPosition}
            myResult={myResult}
          />

          {/* <!-- Right Column --> */}
          <LeaderBoardList
            sortedResults={sortedResults}
            quizTitle={quizTitle}
            my_user_id={myResult?.user_id}
          />
        </div>
      </div>
    </main>
  );
};

export default LeaderBoardPage;
