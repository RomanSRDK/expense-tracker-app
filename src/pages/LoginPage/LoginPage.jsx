import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/operations";
import AuthForm from "../../components/AuthForm/AuthForm";
import s from "./LoginPage.module.css";

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

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(
        logIn({
          email: values.email,
          password: values.password,
        })
      ).unwrap();
      toast.success("login success");
    } catch {
      toast.error("Login error");
    }

    actions.resetForm();
  };

  //JSX
  return (
    <div className={s.sharedWrapper}>
      <div className={s.content_box}>
        <h2 tabIndex={0}>Sign In</h2>
        <p tabIndex={0}>
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
