import React from "react";
import { GiConsoleController } from "react-icons/gi";
import { TableBody, TableContainer, TableHead } from "./styled";

const FeatureTable = ({ header, body, onRowClick }) => {
  return (
    <TableContainer>
      <TableHead>
        <tr>
          {header?.map((text, index) => (
            <th key={index}>{text}</th>
          ))}
        </tr>
      </TableHead>
      <TableBody $hasOnClick={onRowClick ? true : false}>
        {body?.map((each, index) => (
          <tr key={index} onClick={() => onRowClick(each)}>
            {each?.map((el, index) => (
              <td key={index}>{el}</td>
            ))}
          </tr>
        ))}
      </TableBody>
    </TableContainer>
  );
};

export default FeatureTable;
