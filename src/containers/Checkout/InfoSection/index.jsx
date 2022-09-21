import React from "react";
import Checkbox from "components/input/Checkbox";
import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
import {
  ButtonLink,
  Title,
  TitleWrapper,
  Wrapper,
  AddMoreWrapper,
  AddWrapper,
} from "./style";
import { useState } from "react";
import SectionForm from "./SectionForm";

export const CheckoutFormInfo = ({
  title = "Shareholder’s Information",
  info = "Shareholder",
}) => {
  const [containerList, setContainerList] = useState([{ container: "" }]);

  const handleAddContainer = () => {
    setContainerList([...containerList, { container: "" }]);
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{title}:</Title>
      </TitleWrapper>

      <Checkbox />
      {containerList.map((singleContainer, index) => (
        <SectionForm
          containerList={containerList}
          setContainerList={setContainerList}
          index={index}
          key={index}
        />
      ))}

      {containerList.length > 0 && (
        <AddMoreWrapper onClick={handleAddContainer}>
          <AddWrapper>
            <AddIcon />
          </AddWrapper>
          <ButtonLink>
            Add More<p> {info}</p>
          </ButtonLink>
        </AddMoreWrapper>
      )}
    </Wrapper>
  );
};
