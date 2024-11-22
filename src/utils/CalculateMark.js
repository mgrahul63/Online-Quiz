const calculateMark = (correct_answers, submitted_answers) => {
  let correctCount = 0;
  let mark = 0;
  let incorrectCount = 0;

  // Compare answers only if both correct_answers and submitted_answers are valid arrays
  if (Array.isArray(correct_answers) && Array.isArray(submitted_answers)) {
    correct_answers.forEach((ca) => {
      const submitted = submitted_answers.find(
        (sa) => sa.question_id === ca.question_id
      );

      if (submitted && submitted.answer === ca.answer) {
        correctCount += 1;
        mark += ca.marks;
      } else {
        incorrectCount += 1;
      }
    });
  }

  // Return the calculated values as an object
  return { mark, correctCount, incorrectCount };
};

export default calculateMark;
