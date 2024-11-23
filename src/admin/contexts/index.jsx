import { createContext, useContext } from "react";

export const QuizContext = createContext();
const useQuizContext = () => useContext(QuizContext);

export { useQuizContext };
