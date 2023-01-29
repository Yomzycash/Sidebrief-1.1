import CopyIcon from "asset/Icons/CopyIcon";
import DownloadIcon from "asset/Icons/DownloadIcon";
import { GladeLogo } from "asset/images";
import React from "react";
import { IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { TableBody, TableContainer, TableHead } from "./styled";

const FeatureTable = ({ header, body }) => {
  const handleAccountView = (account) => {};

  return (
    <TableContainer>
      <TableHead>
        <tr>
          {header?.map((text) => (
            <th>{text}</th>
          ))}
        </tr>
      </TableHead>
      <TableBody>
        {body?.map((account, index) => (
          <tr key={index}>
            {account?.map((el, index) => (
              <td key={index}>{el}</td>
            ))}
          </tr>
        ))}
      </TableBody>
    </TableContainer>
  );
};

export default FeatureTable;
