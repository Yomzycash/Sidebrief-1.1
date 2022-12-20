import { TextWithArrow } from "components/texts";
import {
  Container,
  Heading,
  Title,
  ViewAllButton,
  Table,
  Head,
  HeadData,
  Row,
  RowData,
  TableContainer,
  BottomText,
  TableHeader,
  FilterButton,
} from "./styles";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { columns, businessesHeader } from "./constants";
import { useState } from "react";
import ActiveNav from "components/navbar/ActiveNav";
import { useLocation, useNavigate } from "react-router-dom";

export const BusinessHomeTable = ({ data, link }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const location = useLocation();
  const navigate = useNavigate();

  let home = location.pathname === "/staff-dashboard/businesses" ? true : false;

  const handleNavigate = () => {
    navigate(link ? link : "");
  };

  return (
    <Container>
      <Heading>
        <div>
          <Title>Business Registrations</Title>
          <ViewAllButton onClick={handleNavigate}>
            <TextWithArrow blue>View All</TextWithArrow>
          </ViewAllButton>
        </div>
        <BottomText>Keep up and track business registrations</BottomText>
      </Heading>
      <TableContainer>
        <TableHeader>
          {businessesHeader.map((header, index) => (
            <ActiveNav
              key={index}
              text={header.text}
              path={header.path}
              defaultActive={index === 0 && home}
            />
          ))}
        </TableHeader>
        <Table>
          <Head>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <HeadData key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </HeadData>
                ))}
              </tr>
            ))}
          </Head>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <RowData key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </RowData>
                ))}
              </Row>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};
