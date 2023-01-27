import CopyIcon from "asset/Icons/CopyIcon";
import DownloadIcon from "asset/Icons/DownloadIcon";
import { GladeLogo } from "asset/images";
import React from "react";
import { IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { TableBody, TableContainer, TableHead } from "./styled";

const BankAccountTable = () => {
  const accounts = [
    {
      businessName: "Ayomide Constructions & Sons",
      bankName: "Sterling Bank",
      bankLogo: GladeLogo,
      accountNumber: 3399449933,
    },
    {
      businessName: "Ayomide Constructions & Sons",
      bankName: "Sterling Bank",
      bankLogo: GladeLogo,
      accountNumber: 3399449933,
    },
    {
      businessName: "Ayomide Constructions & Sons",
      bankName: "Sterling Bank",
      bankLogo: GladeLogo,
      accountNumber: 3399449933,
    },
    {
      businessName: "Ayomide Constructions & Sons",
      bankName: "Sterling Bank",
      bankLogo: GladeLogo,
      accountNumber: 3399449933,
    },
  ];

  const handleAccountView = (account) => {};

  return (
    <TableContainer>
      <TableHead>
        <tr>
          <th>Business Name</th>
          <th>Bank Name</th>
          <th>Account Number</th>
          <th></th>
          <th></th>
        </tr>
      </TableHead>
      <TableBody>
        {accounts.map((account) => (
          <tr>
            <td>{account.businessName}</td>
            <td>
              <div>
                <img src={account.bankLogo} alt="" />
                <span>{account.bankName}</span>
              </div>
            </td>
            <td>
              <div style={{ color: "#4E5152" }}>
                <span>{account.accountNumber}</span>
                <CopyIcon size={20} />
              </div>
            </td>
            <td onClick={() => handleAccountView(account)}>
              <Link to="">
                <DownloadIcon size={20} />
                <span style={{ color: "#00A2D4" }}>View account</span>
              </Link>
            </td>
            <td>
              <div>
                <IoMdMore />
              </div>
            </td>
          </tr>
        ))}
      </TableBody>
    </TableContainer>
  );
};

export default BankAccountTable;
