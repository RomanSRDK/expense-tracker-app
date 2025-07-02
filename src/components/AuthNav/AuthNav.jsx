import CustomNavLink from "../CustomNavLink/CustomNavLink";

function AuthNav() {
  return (
    <nav>
      <ul>
        <li>
          <CustomNavLink to="/register">Sign Up</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/login">Sign In</CustomNavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AuthNav;
