import {
  Container,
  LHS,
  // DocRequired,
  RHS,
  NormalText,
  BigText,
  CountryName,
  Documents,
  Doc,
  DocumentList,
} from "./styles";
import { Clock, Coin } from "asset/colorIcons";
import numeral from "numeral";
import { getCurrencyInfo } from "utils/globalFunctions";
import { BsCheck2All, BsCheckCircleFill } from "react-icons/bs";

export const InfoContainer = ({ country, service }) => {
  let requiredDocuments = service?.serviceRequirements;
  let amount = service?.servicePrice;
  let currency = service?.serviceCurrency;
  let currencySymbol = getCurrencyInfo(currency)?.symbol;
  let timeline = service?.serviceTimeline;

  return (
    <Container>
      <LHS>
        <div>
          <NormalText>Operational Country</NormalText>
          <CountryName>
            <BsCheckCircleFill size={16} />
            {country?.countryName}
            {/* <img src={`https://countryflagsapi.com/png/${country.countryISO}`} alt={"flag"} /> */}
          </CountryName>
        </div>
        <div>
          {requiredDocuments?.length > 0 ? (
            <>
              <NormalText>We will need the following documents</NormalText>
              <Documents>
                {requiredDocuments?.map((document, index) => (
                  <DocumentList key={index}>
                    <BsCheck2All color="#fff" />
                    <Doc key={index}>{document?.requirementName}</Doc>
                  </DocumentList>
                ))}
              </Documents>
            </>
          ) : null}
        </div>
      </LHS>
      <RHS>
        <div>
          <NormalText>
            <img src={Coin} alt={"coin"} />
            Total amount
          </NormalText>
          <BigText>
            {currencySymbol} {numeral(amount)?.format("0,0.[00]")}
          </BigText>
        </div>
        <div>
          <NormalText>
            <img src={Clock} alt={"clock"} />
            Total time required
          </NormalText>
          <BigText>{timeline}</BigText>
        </div>
      </RHS>
    </Container>
  );
};
