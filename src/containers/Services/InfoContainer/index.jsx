import { Container, LHS, RHS, NormalText, BigText, CountryName, Documents, Doc } from "./styles";
import { Clock, Coin } from "asset/colorIcons";
import numeral from "numeral";
// import { useGetCountryInfoQuery } from "services/vendorService";

export const InfoContainer = ({ country, requiredDocuments, amount, currency, timeline }) => {
  // const { data, isLoading } = useGetCountryInfoQuery(countryISO);

  // !isLoading && console.log(data);

  return (
    <Container>
      <LHS>
        <div>
          <NormalText>Operational Country</NormalText>
          <CountryName>
            {country.countryName}
            {/* <img src={`https://countryflagsapi.com/png/${country.countryISO}`} alt={"flag"} /> */}
          </CountryName>
        </div>
        <div>
          {requiredDocuments.length > 0 ? (
            <>
              <NormalText>You will be asked to upload the following documents</NormalText>
              <Documents>
                {requiredDocuments.map((document) => (
                  <Doc>{document.requirementName}</Doc>
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
            {currency} {numeral(amount).format("0,0.[00]")}
          </BigText>
        </div>
        <div>
          <NormalText>
            <img src={Clock} alt={"clock"} />
            Total time required
          </NormalText>
          <BigText>{timeline} Days</BigText>
        </div>
      </RHS>
    </Container>
  );
};
