import { GoPerson } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import style from "./UserPanel.module.css";

const UserPanel = ({ onOpenModal, onOpenLogoutModal }) => {
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
      <button className={style.userPanelBtn} onClick={onOpenLogoutModal}>
        <span>
          <FiLogOut className={style.userPanelIcon} size={16} />
        </span>
        Log out
      </button>
    </ul>
  );
};

export default UserPanel;
