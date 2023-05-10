import React from 'react'
import styled from "styled-components";
import CircleChart from './CirlceChart';
import { Puff } from "react-loading-icons";

import {
    useGetAllLaunchQuery,
    useGetApprovedLaunchQuery,
    useGetDraftLaunchQuery,
    useGetRejectedLaunchQuery,
    useGetSubmittedLaunchQuery,
} from "services/staffService";
import { useLocation } from "react-router-dom";
import { Circle } from 'components/Indicators/progressbar/styled';

const StaffMobileStatusCard = ({
    percentageValue,
    text,
    number,
    loading,
    analytics,
    staff, 
    noTotal,
    totalApplications=150,
    // rejectedApplications=70
}) => {
    
    const numberOrNull = (number) => {
		return number ? number : "--";
	};
    // const allLaunches = useGetAllLaunchQuery();
    // const allSubmittedLaunches = useGetSubmittedLaunchQuery();
    // const allApprovedLaunches = useGetApprovedLaunchQuery();
    // const allRejectedLaunches = useGetRejectedLaunchQuery();
    // const allDraftLaunches = useGetDraftLaunchQuery();
    
    // const allUsers = useGetAllUsersQuery();

const LaunchStatusCard = ({info, data, text}) => {
    <Wrapper>
        {loading ? (
                <Loader>
                    <Puff stroke="#00A2D4" />
                </Loader>
                ):( 
                    <CircleChart info />
                )
            }
            <Middle>{numberOrNull(data)}</Middle>
            <p>{text}</p>
    </Wrapper>
}
  return (
    <Container>
        {/* <Wrapper>
            {loading ? (
                <Loader>
                    <Puff stroke="#00A2D4" />
                </Loader>
                ):( 
                    <CircleChart totalApplications={totalApplications}  />
                )
            }
            <Middle> { numberOrNull(allLaunches?.data?.length || 0)} </Middle>
            <p>Total</p>   
        </Wrapper>
        <Wrapper>
        {loading ? (
                <Loader>
                    <Puff stroke="#00A2D4" />
                </Loader>
                ):( 
                    <CircleChart totalApplications={totalApplications}  />
                )
            }
            <Middle> { numberOrNull(allDraftLaunches?.data?.length || 0)} </Middle>
            <p>Drafts</p>
        </Wrapper>
        <Wrapper>
        {loading ? (
                <Loader>
                    <Puff stroke="#00A2D4" />
                </Loader>
                ):( 
                    <CircleChart totalApplications={totalApplications}  />
                )
            }
            <Middle> { numberOrNull(allSubmittedLaunches?.data?.length || 0)} </Middle>
            <p>Pending</p>
        </Wrapper> */}
        <LaunchStatusCard
            text="Total"
        />
        <LaunchStatusCard
            text="Drafts"
        />
         <LaunchStatusCard
            text="Pending"
        />
    </Container>
  )
}
// total, drafts, pending ,approved, rejetced
export default StaffMobileStatusCard
const Container = styled.div`
    display: flex;
	width: 100%;
	flex-direction: row;
	align-items: flex-start;
	padding: 20px;
	gap: 24px;
`


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 155px;
    height: 175px;
    background-color: #ffffff;
    border: 1px solid #EDF1F7;
    border-radius: 4px;
    padding: 20px;
`
const Middle = styled.div`
    font-weight: 500;
    font-size: clamp(12px, 1.2vw, 14px);
    line-height: 21px;
    letter-spacing: -0.01em;
    color: #4e5152;
    padding-top: 30px;
`

const Indicator = styled.div`
  display: flex;
  justify-content: center;
`;


const Loader = styled(Indicator)`
  width: 100%;
`;
