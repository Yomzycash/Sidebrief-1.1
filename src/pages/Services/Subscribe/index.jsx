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
  Bottom,
} from "./styles";
import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader.jsx";
import { Info } from "asset/svg";
import { SubscribeForm } from "./subscribeForm";
import { useGetSingleServiceQuery } from "services/staffService.js";
import numeral from "numeral";
import { getCurrencyInfo } from "utils/globalFunctions";

const Subscribe = () => {
  let complyInfo = JSON.parse(localStorage.getItem("complyInfo"));
  let serviceId = complyInfo?.serviceId;

  const viewService = useGetSingleServiceQuery(serviceId);
  const serviceData = viewService.data;

  const symbol = viewService.isSuccess ? getCurrencyInfo(serviceData.serviceCurrency)?.symbol : "$";

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
                <Price actual>
                  {viewService.isSuccess
                    ? `${symbol}${numeral(serviceData.servicePrice).format("0,0.00")}`
                    : "--"}
                </Price>
              </Charge>
              <Charge>
                <ChargeHeadText>current charge</ChargeHeadText>
                <Price>{`${symbol}0`}</Price>
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
        <Bottom>
          <SubscribeForm priceId={serviceData.priceId} productId={serviceData.productId} />
          <div />
        </Bottom>
      </Body>
    </Container>
  );
};

export default Subscribe;
