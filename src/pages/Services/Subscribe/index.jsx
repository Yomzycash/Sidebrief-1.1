import {
  Container,
  Body,
  Top,
  LHS,
  LHSHead,
  RHS,
  Vline,
  Charges,
  Charge,
  ChargeHeadText,
  Price,
  Text,
  LinkText,
} from "./styles";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader.jsx";
import { Info } from "asset/svg";

const Subscribe = () => {
  return (
    <Container>
      <ServicesCheckoutHeader />
      <Body>
        <Top>
          <LHS>
            <LHSHead>
              Subscribe to plan <span>(Renews Annually)</span>
            </LHSHead>
            <Charges>
              <Charge>
                <ChargeHeadText>starting 1st january</ChargeHeadText>
                <Price actual>$72,000</Price>
              </Charge>
              <Charge>
                <ChargeHeadText>current charge</ChargeHeadText>
                <Price>$0</Price>
              </Charge>
            </Charges>
          </LHS>
          <Vline />
          <RHS>
            <Info />
            <Text>
              By subscribing you agree to our <span>automatic yearly renewal</span> option which
              will start from 1st January. For now, you are not charged any fee but your
              subscription will start next year and you will be charged <span>$72,000</span>. Feel
              free to cancel anytime.
            </Text>
            <LinkText to={"#"}>About cancellation and refunds</LinkText>
          </RHS>
        </Top>
      </Body>
    </Container>
  );
};

export default Subscribe;
