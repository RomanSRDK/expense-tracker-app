import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrency,
  selectUserAvatar,
  selectUserName,
} from "../../redux/user/selectors";
import {
  fetchUserInfo,
  removeUsersAvatar,
  setCurrencyAndName,
  updatesAvatar,
} from "../../redux/user/operations";
import { useEffect, useRef, useState } from "react";
import defaultAvatar from "../../pictures/avatar.png";
import { IoCloseOutline } from "react-icons/io5";
import css from "./UserSetsModal.module.css";

function UserSetsModal({ toggleUserModal }) {
  const dispatch = useDispatch();

  const avatarUrl = useSelector(selectUserAvatar);
  const userName = useSelector(selectUserName);
  const currency = useSelector(selectCurrency);

  const inputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [editetCurrency, setEditedCurrency] = useState(currency);
  const [editedUserName, setEditedUserName] = useState(userName);

  // useEffect для имени
  useEffect(() => {
    setEditedUserName(userName);
  }, [userName]);

  // useEffect для валюты
  useEffect(() => {
    setEditedCurrency(currency);
  }, [currency]);

  // Обработчик изменения имени
  const handleNameChange = (e) => {
    setEditedUserName(e.target.value);
  };

  // Обработчик изменения валюты
  const handleCurrencyChange = (e) => {
    setEditedCurrency(e.target.value);
  };

  const handleSave = () => {
    dispatch(
      setCurrencyAndName({
        name: editedUserName.trim(),
        currency: editetCurrency,
      })
    );
    toggleUserModal(false);
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        toggleUserModal(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleUserModal]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleUserModal(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const formData = new FormData();
    formData.append("avatar", file);

    dispatch(updatesAvatar(formData));
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleRemovePhoto = () => {
    dispatch(removeUsersAvatar());
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={() => toggleUserModal(false)}
        >
          <IoCloseOutline size={24} />
        </button>
        <h2 className={css.title}>Profile settings</h2>
        <div className={css.avatarContainer}>
          <img
            src={avatarUrl || defaultAvatar}
            alt="User avatar"
            className={css.avatarImage}
          />

          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={inputRef}
            onChange={handleFileChange}
          />
          <div className={css.buttonsGroup}>
            <button onClick={handleButtonClick} className={css.uploadPhoto}>
              Upload new photo
            </button>
            <button onClick={handleRemovePhoto} className={css.removePhoto}>
              Remove
            </button>
          </div>
        </div>
        <div className={css.identityAndCurrency}>
          <select
            name="currency"
            value={editetCurrency}
            onChange={handleCurrencyChange}
            className={css.currencySelector}
          >
            <option value="uah">₴ UAH</option>
            <option value="usd">$ USD</option>
            <option value="eur">€ EUR</option>
          </select>
          <input
            type="text"
            name="username"
            value={editedUserName}
            className={css.userName}
            onChange={handleNameChange}
          />
        </div>
        <button className={css.saveButton} onClick={handleSave}>
          Save
        </button>
      </div>
    </div>,
    document.body
  );
}

export default UserSetsModal;
