/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";

const QuizCard = ({
  quizSet,
  handleClick,
  handleDeleteQuiz,
  handleEditQuiz,
  handleQuizDraft,
  handleQuizPublished,
}) => {
  const {
    Questions,
    createdAt,
    description,
    id: quizSetId,
    status,
    thumbnail,
    title,
    updatedAt,
    userId,
  } = quizSet;

  const [isPublish, setIsPublish] = useState(status);

  const handleDraft = (quizSetId) => {
    handleQuizDraft(quizSetId);
    setIsPublish("draft");
  };
  const handlePublish = (quizSetId) => {
    handleQuizPublished(quizSetId);
    setIsPublish("published");
  };
  return (
    <div
      key={quizSetId}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group"
    >
      <div
        onClick={() => handleClick(quizSet)}
        className="border-2 group-hover:scale-105 transition-all p-4 cursor-pointer"
      >
        <div className="text-buzzr-purple mb-4   ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z" />
            <path d="M12 12l4 -2.25l4 -2.25" />
            <path d="M12 12l0 9" />
            <path d="M12 12l-4 -2.25l-4 -2.25" />
            <path d="M20 12l-4 2v4.75" />
            <path d="M4 12l4 2l0 4.75" />
            <path d="M8 5.25l4 2.25l4 -2.25" />
          </svg>
        </div>
        <h3 className="font-semibold text-lg mb-2 group-hover:scale-105 transition-all">
          {title}
        </h3>
        <p className="text-gray-600 text-sm group-hover:scale-105 transition-all">
          {description}
        </p>
        <p>Total Questions: {Questions?.length}</p>
      </div>

      <div className="flex justify-between bg-primary/10 px-6 py-2 mt-4">
        <button
          onClick={(e) => handleDeleteQuiz(e, quizSetId)}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Delete
        </button>
        <button
          onClick={() => handleEditQuiz(quizSetId)}
          className="text-primary hover:text-primary/80 font-medium"
        >
          Edit Quiz
        </button>
      </div>

      <div className="flex justify-center space-x-4 bg-primary/10 px-6 py-2 mt-4">
        {isPublish === "published" ? (
          <button
            onClick={() => handleDraft(quizSetId)}
            className="text-primary hover:text-primary/80 font-medium text-center"
          >
            Move to Draft?
          </button>
        ) : (
          <button
            onClick={() => handlePublish(quizSetId)}
            className="text-red-600 hover:text-red-800 font-medium text-center"
          >
            Publish this Quiz?
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
