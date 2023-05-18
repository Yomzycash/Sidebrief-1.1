import { SubscriptionFormContainer } from "./styles";
import { InputWithLabel } from "components/input";
import { CommonButton } from "components/button";

export const SubscriptionForm = () => {
  return (
    <SubscriptionFormContainer>
      <InputWithLabel label={"Card Number"} containerStyle={"element1"} />
      <InputWithLabel label={"EXP Date"} containerStyle={"element2"} />
      <InputWithLabel label={"CVV"} containerStyle={"element3"} />
      <CommonButton text={"Subscribe"} classname={"submit"} />
    </SubscriptionFormContainer>
  );
};
