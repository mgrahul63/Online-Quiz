import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import NotFound from "./Pages/NotFound";
import QuizPage from "./Pages/QuizPage";
import RegistrationPage from "./Pages/RegistrationPage"; // Import RegistrationPage
import ProtectedRoute from "./protect/ProtectedRoute";
import AuthProvider from "./providers/AuthProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Admin from "./admin";
import AdminDashboard from "./admin/AdminDashboard";
import CreateNewQuiz from "./admin/CreateNewQuiz";
import QuizSet from "./admin/QuizSet";
import LeaderBoardPage from "./Pages/LeaderBoardPage";
import ResultPage from "./Pages/ResultPage";
import HeaderAdd from "./protect/HeaderAdd";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <HeaderAdd />,
          children: [
            { index: true, element: <HomePage /> }, 
            { path: "quiz-page/:id", element: <QuizPage /> },
            { path: "leaderboard/:id", element: <LeaderBoardPage /> },
          ],
        },
        { path: "result-page", element: <ResultPage /> },
        {
          path: "admin/dashboard",
          element: <Admin />,
          children: [
            { index: true, element: <AdminDashboard /> },
            { path: "create-quiz", element: <CreateNewQuiz /> },
            { path: "create-quiz/create-questions", element: <QuizSet /> },
          ],
        },
      ],
    },
    { path: "/login", element: <LoginPage /> }, // Public login page
    { path: "/register", element: <RegistrationPage /> }, // Public registration page
    { path: "*", element: <NotFound /> }, // Catch-all route
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer />
    </>
  );
};

export default App;
