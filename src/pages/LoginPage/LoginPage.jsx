import { useDispatch } from "react-redux";
import { logIn, logOut } from "../../redux/auth/operations";
import * as Yup from "yup";
import AuthForm from "../../components/AuthForm/AuthForm";
import s from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(4, "Too short")
    .required("required")
    .max(30, "Too long")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address"
    ),
  password: Yup.string()
    .min(5, "Too short")
    .max(20, "Too long")
    .required("required"),
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
        console.log("login success");
        navigate("/transactions/expenses");
      })
      .catch((error) => {
        console.log(error);
      });

    actions.resetForm();

    //
  };

  //JSX
  return (
    <div>
      <div className={s.content_box}>
        <h2>Sign In</h2>
        <p>
          Welcome back to effortless expense tracking! Your financial dashboard
          awaits.
        </p>
      </div>

      {/* {next button is for a while} */}
      <button
        type="button"
        onClick={() => dispatch(logOut())}
        className={s.log_out}
      >
        Log out
      </button>

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
