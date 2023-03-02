import { Outlet, useParams, useNavigate } from "react-router-dom";
import { Header } from "containers/BusinessDetail";
import { Body, Container } from "./styled";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const StaffBusinessDetailLayout = () => {
  return (
    <Container>
      <Header isStaff />
      <Body>
        <Outlet />
      </Body>
    </Container>
  );
};

export default StaffBusinessDetailLayout;
