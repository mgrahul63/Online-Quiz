// Actions.js
export const Actions = {
  SET_DATA: "SET_DATA", // Set initial data (or reset data)

  ADD_QUIZ: "ADD_QUIZ", // Add a new quiz/question
  ADD_QUESTION: "ADD_QUESTION", // Add a new question

  DELETE_QUIZ: "DELETE_QUIZ", // Delete a quiz/question
  DELETE_QUESTION: "DELETE_QUESTION", // Delete a quiz/question

  SET_EDIT_QUESTION: "SET_EDIT_QUESTION", // Set item to be edited

  UPDATE_QUIZ: "UPDATE_QUIZ", // Update an existing quiz/question
  UPDATE_QUESTION: "UPDATE_QUESTION", // Update an existing quiz/question

  SET_LOADING: "SET_LOADING", // Set loading state (useful for async actions)
  SET_ERROR: "SET_ERROR", // Set error state (useful for async actions)
};
