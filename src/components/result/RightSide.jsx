/* eslint-disable react/prop-types */

import { Fragment } from "react";

const RightSide = ({ questions, submitted_answers = [] }) => {
  return (
    <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8">
      <div className="h-[calc(100vh-50px)] overflow-y-scroll ">
        <div className="px-4">
          
          {/* <!-- Question One --> */}
          <div className="rounded-lg overflow-hidden shadow-sm mb-4">
            <div className="bg-white p-6 !pb-2">
              {questions &&
                questions.map((question, questionId) => (
                  <Fragment key={questionId}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">
                        {questionId + 1}. {question.question}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {question.options.map((option, optionId) => {
                        const correctAnswer = question.correctAnswer;
                        const selectAnser =
                          submitted_answers[questionId]?.answer;
                        const SA = selectAnser === option;

                        const correct = correctAnswer === option;

                        return (
                          <Fragment key={optionId}>
                            <div className="flex items-center space-x-3 w-full">
                              <input
                                type="radio"
                                name={option}
                                checked={selectAnser === option ? true : false}
                                readOnly
                              />

                              <p
                                className={`${
                                  correct
                                    ? "text-green-500 font-semibold"
                                    : SA
                                    ? "text-red-500 font-semibold"
                                    : "text-black"
                                }`}
                              >
                                {option}
                              </p>

                              {correct && (
                                <p className="text-green-500 font-semibold text-sm mt-1">
                                  (Correct)
                                </p>
                              )}

                              {SA && !correct && (
                                <p className="text-red-500 font-semibold text-sm mt-1">
                                  (Wrong)
                                </p>
                              )}
                            </div>

                            {/* If SA is true, add 'Your selected option' below the option */}
                            {SA && !correct && (
                              <span className="text-sm text-red-500 ml-2 block">
                                (Your selected option)
                              </span>
                            )}
                            {SA && correct && (
                              <span className="text-sm text-green-500 ml-2 block">
                                (Your selected option)
                              </span>
                            )}
                          </Fragment>
                        );
                      })}
                    </div>
                  </Fragment>
                ))}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default RightSide;
