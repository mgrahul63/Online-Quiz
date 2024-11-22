/* eslint-disable react/prop-types */
import avatar from "../../assets/avater.webp";
const MyBoard = ({ full_name, myPosition, myResult }) => {
  const position = {
    1: "1st",
    2: "2nd",
    3: "3rd",
    4: "4th",
    5: "5th",
    // ...same
  };
  // console.log(myPosition)
  return (
    <div className="bg-primary rounded-lg p-6 text-white">
      <div className="flex flex-col items-center mb-6">
        <img
          src={avatar}
          alt="Profile Pic"
          className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold">{full_name}</h2>
        <p className="text-xl">
          {myPosition > 3 ? `${myPosition}th` : position[myPosition]} Position
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm opacity-75">Mark</p>
          <p className="text-2xl font-bold">{myResult?.mark}</p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-75">Correct</p>
          <p className="text-2xl font-bold">{myResult?.correctCount}</p>
        </div>
        <div className="text-center">
          <p className="text-sm opacity-75">Wrong</p>
          <p className="text-2xl font-bold text-red-500">
            {myResult?.incorrectCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyBoard;
