import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetSingleEntityQuery } from "services/launchService";
import { Container, PayProvide } from "./styles";

export const PaymentSelector = ({ providers, activate }) => {
  const [entityInfo, setEntityInfo] = useState({
    entityCurrency: "",
    entityFee: "",
  });

  const launchResponse = useSelector(
    (store) => store.LaunchReducer.launchResponse
  );

  const { launchCode, registrationType } = launchResponse;

  const { data } = useGetSingleEntityQuery(registrationType);

  useEffect(() => {
    // console.log(data);
    if (data) setEntityInfo(data);
  }, [data]);

  return (
    <Container>
      {entityInfo.entityCurrency === "USD" ? (
        <>
          {providers.map((el, index) => (
            <PayProvide
              key={index}
              active={el.active}
              onClick={() => activate(el.id)}
            >
              {/* <p>{el.image}</p> */}
              <img src={el.image} alt={el.name} />
            </PayProvide>
          ))}
        </>
      ) : (
        <>
          {providers.map(
            (el, index) =>
              el.name === "flutterwave" && (
                <PayProvide
                  key={index}
                  active={el.active}
                  onClick={() => activate(el.id)}
                >
                  {/* <p>{el.image}</p> */}
                  <img src={el.image} alt={el.name} />
                </PayProvide>
              )
          )}
        </>
      )}
    </Container>
  );
};
