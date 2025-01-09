import React from "react";
import styled from "styled-components";

interface TableHeaderProps {
  sortColumn: string;
  setSortColumn: (column: string) => void;
  ascending: boolean;
  setAscending: (ascending: boolean) => void;
}

const HeaderCell = styled.th`
  cursor: pointer;
  padding: 12px;
  text-align: left;
  font-weight: bold;
`;

const TableHeaderWrapper = styled.thead`
  background-color: #282c34;
  color: white;
`;

export const TableHeader: React.FC<TableHeaderProps> = ({
  sortColumn,
  setSortColumn,
  ascending,
  setAscending,
}) => {
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setAscending(!ascending);
    } else {
      setSortColumn(column);
      setAscending(true);
    }
  };

  return (
    <TableHeaderWrapper>
      <tr>
        <HeaderCell onClick={() => handleSort("category")}>Title</HeaderCell>
        <HeaderCell onClick={() => handleSort("date")}>Year</HeaderCell>
        <HeaderCell onClick={() => handleSort("category")}>Category</HeaderCell>
      </tr>
    </TableHeaderWrapper>
  );
};
