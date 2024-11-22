/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import ProfilePicture from "../../assets/avater.webp";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import QuizeCard from "./QuizeCard";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { api } = useAxios();
  const { auth } = useAuth();
  const { full_name } = auth?.user;

  // Fetch quizzes from the API
  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/quizzes`
        );
        if (response.status === 200) {
          setQuizzes(response.data.data);
        }
      } catch (error) {
        setError("Error fetching quizzes. Please try again later.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <p>Loading quizzes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        <p>{error}</p>
      </div>
    );
  }
  return (
    <>
      <div className="text-center mb-12">
        <img
          src={ProfilePicture}
          alt="Profile Picture"
          className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover"
        />
        <p className="text-xl text-gray-600">Welcome</p>
        <h2
          className="text-4xl font-bold text-gray-700"
          style={{ fontFamily: "Jaro" }}
        >
          {full_name}
        </h2>
      </div>
      <main className="bg-white p-6 rounded-md h-full">
        <section>
          <h3 className="text-2xl font-bold mb-6">Participate In Quizzes</h3>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quizzes && quizzes.length > 0 ? (
              quizzes.map((quiz) => <QuizeCard key={quiz.id} quiz={quiz} />)
            ) : (
              <p>No quizzes available at the moment.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Quizzes;
