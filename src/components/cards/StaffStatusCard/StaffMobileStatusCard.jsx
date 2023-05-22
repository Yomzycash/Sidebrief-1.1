import React from 'react'
import styled from "styled-components";
import CircleChart from './CirlceChart';
import { Puff } from "react-loading-icons";
import { Donut } from "components/cards/businessesChart/Donut"
import Status from "components/cards/businessesChart/Status"
import {
    useGetAllLaunchQuery,
    useGetApprovedLaunchQuery,
    useGetDraftLaunchQuery,
    useGetRejectedLaunchQuery,
    useGetSubmittedLaunchQuery,
} from "services/staffService";

const StaffMobileStatusCard = ({ loading, analytics,  staff,  noTotal,}) => {
    
    const numberOrNull = (number) => {
		return number ? number : "--";
	};
    const allLaunches = useGetAllLaunchQuery();
    const allSubmittedLaunches = useGetSubmittedLaunchQuery();
    const allDraftLaunches = useGetDraftLaunchQuery();

    
    
    // const allUsers = useGetAllUsersQuery();
// let totalApplications = 200
// const LaunchStatusCard = ({info, data, text}) => {
//     <Wrapper>
//         {loading ? (
//                 <Loader>
//                     <Puff stroke="#00A2D4" />
//                 </Loader>
//                 ):( 
//                     <CircleChart info />
//                 )
//             }
//             <Middle>{numberOrNull(data)}</Middle>
//             <p>{text}</p>
//     </Wrapper>
// }
//  const DashboardMetric = () => {
//     <Indicator>
//         {loading ? (
//             <Loader>
//                 <Puff stroke="#00A2D4" />
//             </Loader>
//         ): (
//             <Donut analytics={analytics} staff={staff} noTotal/>
//         )}
//     </Indicator>
//  }
  return (
    <Container>
        {/* <Wrapper>
            {loading ? (
                <Loader>
                    <Puff stroke="#00A2D4" />
                </Loader>
                ):( 
                    <CircleChart totalApplications={allDraftLaunches?.data?.length || 0}  />
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
                <>
                    <CircleChart pendingApplications={allDraftLaunches?.data?.length || 0}  />
                    <Middle> { numberOrNull(allDraftLaunches?.data?.length || 0)} </Middle>
                    <p>Drafts</p>
                </>  
            )
        }
          {loading ? (
                <Loader>
                    <Puff stroke="#00A2D4" />
                </Loader>
                ):( 
                    <CircleChart submittedApplications={allSubmittedLaunches?.data?.length || 0}  />
                )
            }
            <Middle> { numberOrNull(allSubmittedLaunches?.data?.length || 0)} </Middle>
            <p>Pending</p>
            
        </Wrapper>
        <Wrapper>
        {loading ? (
                <Loader>
                    <Puff stroke="#00A2D4" />
                </Loader>
                ):( 
                    <CircleChart submittedApplications={allSubmittedLaunches?.data?.length || 0}  />
                    
                )
            }
            <Middle> { numberOrNull(allSubmittedLaunches?.data?.length || 0)} </Middle>
            <p>Pending</p>
        </Wrapper> */}
            <Indicator>
            {loading ? (
                <Loader>
                    <Puff stroke="#00A2D4" />
                </Loader>
            ): (
                <Donut analytics={analytics} staff={staff} noTotal/>
            )}
        </Indicator>
        <Bottom>
        {analytics.data.map((status, i) => (
          <Status
            key={i}
            number={status.total}
            text={status.text}
            color={status.color}
            staff={staff}
          />
        ))}
      </Bottom>
    </Container>
  )
}
// total, drafts, pending ,approved, rejetced
export default StaffMobileStatusCard
const Container = styled.div`
    // display: flex;
	// width: 100%;
	// flex-direction: row;
	// align-items: flex-start;
	// padding: 20px;
	// gap: 24px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    align-items: center;
    flex: 1;
    min-width: clamp(350px, 25vw, 700px);
    min-height: 264px;
    border-radius: 16px;
    padding: 24px;
    background-color: white;
    border: 1px solid #edf1f6;
    box-shadow: 0 10px 10px -5px #95969714;
    background-color: ${({ staff }) => (staff ? "#00A2D4" : "")};

    @media screen and (max-width: 760px) {
        min-width: 300px;
    }
`;


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

const Bottom = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: flex-start;
  gap: 4px;
  width: 100%;
`;