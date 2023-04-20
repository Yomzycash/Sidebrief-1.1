import React from "react";
import {
  Container,
  Content,
  ContentBody,
  ContentTitle,
  ContentWrapper,
  IconWrapper,
  Top,
} from "./styled";
import { CornerPetal } from "asset/svg";

const ProductCard = ({ title, body, Icon, to, headerColor }) => {
  return (
    <Container to={to || ""}>
      <Top color={headerColor}>
        <CornerPetal />
      </Top>
      <ContentWrapper>
        {Icon && (
          <IconWrapper>
            <Icon color="#fff" />
          </IconWrapper>
        )}
        <Content>
          <ContentTitle>{title}</ContentTitle>
          <ContentBody>{body}</ContentBody>
        </Content>
      </ContentWrapper>
    </Container>
  );
};

export default ProductCard;
