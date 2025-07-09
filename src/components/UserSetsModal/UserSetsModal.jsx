import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMedia } from "react-use";
import {
  selectCurrency,
  selectIsLoading,
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
import toast from "react-hot-toast";
import { CircleLoader } from "react-spinners";
import css from "./UserSetsModal.module.css";
import clsx from "clsx";
import CurrencyCustomSelect from "../CurrencyCustomSelect/CurrencyCustomSelect";

function UserSetsModal({ closeModal, onClose }) {
  const dispatch = useDispatch();
  const isTablet = useMedia("(min-width: 768px)");

  const avatarUrl = useSelector(selectUserAvatar);
  const userName = useSelector(selectUserName);
  const currency = useSelector(selectCurrency);
  const isLoading = useSelector(selectIsLoading);

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
  const handleCurrencyChange = (newCurrency) => {
    setEditedCurrency(newCurrency);
  };

  const handleSave = () => {
    dispatch(
      setCurrencyAndName({
        name: editedUserName.trim(),
        currency: editetCurrency,
      })
    );
    closeModal();
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  // useEffect для скрытия бургера
  useEffect(() => {
    if (window.innerWidth >= 1440) {
      return;
    } else {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (window.innerWidth >= 1440) {
      return;
    } else {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [closeModal]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const formData = new FormData();
    formData.append("avatar", file);

    dispatch(updatesAvatar(formData))
      .unwrap()
      .then(() => {
        toast.success("Avatar updated successfully!", {
          icon: "👌🏻",
          duration: 4000,
          position: "top-center",
        });
      })
      .catch(() => {
        toast.error("Oops! This file is too big. The limit is 1.6 MB", {
          icon: "😕",
          duration: 4000,
          position: "top-center",
        });
      });
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleRemovePhoto = () => {
    dispatch(removeUsersAvatar())
      .unwrap()
      .then(() => {
        toast.success("Avatar removed", {
          icon: "👤",
          duration: 4000,
          position: "top-center",
        });
      });
  };

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={css.closeButton}
          aria-label="Close modal"
          onClick={() => closeModal()}
        >
          <IoCloseOutline size={24} />
        </button>
        <h2 className={css.title}>Profile settings</h2>
        <div className={css.avatarContainer}>
          {isLoading ? (
            <CircleLoader
              size={isTablet ? 100 : 80}
              color={"var(--color-primary)"}
              speedMultiplier={2}
            />
          ) : (
            <img
              src={avatarUrl || defaultAvatar}
              alt="User avatar"
              className={css.avatarImage}
            />
          )}
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
            <button
              onClick={handleRemovePhoto}
              className={clsx(css.removePhoto, {
                [css.disabled]: avatarUrl === defaultAvatar || !avatarUrl,
              })}
              disabled={avatarUrl === defaultAvatar || !avatarUrl}
            >
              Remove
            </button>
          </div>
        </div>
        <div className={css.identityAndCurrency}>
          <CurrencyCustomSelect
            className={css.currencySelector}
            value={editetCurrency}
            onChange={handleCurrencyChange}
          />

          <input
            type="text"
            name="username"
            value={editedUserName}
            className={css.userName}
            onChange={handleNameChange}
          />
        </div>
        <button
          className={clsx(css.saveButton, {
            [css.disabled]:
              editedUserName.trim().length < 2 ||
              editedUserName.trim().length >= 32,
          })}
          onClick={handleSave}
          disabled={
            editedUserName.trim().length < 2 ||
            editedUserName.trim().length >= 32
          }
        >
          Save
        </button>
      </div>
    </div>,
    document.body
  );
}

export default UserSetsModal;
