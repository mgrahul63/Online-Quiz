/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import calculateMark from "../../utils/CalculateMark";
import CircularProgressBar from "../CircularProgressBar ";

const LeftSide = ({
  quiz = {},
  correct_answers = [],
  submitted_answers = [],
}) => {
  const {
    id,
    description = "No description available",
    title = "Untitled Quiz",
    total_marks,
  } = quiz;

  const { mark, correctCount, incorrectCount } = calculateMark(
    correct_answers,
    submitted_answers
  );

  const percentage = ((mark / total_marks) * 100).toFixed(1);
  return (
    <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
      <div>
        <div className="text-white">
          <div>
            <h2 className="text-4xl font-bold mb-2">{title}</h2>
            <p>{description}</p>
          </div>

          <div className="my-6 flex items-center">
            <div className="w-1/2">
              <div className="flex gap-6 my-6">
                <div>
                  <p className="font-semibold text-2xl my-0">
                    {correct_answers.length}
                  </p>
                  <p className="text-gray-300">Questions</p>
                </div>

                <div>
                  <p className="font-semibold text-2xl my-0">{correctCount}</p>
                  <p className="text-gray-300">Correct</p>
                </div>

                <div>
                  <p className="font-semibold text-2xl my-0">
                    {incorrectCount}
                  </p>
                  <p className="text-gray-300">Wrong</p>
                </div>
              </div>

              <Link
                to={`/leaderboard/${id}`} // Correct dynamic URL syntax
                className="bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
              >
                View Leaderboard
              </Link>
            </div>

            <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
              <div className="flex-1">
                <p className="text-2xl font-bold">
                  {mark}/{total_marks}
                </p>
                <p>Your Mark</p>
              </div>
              <div>
                {percentage && <CircularProgressBar percentage={percentage} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
