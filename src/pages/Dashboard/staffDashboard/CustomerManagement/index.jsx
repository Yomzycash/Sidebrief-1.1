import React, { useEffect, useState, useMemo } from "react";
import {
    Container,
    Header,
    HeaderText,
    LeftContainer,
    ButtonContainer,
    TopSection,
    SearchBlock,
    SearchWrapper,
    MainSection,
    LeftSection,
    MetricSection,
    MetricContainer,
    Number,
    TopText,
    Divider,
    BottomText,
    TableSection,
    RightSection,
    StyledWrapper,
    SubHeader,
    Loading
} from "./styled";
import {
     EmptyContainer
} from "./tableStyle"
import { GeneralTable } from "components/Tables";
import Search from "components/navbar/Search";
import ActiveNav from "components/navbar/ActiveNav";
import { CommonButton } from 'components/button'
import { columns } from "./tableColumn";
import { compareAsc, format } from "date-fns";
import { Puff } from "react-loading-icons";
import { useMediaQuery } from "@mui/material";
import MobileStaff from "layout/MobileStaff";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useCategoriesActions } from "./actions";

import {
    useGetAllLaunchQuery,
    useGetApprovedLaunchQuery,
    useGetDraftLaunchQuery,
    useGetRejectedLaunchQuery,
    useGetSubmittedLaunchQuery,
    useGetServicesByCategoryQuery,
    useGetAllUsersQuery,
} from "services/staffService";
import { 
    useViewAllComplyQuery,
    useViewAllComplyByMetaQuery
 } from "services/complyService";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MetricCard = ({ number, percentage, topText, bottomText}) => {
    return (
          <StyledWrapper>
            <TopText>{topText}</TopText>
            <Number>{number}</Number>
            <Divider/>
            <BottomText>{bottomText}</BottomText>
        </StyledWrapper>
    )
}
const UserManagement = () => {
    const { data, isLoading, isSuccess } = useViewAllComplyQuery();
    const loadingData = isLoading;
    
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
   

    const filteredData = data?.filter(service => service.serviceId === "7249050587");
    console.log("filteredData", filteredData)

    const allUsers = useGetAllUsersQuery();
    const allLaunches = useGetAllLaunchQuery();
    console.log("all launches", allUsers?.data?.users )


   
    // const CategoryServices = useGetServicesByCategoryQuery(category);
    const allUserComply = useViewAllComplyByMetaQuery(
        { meta: userInfo?.id },
        { refetchOnMountOrArgChange: true }
    );

    console.log("allUserComply", allUserComply)
    // const getServiceInfo = (id) => CategoryServices.data?.find((el) => el?.serviceId === id);

    // const CategoryComplies = allUserComply.data?.filter(
    //     (el) => el?.serviceId === getServiceInfo(el?.serviceId)?.serviceId
    // );
    // const draftData = allUsers?.data?.users?.slice(0, 10)
    // console.log("allUsers", draftData )
    const searchStyle = {
        borderRadius: "12px",
        backgroundColor: "white",
        width: "100%",
        height: "100%",
    };

    const totalUsers = allUsers?.data?.users.length || 0;
    const activeUsers =  allLaunches?.data?.length || 0;
    const inactiveUsers = totalUsers - activeUsers || 0;
    
    const [value, onChange] = useState(new Date());

    const iconStyle = { width: "17px", height: "17px" };

    const matches = useMediaQuery("(max-width:700px)");

    const MemoisedGeneralTable = useMemo(() => GeneralTable, []);

    return (
        <Container>
            <Header>
                <TopSection>
                    <LeftContainer>
                        <HeaderText>
                            Customer Management Platform
                        </HeaderText>
                        <ButtonContainer>
                            <CommonButton
                                text="Send Mail"
                            />
                        </ButtonContainer>
                    </LeftContainer>
                    <SearchBlock>
                        <SearchWrapper>
                            <Search
                                searchStyle={searchStyle}
                                iconStyle={iconStyle}
                                placeholder="Search customers"
                            />
                        </SearchWrapper>
                    </SearchBlock>
                </TopSection>
            </Header>
            <MainSection>
                <LeftSection>   
                    <MetricSection>
                        <MetricContainer>
                            <MetricCard
                                topText={"All Customers"}
                                number={totalUsers}
                                bottomText={"25% increase last month"}
                            />
                                <MetricCard
                                topText={"Active Customers"}
                                number={activeUsers}
                                bottomText={"85% active customers"}
                            />
                                <MetricCard
                                topText={"Inactive Customers"}
                                number={inactiveUsers}
                                bottomText={"25% inactive customers"}
                            />
                        </MetricContainer>
                    </MetricSection>
                    <TableSection>
                        {!matches ? (
                            <SubHeader>
                                <ActiveNav
                                    text="All"
                                    path={"/staff-dashboard/customer-management/all"}
                                />
                                 <ActiveNav
                                    text="Managed"
                                    path={"/staff-dashboard/customer-management/managed"}
                                />
                                <ActiveNav
                                    text="Tax"
                                    path={"/staff-dashboard/customer-management/taxes"}
                                />
                                <ActiveNav
                                    text="Intellectual Property"
                                    path={"/staff-dashboard/customer-management/intellectual"}
                                />
                                  <ActiveNav
                                    text="Onboard"
                                    path={"/staff-dashboard/customer-management/onboarded"}
                                />
                            </SubHeader>
                        ) : (
                            <MobileStaff
                                initialTitle={"All"}
                                mobile
                            />
                        )}
                        {loadingData ? (
                            <Loading>
                                <Puff stroke="#00A2D4" />
                            </Loading>
                            ) : data?.length > 0 ? (
                            <MemoisedGeneralTable
                                data={[...data]
                                    ?.sort((a,b) => compareAsc(new Date(b?.createdAt), new Date(a?.createdAt))) 
                                    .map((element) => {
                                    return {
                                        key:element.complyCode,
                                        name:element?.serviceName ? element?.serviceName : "No name ",
                                        serviceId: element.serviceId,
                                        date: format(
                                            new Date(element?.createdAt),
                                            "dd/MM/yyyy"
                                        ),
                                        status: element?.status
                                    }
                                })}
                                columns={columns}
                                normalLastRow
                            />
                            ):
                            (
                                <EmptyContainer>No Data Available</EmptyContainer>
                            )
                        }
                    </TableSection>
                </LeftSection>
                <RightSection>
                    <Calendar onChange={onChange} value={value} />
                </RightSection>
            </MainSection>
            
        </Container>
    )
}

export default UserManagement