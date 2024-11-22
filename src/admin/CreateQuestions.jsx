/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import ToastSucces from "../components/ToastMessage";
import useAxios from "../hooks/useAxios";
import ToastMessage from "../components/ToastMessage";

const CreateQuestions = ({ quizData, setQuestionList, questionList }) => {
  const { api } = useAxios();

  const [questionInfo, setQuestionInfo] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { Questions, id: quizSetId, title, description } = quizData;

  // Handle input changes for question title
  const handleQuestionChange = (e) => {
    setQuestionInfo({ ...questionInfo, question: e.target.value });
  };

  // Handle input changes for options
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...questionInfo.options];
    updatedOptions[index] = value;
    setQuestionInfo({ ...questionInfo, options: updatedOptions });
  };

  // Handle radio button change for correct answer
  const handleCorrectAnswerChange = (index) => {
    setQuestionInfo({
      ...questionInfo,
      correctAnswer: questionInfo.options[index],
    });
  };

  // Validate fields before saving
  const validateFields = () => {
    if (!questionInfo.question.trim()) {
      return "Question title is required.";
    }
    if (questionInfo.options.some((option) => !option.trim())) {
      return "All options must be filled out.";
    }
    if (!questionInfo.correctAnswer) {
      return "You must select a correct answer.";
    }
    return null;
  };

  // Save quiz question
  const handleSaveQuiz = async () => {
    const validationError = validateFields();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/admin/quizzes/${quizSetId}/questions`,
        questionInfo
      );

      if (response.data?.status === "success") {
        const newQuestion = response.data?.data;
        setQuestionInfo({
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        });

        setQuestionList((prev) => [...prev, newQuestion]);
        ToastMessage({ type: "success", message: "New Question create Success!" }); 
 
      } else {
        setError("Failed to save the question. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while saving the question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>

      <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
        Total number of questions : {questionList?.length}
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>

        {/* Question Title */}
        <div>
          <label
            htmlFor="quizTitle"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Question Title
          </label>
          <input
            type="text"
            id="quizTitle"
            name="quizTitle"
            value={questionInfo.question}
            onChange={handleQuestionChange}
            className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
            placeholder="Enter question title"
            required
          />
        </div>

        {/* Options */}
        <p className="text-sm text-gray-600 mt-4">Add Options</p>
        <div id="optionsContainer" className="space-y-2 mt-4">
          {questionInfo.options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white"
            >
              <input
                type="radio"
                id={`option${index}`}
                name="correctAnswer"
                checked={questionInfo.correctAnswer === option}
                onChange={() => handleCorrectAnswerChange(index)} // Ensure onChange handler is present
                className="text-primary focus:ring-0 w-4 h-4"
                required
              />
              <label htmlFor={`option${index}`} className="sr-only">
                Option {index + 1}
              </label>
              <input
                type="text"
                id={`optionText${index}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                placeholder={`Option ${index + 1}`}
                required
              />
            </div>
          ))}
        </div>

        {/* Feedback Messages */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {/* Save Quiz Button */}
        <button
          onClick={handleSaveQuiz}
          disabled={loading}
          className={`w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Saving..." : "Save Quiz"}
        </button>
      </div>
    </div>
  );
};

export default CreateQuestions;
