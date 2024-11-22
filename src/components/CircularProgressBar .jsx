/* eslint-disable react/prop-types */
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; // Import the styles

const CircularProgressBar = ({percentage}) => {
 
  return (
    <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar value={percentage} text={`${percentage}%`} />
    </div>
  );
};

export default CircularProgressBar;
