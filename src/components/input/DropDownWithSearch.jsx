import React from "react";
import styled from "styled-components";
import DropdownList from "react-widgets/DropdownList";
import "react-widgets/styles.css";

const DropDownWithSearch = ({ title, list }) => {
  return (
    <Container>
      <Top>
        <Title>{title}</Title>
      </Top>
      <DropdownList
        style={{ color: "#00A2D4" }}
        data={list}
        dataKey="id"
        textField="text"
        placeholder=" "
        renderValue={({ item }) => (
          <span>
            {item.img && (
              <img src={item.img} alt="" style={{ width: "20px" }} />
            )}
            {" " + item.text}
          </span>
        )}
        groupBy={(data) => data.length}
        renderListGroup={() => (
          <span>{list.length + " countries available"}</span>
        )}
      />
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
`;
const Top = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
`;
const Title = styled.div`
  font-size: clamp(13px, 1.5vw, 14px);
  font-weight: 500;
  color: #4e5152;
`;
