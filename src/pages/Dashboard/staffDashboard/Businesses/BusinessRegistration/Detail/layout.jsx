import { Outlet, useParams, useNavigate } from "react-router-dom";
import { Header } from "containers/BusinessDetail";
import { Body, Container } from "./styles";

const BusinessDetailLayout = () => {
  const { code } = useParams();

 
  return (
    <Container>
      {/* <Header /> */}
      <Body>
        <Outlet />
      </Body>
    </Container>
  );
};

export default BusinessDetailLayout;
