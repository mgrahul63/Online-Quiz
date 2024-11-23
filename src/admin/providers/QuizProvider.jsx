/* eslint-disable react/prop-types */
import { useEffect, useReducer } from "react";
import useAxios from "../../hooks/useAxios";
import { Actions } from "../actions";
import { QuizContext } from "../contexts";
import { initialState, QuizReducer } from "../reducers/QuizReducer";

const QuizProvider = ({ children }) => {
  const { api } = useAxios();
  const [state, dispatch] = useReducer(QuizReducer, initialState);

  // loading
  const setLoading = (loading) => {
    dispatch({ type: Actions.SET_LOADING, payload: loading });
  };

  //data fetch
  const setQuizList = (quizzes) => {
    dispatch({ type: Actions.SET_DATA, payload: quizzes });
  };

  //error
  const setError = (error) => {
    dispatch({ type: Actions.SET_ERROR, payload: error });
  };

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

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
