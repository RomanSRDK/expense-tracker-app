import Container from "../Container/Container";
import Section from "../Section/Section";
import css from "./RefreshingUser.module.css";

const RefreshingUser = () => {
  return (
    <Section>
      <Container>
        <p className={css.title}>Refreshing user...</p>
      </Container>
    </Section>
  );
};

export default RefreshingUser;
