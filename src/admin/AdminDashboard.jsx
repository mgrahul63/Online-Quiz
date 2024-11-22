/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastSucces from "../components/ToastMessage";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import QuizCard from "./QuizCard";
import ToastMessage from "../components/ToastMessage";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { api } = useAxios();
  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchQuiz = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes`
        );

        if (isMounted) {
          setQuizList(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to fetch quizzes");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchQuiz();

    return () => {
      isMounted = false;
    };
  }, [api]);

  const handleClick = (result) => {
    navigate("create-quiz/create-questions", { state: { result } });
  };

  //quiz set delete
  const handleDeleteQuiz = async (e, quizId) => {
    e.stopPropagation();

    try {
      const response = await api.delete(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/${quizId}`
      );
      if (response.data?.status === "success") {
        // console.log(response.data?.status);
        const updateQuizList = quizList.filter((quiz) => quiz.id !== quizId);
        setQuizList(updateQuizList); 
        ToastMessage({ type: "success", message: "Quiz Delete done!" }); 

      }
    } catch (error) {
      console.log(error);
    }
  };

  //quiz set edit
  const handleEditQuiz = (quizId) => {
    const updateQuizList = quizList.find((quiz) => quiz.id === quizId);
    navigate("create-quiz", { state: { updateQuizList } });
  };

  //quiz set publish
  const handleQuizPublished = async (quizSetId) => {
    // console.log(quizSetId);
    const publishQuiz = quizList.find((quiz) => quiz.id === quizSetId);
    const updatePublishQuize = {
      ...publishQuiz,
      status: "published",
    };

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/${quizSetId}`,
        updatePublishQuize
      );

      if (response.data?.status === "success") { 
        ToastMessage({ type: "success",  message: "Quiz Published done!"}); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  //quiz set draft
  const handleQuizDraft = async (quizSetId) => {
    // console.log(quizSetId);
    const publishQuiz = quizList.find((quiz) => quiz.id === quizSetId);
    const updatePublishQuize = {
      ...publishQuiz,
      status: "draft",
    };

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/${quizSetId}`,
        updatePublishQuize
      );
      if (response.data?.status === "success") {
        ToastMessage({ type: "success", message: "Quiz draft" }); 
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(quizList);

  return (
    <>
      {error && <p>Error Occured: {error}</p>}
      {loading && <p>Loading...</p>}

      {!loading && !error && (
        <>
          <main className="flex-grow p-10">
            <header className="mb-8">
              <h2 className="text-2xl font-semibold">Hey There 👋!</h2>
              <h1 className="text-4xl font-bold">
                Welcome Back To Your Quiz Hub!
              </h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link to="create-quiz" className="group">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 ">
                  <div className="text-buzzr-purple mb-4 group-hover:scale-105 transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
                    Create a new quiz
                  </h3>
                  <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
                    Build from the ground up
                  </p>
                </div>
              </Link>

              {quizList &&
                quizList?.map((quizSet, index) => {
                  return (
                    <QuizCard
                      key={index}
                      quizSet={quizSet}
                      handleClick={handleClick}
                      handleDeleteQuiz={handleDeleteQuiz}
                      handleQuizDraft={handleQuizDraft}
                      handleQuizPublished={handleQuizPublished}
                      handleEditQuiz={handleEditQuiz}
                    />
                  );
                })}
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default AdminDashboard;
