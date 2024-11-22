/* eslint-disable react/prop-types */
import avatar from "../../assets/avater.webp";
const LeaderBoardList = ({ sortedResults, quizTitle, my_user_id }) => {
  const position = {
    0: "1st",
    1: "2nd",
    2: "3rd",
    3: "4th",
    4: "5th",
  };

  // calculate the top five user
  const topResult = sortedResults?.slice(0, 5);
  
  return (
    <div>
      <h1 className="text-2xl font-bold">Leaderboard</h1>
      <p className="mb-6">{quizTitle}</p>
      <ul className="space-y-4">
        {topResult &&
          topResult.map((result, index) => {
            const id = result.user_id === my_user_id;
            return (
              <li
                key={index}
                className={`flex items-center justify-between border-collapse border-2 rounded-sm ${
                  id ? "border-green-500" : ""
                } hover:bg-gray-500 hover:shadow-md transition duration-100`}
              >
                <div className="flex items-center">
                  <img
                    src={avatar}
                    alt="SPD Smith"
                    className="object-cover w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{result?.user_name}</h3>
                    <p className="text-sm text-gray-500">{position[index]}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">{result?.mark}</span>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default LeaderBoardList;
