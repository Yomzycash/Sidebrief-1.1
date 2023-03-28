import { useEffect } from "react";
import { paymentProviders } from "./constants";
import { Container, PayProvide } from "./styles";

export const PaymentSelector = ({ activeProvider, setActiveProvider, currency }) => {
  // Auto selects the first of the supported providers
  useEffect(() => {
    let supported = paymentProviders.filter((el) =>
      el.supported.find((e) => e?.toLowerCase() === currency?.toLowerCase())
    );
    setActiveProvider(supported[0]?.provider || "");
  }, [currency]);

  return (
    <Container>
      {paymentProviders
        .filter((el) => el.supported.find((e) => e?.toLowerCase() === currency?.toLowerCase()))
        .map((el, index) => (
          <PayProvide
            key={index}
            active={activeProvider === el.provider}
            onClick={() => setActiveProvider(el.provider)}
          >
            <img src={el.image} alt={el.provider} />
          </PayProvide>
        ))}
    </Container>
  );
};
