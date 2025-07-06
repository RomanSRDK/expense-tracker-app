import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/operations";
import AuthForm from "../../components/AuthForm/AuthForm";
import s from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(4, "Too short")
    .required("Email is required")
    .max(30, "Too long")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid Email"),
  password: Yup.string()
    .min(5, "Too short")
    .max(20, "Too long")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      "At least one letter and one number"
    )
    .required("Password is required"),
});

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values, actions) => {
    dispatch(
      logIn({
        email: values.email,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("login success");
        navigate("/transactions/expenses");
      })
      .catch((error) => {
        toast.error(error);
      });

    actions.resetForm();
  };

  //JSX
  return (
    <div className={s.sharedWrapper}>
      <div className={s.content_box}>
        <h2>Sign In</h2>
        <p>
          Welcome back to effortless expense tracking! Your financial dashboard
          awaits.
        </p>
      </div>

      <AuthForm
        mode="login"
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
        buttonLabel="Sign In"
      />
    </div>
  );
}

export default LoginPage;
