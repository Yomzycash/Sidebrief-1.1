import React from "react";
import { Puff } from "react-loading-icons";
import { Loading, TableBody, TableContainer, TableHead } from "./styled";

const FeatureTable = ({
  header,
  body,
  onRowClick,
  onClick,
  bodyFullData,
  loading,
  rowCursor,
  headerStyle,
  bodyStyle,
}) => {
  const handleRowClick = (e, index) => {
    if (onRowClick) onRowClick(bodyFullData[index]);
  };

  const handleCellClick = (e, row, column) => {
    if (onClick) onClick(bodyFullData[row], row + 1, column + 1);
  };

  return (
    <>
      {loading ? (
        <Loading>
          <Puff stroke="#00A2D4" />
        </Loading>
      ) : (
        <TableContainer>
          <TableHead style={headerStyle}>
            <tr>
              {header?.map((text, index) => (
                <th key={index}>{text}</th>
              ))}
            </tr>
          </TableHead>
          <TableBody $hasOnClick={onRowClick ? true : false} style={bodyStyle}>
            {body?.map((each, row) => (
              <tr
                key={row}
                onClick={(e) => handleRowClick(e, row)}
                style={{ cursor: rowCursor || "" }}
              >
                {each?.map((el, column) => (
                  <td key={column} onClick={(e) => handleCellClick(e, row, column)}>
                    {el}
                  </td>
                ))}
              </tr>
            ))}
          </TableBody>
        </TableContainer>
      )}
    </>
  );
};

export default FeatureTable;
