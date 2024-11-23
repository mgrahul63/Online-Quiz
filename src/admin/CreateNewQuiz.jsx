/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ToastMessage from "../components/ToastMessage";
import useAxios from "../hooks/useAxios";
import { Actions } from "./actions";
import { useQuizContext } from "./contexts";

const CreateNewQuiz = () => {
  const { state, dispatch } = useQuizContext();
  const { quizzes, loading, error, editQuiz, editQuestion } = state || {};

  const { api } = useAxios();

  const location = useLocation();
  const updateQuizSet = location.state?.quizSet;

  const navigate = useNavigate();

  const [quizSet, setQuizSet] = useState({
    title: updateQuizSet?.title || "",
    description: updateQuizSet?.description || "",
    flag: updateQuizSet?.id || null,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setQuizSet((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    const { title, description, flag } = quizSet;
    e.preventDefault();

    // Update the quiz
    if (updateQuizSet?.id === flag) {
      const updateQuiz = {
        ...updateQuizSet,
        title,
        description,
      };

      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/${
            updateQuizSet?.id
          }`,
          updateQuiz
        );

        if (response.status === 200 || response.status === 201) {
          navigate("/admin/dashboard");
          dispatch({
            type: Actions.UPDATE_QUIZ,
            payload: {
              title: updateQuiz?.title,
              description: updateQuiz?.description,
              id: updateQuizSet?.id,
            },
          });
          ToastMessage({ type: "success", message: "Quiz Edit done!" });
        }
      } catch (error) {
        console.error("Error updating quiz:", error);
      }
    }

    // Add a new quiz
    else {
      const newQuizSet = {
        title,
        description,
      };
      try {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/admin/quizzes/`,
          newQuizSet
        );

        if (response.status === 201) {
          const result = response?.data?.data;
          navigate("create-questions", { state: { quizSetId: result?.id } });

          dispatch({ type: Actions.ADD_QUIZ, payload: result });
          // console.log(result);
        }
      } catch (error) {
        console.error("Error creating quiz:", error);
      }
    }
  };

  return (
    <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* <!-- Left Column --> */}
        <div>
          <a
            href="#"
            className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to home
          </a>

          <h2 className="text-3xl font-bold mb-6">
            Give your quiz title and description
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quiz title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                placeholder="Quiz"
                value={quizSet.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                placeholder="Description"
                value={quizSet.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {updateQuizSet ? "Edit Quiz" : "Next"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default CreateNewQuiz;
