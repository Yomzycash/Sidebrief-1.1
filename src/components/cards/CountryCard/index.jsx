import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as BgSvg } from "asset/svg/countryCardBg.svg";
import { ReactComponent as Envelope } from "asset/svg/envelope.svg";
import {
  Container,
  StartButton,
  Corner,
  ImageHolder,
  TextContainer,
  Title,
  Body,
  Frame,
  Bg,
  Content,
  CountryContainer,
  Top,
  TopLeft,
  TopRight,
  Bottom,
  Item,
  Add,
  Edit,
  Delete,
  CardName,
  ModalWrapper,
  LogoWrapper,
} from "./styled";
import { ReactComponent as EditC } from "asset/svg/editc.svg";

import { ReactComponent as CornerPetal } from "asset/svg/cornerPetal.svg";
import { ReactComponent as AddC } from "asset/svg/addc.svg";

import { ReactComponent as DeleteC } from "asset/svg/deletec.svg";

import image from "../../../asset/images/Nigeria.png";
import { BsThreeDotsVertical } from "react-icons/bs";
const CountryCard = () => {
  const [hover, setHover] = useState(false);
  const [openModalCard, setModalCard] = useState(false);
  const handleModal = () => {
    setModalCard(!openModalCard);
    console.log("test");
  };

  return (
    <div style={{ display: "flex", marginBottom: "100px" }}>
      {/* <CountryContainer
        hover={hover}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      > */}
      {/* <Bg>
          <BgSvg />
        </Bg>

        <Content>
          <Top>
            <TopLeft>
              <LogoWrapper>
                <img src={image} alt="Country" />
              </LogoWrapper>
              <CardName>Nigeria</CardName>
            </TopLeft>
            <TopRight onClick={handleModal}>
              <BsThreeDotsVertical />
            </TopRight>
          </Top>
          <Bottom>
            <Item>
              <Envelope />
              <p>NGN</p>
            </Item>
            <Item>
              <Envelope />
              <p>+234</p>
            </Item>
            <Item>
              <Envelope />
              <p>Naira</p>
            </Item>
          </Bottom>
        </Content>

        {openModalCard && (
          <ModalWrapper>
            <Edit>
              <EditC />
              <p>Edit</p>
            </Edit>
            <Add>
              <AddC />
              <p>Add Entity</p>
            </Add>
            <Delete>
              <DeleteC />
              <p>Delete</p>
            </Delete>
          </ModalWrapper>
        )} */}
      {/* </CountryContainer> */}
      <Container
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        hover={hover}
      >
        <Corner hover={hover}>
          <BgSvg />
        </Corner>
        <Frame>
          <Content>
            <Top>
              <TopLeft>
                <LogoWrapper>
                  <img src={image} alt="Country" />
                </LogoWrapper>
                <CardName>Nigeria</CardName>
              </TopLeft>
              <TopRight onClick={handleModal}>
                <BsThreeDotsVertical />
              </TopRight>
            </Top>
            <Bottom>
              <Item>
                <Envelope />
                <p>NGN</p>
              </Item>
              <Item>
                <Envelope />
                <p>+234</p>
              </Item>
              <Item>
                <Envelope />
                <p>Naira</p>
              </Item>
            </Bottom>
          </Content>
        </Frame>

        {openModalCard && (
          <ModalWrapper>
            <Edit>
              <EditC />
              <p>Edit</p>
            </Edit>
            <Add>
              <AddC />
              <p>Add Entity</p>
            </Add>
            <Delete>
              <DeleteC />
              <p>Delete</p>
            </Delete>
          </ModalWrapper>
        )}
      </Container>
    </div>
  );
};

export default CountryCard;
