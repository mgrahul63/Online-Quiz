/* eslint-disable react/prop-types */
import avatar from "../../assets/avater.webp";
const QuestionText = ({ quizes, participation, remaining }) => {
  const { title, description, stats: { total_questions } = {} } = quizes || {};

  return (
    <div className="lg:col-span-1 bg-white rounded-lg p-6 flex flex-col shadow-md">
      <div>
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{description}</p>

        <div className="space-y-2">
          <div className="w-fit bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            Total Questions: {total_questions}
          </div>
          <div className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            Participation: {participation}
          </div>
          <div className="w-fit bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
            Remaining: {remaining}
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center">
        <img
          src={avatar}
          alt="Saad Hasan"
          className="w-10 h-10 rounded-full mr-3 object-cover"
        />
        <span className="text-black font-semibold">Saad Hasan</span>
      </div>
    </div>
  );
};

export default QuestionText;
