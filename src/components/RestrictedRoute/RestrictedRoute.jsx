import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";

const RestrictedRoute = ({ component: Component, redirectTo }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  // Якщо відбувається refreshing, показуємо лоадер
  if (isRefreshing) {
    return <Loader />;
  }

  // Тільки після завершення refreshing перевіряємо авторизацію
  return !isLoggedIn ? Component : <Navigate to={redirectTo} />;
};

export default RestrictedRoute;
