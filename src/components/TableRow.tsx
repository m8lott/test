import React from "react";
import { TableData } from "../types/tableData";
import styled from "styled-components";

interface TableRowProps {
  data: TableData;
}

const TableCell = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ccc;
`;

export const TableRow: React.FC<TableRowProps> = ({ data }) => {
  return (
    <tr>
      <TableCell>{data.title}</TableCell>
      <TableCell>{data.year}</TableCell>
      <TableCell>{data.genres[0].name}</TableCell>
    </tr>
  );
};
