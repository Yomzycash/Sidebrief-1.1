import { Container, PayProvide } from "./styles";

export const PaymentSelector = ({ providers, activate }) => {
  return (
    <Container>
      {providers.map((el, index) => (
        <PayProvide
          key={index}
          active={el.active}
          onClick={() => activate(el.id)}
        >
          <img src={el.image} alt={el.name} />
        </PayProvide>
      ))}
    </Container>
  );
};
