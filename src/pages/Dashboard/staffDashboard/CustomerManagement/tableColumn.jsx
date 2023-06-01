import React, { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { TypeIndicator } from "components/Indicators";
import { useNavigate as createNavigate, useLocation, useNavigate } from "react-router-dom";
import { staffNavigateToDetailPage } from "utils/globalFunctions";
import numeral from "numeral";
import { ReactComponent as DeleteIcon } from "asset/svg/delete.svg";
import { ReactComponent as EditIcon } from "asset/svg/Edit.svg";
import { BsThreeDotsVertical } from "react-icons/bs";
import styled from "styled-components";

const ColumnHelper = createColumnHelper();

const ActionColumn= () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openCellIndex, setOpenCellIndex] = useState(null);

  const handleCellClick = (index) => {
    setOpenCellIndex(index === openCellIndex ? null : index);
  };
  
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <Clickable>
        <BodyText onClick={toggleMenu}>
          <BsThreeDotsVertical />
        </BodyText>
        {isOpen && (
          <EditAction>
            <div>
                <EditIcon/>
                Edit
            </div>
            <div>
                <DeleteIcon/>
                Delete
            </div>
          </EditAction>
        )}
      </Clickable>
    );
  };

const TableActions = () => { 
    const navigate = useNavigate();

    const clickService = () => {
        
    }

    return { clickService }
}

export const columns = [
    ColumnHelper.accessor((row) => row.id, {
    id: "S/N",
    header: ({ header }) => {
        return <HeadText>{header.id}</HeadText>;
    },
    cell: (info) => <BodyText>{numeral(info.row.index + 1).format("00")}</BodyText>,
    }),
  ColumnHelper.accessor("name", {
    header: () => <HeadText>Name</HeadText>,
    cell: (info) => {
        const { clickService } = TableActions();
        return (
            <Clickable>
                <BodyText>{info.getValue()}</BodyText>
            </Clickable>
        );
    },
  }),

  ColumnHelper.accessor("serviceId", {
    header: () => <HeadText>Service ID</HeadText>,
    cell: (info) => {
      const { clickService } = TableActions();
      return (
        <Clickable onClick={() => clickService(info.row.original.complyCode)}>
          <BodyText>{info.getValue()}</BodyText>
        </Clickable>
      );
    },
  }),


  ColumnHelper.accessor("status", {
    header: () => <HeadText>Status</HeadText>,
    cell: (info) => {
        const { clickService } = TableActions();
        return (
            <Clickable>
                <BodyText>{info.getValue()}</BodyText>
            </Clickable>
        );
    }
  }),




  ColumnHelper.accessor("date", {
    header: () => <HeadText>Date</HeadText>,
    cell: (info) => {
        const { clickService } = TableActions();
        return (
            <Clickable>
                <BodyText>{info.getValue()}</BodyText>
            </Clickable>
        );
    }
  }),

  ColumnHelper.accessor("action", {
    header: () => <HeadText>Action</HeadText>,
    cell: ActionColumn
  }),

];

const HeadText = styled.h5`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 131%;
  letter-spacing: 0.02em;
  padding-inline: ${({ nopadding }) => (nopadding ? `0` : `24px`)};

  color: #151717;
`;

const BodyText = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 131%;
  letter-spacing: 0.02em;
  padding-inline: 24px;

  color: #151717;

  // background-color: blueviolet;
`;

const Clickable = styled.button`
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
`;

const EditAction = styled.div`
    width:100%;
    height:70px;
    display:flex;
    flex-direction:column;
    gap:10px;
    padding:5x;
    background:#fff;
    border:1px solid #9596971a;
    border-radius:.5em;
    color:#000;
    box-shadow: 0px 20px 25px -5px #9596971a;

    > div {
        display:flex;
        justify-content:center;
        align-items:center;
        gap:8px;
    }


`