import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import s from "./LogoutModal.module.css";

const LogoutModal = ({ onCancel }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle
  const logoutHandle = () => {
    dispatch(logOut());
    toast(
      <div className={s.toast_wrap}>
        <strong>Registration and Login success</strong>
      </div>,
      {
        duration: 5000,
        position: "top-center",
      }
    );

    navigate("/");
  };

  //JSX
  return (
    <div className={s.overlay}>
      <div className={s.wrapper}>
        <p>Are you sure you want to log out?!</p>
        <div className={s.button_wrap}>
          <button className={s.logout_btn} type="button" onClick={logoutHandle}>
            Log Out
          </button>

          <button
            className={s.cancel_btn}
            type="button"
            onClick={() => onCancel(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
