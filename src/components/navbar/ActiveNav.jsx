import { NavLink } from "react-router-dom";
import styled from "styled-components";

const ActiveNav = ({ index, text, total, path, defaultActive, status }) => {
  const ActiveStyles = {
    color: "#151717",
    borderBottom: "4px solid #00A2D4",
    borderRadius: 0,
  };

  return (
    <Container>
      <NavLink
        to={path}
        style={({ isActive }) => (isActive || (index === 0 && defaultActive) ? ActiveStyles : {})}
      >
        <p>{text}</p>{" "}
        {typeof total === "number" ? (
          <span>
            {total} {status && <span />}
          </span>
        ) : null}
      </NavLink>
    </Container>
  );
};

export default ActiveNav;

export const Container = styled.div`
  display: flex;
  a > p {
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    white-space: nowrap;

    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
  }

  span {
    position: relative;
    display: flex;
    align-items: center;
    padding: 4px 12px;
    background-color: #00a2d419;
    border-radius: 10px;
    color: #00a2d4;
    font-size: 14px;
    font-weight: 500;
    height: max-content;
    @media screen and (max-width: 600px) {
      font-size: 12px;
    }
    > span {
      position: absolute;
      top: 0;
      right: 0;
      padding: 5px;
      background-color: red;
    }
  }
  a {
    display: flex;
    gap: 16px;
    align-items: center;
    color: #959697;
    text-decoration: none;
    margin: 0;
    border: none;
    padding: 16px;
  }
`;
//const StyledLink = styled(NavLink)``;
