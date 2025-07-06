import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { logIn } from "../../redux/auth/operations";
import Container from "../../components/Container/Container";
import AuthForm from "../../components/AuthForm/AuthForm";
import s from "./RegisterPage.module.css";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .min(4, "Too short")
    .required("required")
    .max(30, "Too long")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid Email"),
  password: Yup.string()
    .min(5, "Too short")
    .max(20, "Too long")
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
    //   "At least one letter and one number"
    // )
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
      .catch(() => {
        toast.error("Login error");
      });

    actions.resetForm();
  };

  //JSX
  return (
    <Container>
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
    </Container>
  );
}

export default LoginPage;
