import { GoPerson } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import style from "./UserPanel.module.css";
import { useState } from "react";
import LogoutModal from "../LogoutModal/LogoutModal";

const UserPanel = ({ onOpenModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //handlers
  const handleOpenLogoutModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsModalOpen(false);
  };

  //JSX
  return (
    <>
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
          <button
            className={style.userPanelBtn}
            onClick={handleOpenLogoutModal}
          >
            <span>
              <FiLogOut className={style.userPanelIcon} size={16} />
            </span>
            Log out
          </button>
        </li>
      </ul>

      {isModalOpen && <LogoutModal onCancel={handleCloseLogoutModal} />}
    </>
  );
};

export default UserPanel;
