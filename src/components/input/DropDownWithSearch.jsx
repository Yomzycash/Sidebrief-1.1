import React from "react";
import styled from "styled-components";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";
import { DropdownArrow } from "asset/svg";
import { BottomText } from "./styled";

const DropDownWithSearch = ({
  name, // name, neccessary for React-hook-form
  title,
  list,
  renderer, // renderer is a React Component that describes how the item should be rendered
  selectAction,
  filterBy,
  bottomText,
  allowCreate,
  onCreate, // only used when object creation is allowed
  value, // only used when object creation is allowed
  setValue, // only used when object creation is allowed
}) => {
  return (
    <Container>
      <Top>
        <Title>{title}</Title>
      </Top>
      <DropdownList
        style={{ color: "#00A2D4" }}
        containerClassName={"input"}
        textField={filterBy ? filterBy : "text"}
        selectIcon={<DropdownArrow />}
        name={name}
        data={list}
        dataKey="id"
        placeholder="--"
        renderValue={renderer}
        renderListItem={renderer}
        onSelect={selectAction}
        allowCreate={allowCreate}
        onCreate={allowCreate ? onCreate : null}
        value={allowCreate ? value : null}
        onChange={allowCreate ? setValue : null}
      />
      {bottomText ? <BottomText>{bottomText}</BottomText> : null}
    </Container>
  );
};

export default DropDownWithSearch;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  gap: 8px;

  .rw-list-option {
    padding-block: 14px;
  }

  .rw-list {
    // I think the scrollbar can be edited from here, also there is a listComponent prop, when passed will replace rw-list
  }

  .input {
    height: 48px;
    padding-inline: 12px;
    border-radius: 8px;
  }
`;

const Top = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;

const Title = styled.span`
  font-size: clamp(13px, 1.5vw, 14px);
  font-weight: 500;
  color: #4e5152;
  font-family: "BR Firma";
  font-weight: 500;
  line-height: 21px;
`;
