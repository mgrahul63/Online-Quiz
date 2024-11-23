import { Actions } from "../actions";
export const initialState = {
  quizzes: [], // List of quizzes
  editQuiz: null,
  editQuestion: null,
  loading: false,
  error: null,
};

// Reducer Function
const QuizReducer = (state, action) => {
  switch (action.type) {
    // loading
    case Actions.SET_LOADING:
      return { ...state, loading: action.payload, error: null };

    // error
    case Actions.SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    // fetch data (api quizzes)
    case Actions.SET_DATA: {
      return {
        ...state,
        quizzes: [...action.payload],
        loading: false,
        error: null,
        editQuestion: null,
      };
    }

    case Actions.ADD_QUIZ: {
      const result = action.payload;
      console.log(result);
      return {
        ...state,
        quizzes: [...state.quizzes, action.payload],
        loading: false,
        error: null,
        editQuestion: null,
      };
    }
    // add new quiz item to the list
    case Actions.ADD_QUESTION: {
      const quizId = action.payload?.quizId;
      const newQuestion = action.payload?.newQuestion;

      console.log(quizId);
      console.log(newQuestion);
      const updatedQuizzes = state.quizzes?.map((quiz) => {
        if (quiz.id === quizId) {
          return {
            ...quiz,
            Questions: [...(quiz?.Questions || []), newQuestion],
          };
        }
        return quiz;
      });
      return {
        ...state,
        editQuestion: null,
        quizzes: updatedQuizzes,
      };
    }
    // delete quiz item by index
    case Actions.DELETE_QUIZ: {
      return {
        ...state,
        editQuestion: null,
        quizzes: state.quizzes.filter((quiz) => quiz.id !== action.payload),
      };
    }

    case Actions.DELETE_QUESTION: {
      const quizID = action.payload?.id; // Quiz ID
      const questionId = action.payload?.questionId; // Question ID

      // Map through quizzes to update the specific quiz
      const updatedQuizzes = state.quizzes?.map((quiz) => {
        if (quiz.id === quizID) {
          return {
            ...quiz,
            Questions: quiz.Questions?.filter(
              (question) => question.id !== questionId
            ),
          };
        }
        return quiz;
      });

      return {
        ...state,
        editQuestion: null,
        quizzes: updatedQuizzes,
      };
    }

    // update quiz item at specific index
    case Actions.UPDATE_QUIZ: {
      const id = action.payload?.id;
      const updatedQuizzes = state.quizzes.map((quiz) => {
        if (quiz.id === id) {
          return {
            ...quiz,
            title: action.payload?.title,
            description: action.payload?.description,
          };
        }
        return quiz;
      });

      return {
        ...state,
        editQuestion: null,
        quizzes: updatedQuizzes,
      };
    }

    // set which quiz to edit (payload is index or quiz object)
    case Actions.SET_EDIT_QUESTION: {
      const quizId = action.payload?.id; // Quiz ID
      const questionId = action.payload?.questionId; // Question ID

      // Find the quiz that matches the quizId
      const quiz = state.quizzes?.find((quiz) => quiz.id === quizId);

      // Find the question for edit
      const edit = quiz?.Questions?.find(
        (question) => question.id === questionId
      );

      return {
        ...state,
        editQuestion: edit || null,
      };
    }

    // update quiz item at specific index
    case Actions.UPDATE_QUESTION: {
      const quizId = action.payload?.quizId; // The quiz ID
      const newQuestion = action.payload?.newQuestion; // The updated question object

      const updatedQuizzes = state.quizzes.map((quiz) => {
        if (quiz.id === quizId) {
          const updatedQuestions = quiz.Questions.map((question) =>
            question.id === newQuestion.id ? newQuestion : question
          );

          return {
            ...quiz,
            Questions: updatedQuestions,
          };
        }
        return quiz;
      });

      return {
        ...state,
        editQuestion: null,
        quizzes: updatedQuizzes,
      };
    }

    default:
      return state;
  }
};

export { QuizReducer };
