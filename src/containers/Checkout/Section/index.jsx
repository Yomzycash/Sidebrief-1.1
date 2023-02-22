import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ToolTip from "components/texts/ToolTip";
import {
  Container,
  Heading,
  ContentWrapper,
  SectionContainer,
  CheckBox,
  LabelTip,
} from "./styles";
import { useRef } from "react";

export const CheckoutSection = ({
  title,
  children,
  review,
  sectionTitle,
  linkTitle,
  HeaderParagraph,
  checkbox,
  checkBoxAction,
  to,
  disableCheckbox,
  checked,
  titleStyles,
  hideCheckbox,
  tipText,
  tipStyle,
}) => {
  const [mouseEnter, setMouseEnter] = useState();

  const handleCheckbox = (e) => {
    checkBoxAction(e.target.checked);
  };

  let tipParentRef = useRef();

  return (
    <Container>
      <Heading style={{ ...titleStyles }}>{title}</Heading>
      {HeaderParagraph && <p>{HeaderParagraph}</p>}
      {checkbox && (
        <CheckBox disabled={disableCheckbox} $hide={hideCheckbox}>
          <input
            type="checkbox"
            id="checkbox"
            onChange={handleCheckbox}
            disabled={disableCheckbox}
            checked={checked}
          />
          <label htmlFor="checkbox">
            Check the box to use SIDEBRIEF's{" "}
            <LabelTip
              ref={tipParentRef}
              onMouseEnter={() => setMouseEnter(true)}
              onMouseLeave={() => setMouseEnter(false)}
            >
              <span>{checkbox}</span>
              {mouseEnter && (
                <ToolTip
                  message={tipText}
                  style={tipStyle}
                  parentRef={tipParentRef}
                  disabled={disableCheckbox}
                />
              )}
            </LabelTip>{" "}
            for your first 3 months
          </label>
        </CheckBox>
      )}
      {review && (
        <SectionContainer>
          <p>{sectionTitle}</p>

          <Link
            to={to}
            style={{
              textDecoration: "none",
              fontSize: "14px",
              color: "#00A2D4",
              cursor: "pointer",
            }}
          >
            {linkTitle}
          </Link>
        </SectionContainer>
      )}
      <ContentWrapper>{children}</ContentWrapper>
    </Container>
  );
};
