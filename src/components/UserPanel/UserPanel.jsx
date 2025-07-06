import { GoPerson } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { logOut } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";
import style from "./UserPanel.module.css";

const UserPanel = ({ onOpenModal }) => {
  const dispatch = useDispatch();

  //handle
  const logoutHandle = () => {
    dispatch(logOut());
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
