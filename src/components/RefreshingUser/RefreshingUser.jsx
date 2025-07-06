import Container from "../Container/Container";
import Section from "../Section/Section";
import css from "./RefreshingUser.module.css";

const RefreshngUser = () => {
  return (
    <Section>
      <Container>
        <p className={css.title}>Refreshing user...</p>
      </Container>
    </Section>
  );
};

export default RefreshngUser;
