import React, { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { HeadText, BodyText, /*Checkbox,*/ Clickable } from "./styles";
import { TypeIndicator } from "components/Indicators";
import { useNavigate as createNavigate, useLocation } from "react-router-dom";
import { staffNavigateToDetailPage } from "utils/globalFunctions";
import { Checkbox } from "components/Staff/Tables/TeamTable/styles";

const ColumnHelper = createColumnHelper();

export const columns = [
  ColumnHelper.display({
    id: "checkbox",
    header: ({ table }) => {
      return (
        <IndeterminateCheckbox
          checked={table.getIsAllRowsSelected()}
          // indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      );
    },
    cell: ({ row }) => {
      const originalRow = row.original;
      return (
        <IndeterminateCheckbox
          checked={row.getIsSelected()}
          // indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      );
    },
  }),
  ColumnHelper.accessor("name", {
    header: () => <HeadText>Business Name</HeadText>,
    cell: (info) => {
      const navigate = createNavigate();
      const originalRow = info.row.original;

      const launchInfo = {
        launchCode: originalRow.code,
        registrationCountry: originalRow.countryISO,
        registrationType: originalRow.type,
      };

      return (
        <Clickable onClick={() => staffNavigateToDetailPage(navigate, launchInfo)}>
          <BodyText>{info.getValue()}</BodyText>
        </Clickable>
      );
    },
  }),
  ColumnHelper.accessor("type", {
    header: () => <HeadText nopadding>Type</HeadText>,
    cell: (info) => {
      const navigate = createNavigate();
      const originalRow = info.row.original;

      const launchInfo = {
        launchCode: originalRow.code,
        registrationCountry: originalRow.countryISO,
        registrationType: originalRow.type,
      };
      const typeName = info.getValue();
      // const color = businessTypes.find(
      // 	(type) => type.name === typeName
      // ).color;
      return (
        <Clickable onClick={() => staffNavigateToDetailPage(navigate, launchInfo)}>
          <TypeIndicator color={"blue"} type={typeName} />
        </Clickable>
      );
    },
  }),
  ColumnHelper.accessor("country", {
    header: () => <HeadText>Country</HeadText>,
    cell: (info) => {
      const navigate = createNavigate();
      const originalRow = info.row.original;

      const launchInfo = {
        launchCode: originalRow.code,
        registrationCountry: originalRow.countryISO,
        registrationType: originalRow.type,
      };
      return (
        <Clickable onClick={() => staffNavigateToDetailPage(navigate, launchInfo)}>
          <BodyText>{info.getValue()}</BodyText>
        </Clickable>
      );
    },
  }),
  ColumnHelper.accessor("date", {
    header: () => <HeadText>Date</HeadText>,
    cell: (info) => {
      const navigate = createNavigate();
      const originalRow = info.row.original;

      const launchInfo = {
        launchCode: originalRow.code,
        registrationCountry: originalRow.countryISO,
        registrationType: originalRow.type,
      };
      return (
        <Clickable onClick={() => staffNavigateToDetailPage(navigate, launchInfo)}>
          <BodyText>{info.getValue()}</BodyText>
        </Clickable>
      );
    },
  }),
];

const IndeterminateCheckbox = ({ indeterminate, className = "", checked, ...rest }) => {
  const ref = React.useRef(null);
  const { pathname } = useLocation();
  let Shown = pathname.includes("pending");

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !checked && indeterminate;
    }
  }, [ref, indeterminate, checked]);

  return <div>{Shown && <Checkbox type="checkbox" ref={ref} checked={checked} {...rest} />}</div>;
};
