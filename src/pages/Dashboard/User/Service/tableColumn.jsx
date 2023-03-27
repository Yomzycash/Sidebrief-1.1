import React from 'react'
import { useTable, createColumnHelper } from "@tanstack/react-table";
import { HeadText, BodyText, /*Checkbox,*/ Clickable } from "../../staffDashboard/Businesses/BusinessRegistration/styles";
import { TypeIndicator } from "components/Indicators";
import { useNavigate } from "react-router-dom";
import { useGetAllServicesQuery } from  "services/staffService";
import { userNavigateToDetailPage } from 'utils/globalFunctions';

const ColumnHelper =  createColumnHelper();

const TableActions = () => {
    const navigate = useNavigate();
  
    const clickService = (complyCode) => {
        userNavigateToDetailPage(navigate, complyCode);
    };
  
    return { clickService };
  };


export const columns = [
    ColumnHelper.accessor("name", {
        header: () => <HeadText>Service Name</HeadText>,
        cell : (service) => {
            const { clickService } = TableActions();
            return (
                <Clickable 
                    onClick={() => clickService(service?.row?.original?.complyCode)}>
                    <BodyText>{service.getValue()}</BodyText>
                </Clickable>
            );
            
        },
        
    }),
    ColumnHelper.accessor("type", {
        header: () => <HeadText>Type</HeadText>,
        cell : (service) => {
            const { clickService } = TableActions();
            return (
                <Clickable 
                    onClick={() => clickService(service?.row?.original?.complyCode)}>
                    <BodyText>{service.getValue()}</BodyText>
                </Clickable>
            );
        },
    }),
    ColumnHelper.accessor("country", {
        header: () => <HeadText>Country</HeadText>,
        cell : (service) => {
            const { clickService } = TableActions();
            return (
                <Clickable 
                    onClick={() => clickService(service?.row?.original?.complyCode)}>
                    <BodyText>{service.getValue()}</BodyText>
                </Clickable>
            );
        },
    }),

    ColumnHelper.accessor("date", {
        header: () => <HeadText>Date</HeadText>,
        cell : (service) => {
            const { clickService } = TableActions();
            return (
                <Clickable 
                    onClick={() => clickService(service?.row?.original?.complyCode)}>
                    <BodyText>{service.getValue()}</BodyText>
                </Clickable>
            );
        },
    }),

];
// const TableColumn = () => {
//     const { data } = useGetAllServicesQuery();
//     console.log("myservice", data);

//     const serviceBody = data?.map((service) => [
// 		service?.serviceName,
// 		service?.serviceCategory,
// 		service?.serviceCountry,
// 		service?.createdAt?.split("T")[0]
// 	])

//     console.log("serviceBody", serviceBody)
//     return (
//         <div>tableColumn</div>
//     )
// }

// export default TableColumn;