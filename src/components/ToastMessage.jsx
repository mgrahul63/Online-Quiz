/* eslint-disable react/prop-types */
import { toast } from "react-toastify";

const ToastMessage = ({ type, message }) => {
  if (toast[type]) {
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  } else {
    console.error(`Invalid toast type: ${type}`);
  }
  return null;
};

export default ToastMessage;
