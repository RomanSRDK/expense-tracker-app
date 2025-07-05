import { GoPerson } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import style from "./UserPanel.module.css";
import { logOut } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserPanel = ({ onOpenModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle
  const logoutHandle = () => {
    dispatch(logOut());
    navigate("/");
  };

  //JSX
  return (
    <ul className={style.userPanel}>
      <li>
        <button className={style.userPanelBtn} onClick={onOpenModal}>
          <span>
            <GoPerson className={style.userPanelIcon} size={16} />
          </span>
          Profile settings
        </button>
      </li>
      <li>
        <button className={style.userPanelBtn} onClick={logoutHandle}>
          <span>
            <FiLogOut className={style.userPanelIcon} size={16} />
          </span>
          Log out
        </button>
      </li>
    </ul>
  );
};

export default UserPanel;
