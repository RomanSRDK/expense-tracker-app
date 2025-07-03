import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import * as Yup from "yup";
import AuthForm from "../../components/AuthForm/AuthForm";

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
      })
      .catch(() => {
        console.log("login error");
      });

    actions.resetForm();
  };

  //JSX
  return (
    <div>
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
