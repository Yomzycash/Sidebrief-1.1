import React from "react";
import styled from "styled-components";

const data = [
  {
    id: "1",
    title: "Applied",
    color: "#00A2D4",
    background: "rgba(0, 162, 212, 0.05)",
    date: "12th August",
  },
  {
    id: "2",
    title: "Approved",
    color: "#D400CC",
    background: "rgba(212, 0, 204, 0.05)",
    date: "-",
  },
  {
    id: "3",
    title: "In Progress",
    color: "#FFBF29",
    background: "rgba(255, 191, 41, 0.05)",
    date: "-",
  },
  {
    id: "4",
    title: "completed",
    color: "#00D448",
    background: "rgba(0, 212, 72, 0.05)",
    date: "-",
  },
];

const Stepbar = () => {
  return (
    <StepContainer>
      <div>
        <List>
          {data.map((item, index) => (
            <ListItem color={item.color}>
              <ListSpan color={item.color} backgroundColor={item.background}>
                {item.title}
              </ListSpan>{" "}
              <br /> <DateSpan>{item.date}</DateSpan>
            </ListItem>
          ))}
        </List>
      </div>
    </StepContainer>
  );
};

export default Stepbar;

const StepContainer = styled.div`
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
  background-color: white;
  padding-top: 40px;
  padding-bottom: 40px;
  padding-right: 97px;
  padding-left: 24px;
  width: 300px;

  div {
    border-left: dashed #727474 1px;
    height: calc(100% - 35px);
    transform: translateY(3%);
    position: relative;
  }
`;

const List = styled.ul`
  gap: 48px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: -10px;
  ::after {
    /* content: "";
    position: absolute;
    left: 0px;
    top: 0;
    width: 3px;
    z-index: 1px; */
  }
`;

const ListItem = styled.li`
  list-style-type: none;
  margin: -5px auto 0px auto;
  ::before {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
    left: -8px;
  }
`;

const ListSpan = styled.span`
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  padding: 4px 16px;
  display: inline;
  border-radius: 12px;
`;
const DateSpan = styled.span`
  font-size: 14px;
  line-height: 31px;
  color: #4e5152;
`;
