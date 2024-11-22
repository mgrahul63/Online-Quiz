/* eslint-disable react/prop-types */
const Option = ({ option, onClick, isChecked }) => {
  return (
    <label className="flex items-center space-x-3 py-3 px-4 bg-indigo-100 rounded-lg text-lg">
      <input
        type="radio"
        name="answer"
        className="form-radio text-indigo-600"
        onChange={onClick} // Handle change event
        checked={isChecked} // Dynamically check if this option is selected
      />
      <span>{option}</span>
    </label>
  );
};

export default Option;
