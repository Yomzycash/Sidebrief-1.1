import { TextWithArrow } from "components/texts";
import {
  Container,
  Heading,
  Title,
  ViewAllButton,
  TableContainer,
  BottomText,
  TableHeader,
} from "./styles";
import { businessesHeader } from "./constants";
import ActiveNav from "components/navbar/ActiveNav";
// import { useLocation, useNavigate } from "react-router-dom";

export const BusinessHomeTableLayout = ({ children }) => {
  return (
    <Container>
      <Heading>
        <div>
          <Title>Business Registrations</Title>
          <ViewAllButton to="/staff-dashboard/businesses/registration">
            <TextWithArrow blue>View All</TextWithArrow>
          </ViewAllButton>
        </div>
        <BottomText>Keep up and track latest business registrations</BottomText>
      </Heading>
      <TableContainer>
        <TableHeader>
          {businessesHeader.map((header, index) => (
            <ActiveNav
              key={index}
              text={header.text}
              path={header.path}
              // defaultActive={index === 0 && home}
            />
          ))}
        </TableHeader>
        {children}
      </TableContainer>
    </Container>
  );
};
