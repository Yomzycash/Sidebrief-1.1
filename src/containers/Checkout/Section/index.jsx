import React from "react";
import { Link } from "react-router-dom";
import { Container, Heading, ContentWrapper, SectionContainer } from "./styles";

export const CheckoutSection = ({
  title,
  subtitle,
  children,
  review,
  sectionTitle,
  linkTitle,
  to,
}) => {
  return (
    <Container>
      <Heading>
        {title}
        {subtitle ? ":" : null} <span>{subtitle}</span>
      </Heading>
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