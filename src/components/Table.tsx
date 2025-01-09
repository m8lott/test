import React, { useEffect, useState } from "react";
import { fetchData } from "../services/api";
import { TableData } from "../types/tableData";
import { TableRow } from "./TableRow";
import { TableHeader } from "./TableHeader";
import { Pagination } from "../features/pagination/Pagination";
import { FilterCategory } from "../features/filters/FilterCategory";
import { FilterNumber } from "../features/filters/FilterNumber";
import { sortData } from "../utils/sort";
import { filterByCategory, filterByNumber } from "../utils/filter";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  padding: 20px;
  background: linear-gradient(90deg, #c3d9f7, #636ed6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  min-height: 100vh;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const TableWrapper = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const TableBody = styled.tbody`
  tr {
    &:nth-child(even) {
      background-color: #f5f5f5;
    }
  }
`;

const LoadingText = styled.td`
  text-align: center;
  padding: 16px;
  color: white;
`;

const NoDataText = styled.td`
  text-align: center;
  padding: 16px;
  color: black;
  font-size: 18px;
  font-weight: bold;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #636ed6;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 2s linear infinite;
`;

const Table: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [filteredData, setFilteredData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<string>("category");
  const [ascending, setAscending] = useState<boolean>(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minNumber, setMinNumber] = useState<number>(0);
  const [maxNumber, setMaxNumber] = useState<number>(100);

  const loadData = async (page: number) => {
    setLoading(true);
    const result = await fetchData(page);
    setData(result);
    setFilteredData(result);
    setLoading(false);
  };

  useEffect(() => {
    loadData(page);
  }, [page]);

  useEffect(() => {
    let updatedData = [...data];

    const isCategoryFilterActive = selectedCategories.length > 0;
    const isNumberFilterActive =
      (minNumber !== 0 || maxNumber !== 100) && maxNumber !== 0;

    if (!isCategoryFilterActive && !isNumberFilterActive) {
      setFilteredData(data);
      return;
    }

    if (isCategoryFilterActive) {
      updatedData = filterByCategory(updatedData, selectedCategories);
    }

    if (isNumberFilterActive) {
      updatedData = filterByNumber(updatedData, minNumber, maxNumber);
    }

    updatedData = sortData(updatedData, sortColumn, ascending);

    setFilteredData(updatedData);
  }, [data, selectedCategories, minNumber, maxNumber, sortColumn, ascending]);

  return (
    <Container>
      <HeaderWrapper>
        <FilterCategory
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <FilterWrapper>
          <FilterNumber
            setMinNumber={setMinNumber}
            setMaxNumber={setMaxNumber}
          />
        </FilterWrapper>
      </HeaderWrapper>

      <TableWrapper>
        <TableHeader
          sortColumn={sortColumn}
          setSortColumn={setSortColumn}
          ascending={ascending}
          setAscending={setAscending}
        />
        <TableBody>
          {loading ? (
            <tr>
              <LoadingText colSpan={5}>
                <SpinnerWrapper>
                  <Spinner />
                </SpinnerWrapper>
              </LoadingText>
            </tr>
          ) : filteredData.length === 0 ? (
            <tr>
              <NoDataText colSpan={5}>
                No matching data found based on the applied filters.
              </NoDataText>
            </tr>
          ) : (
            filteredData.map((item) => (
              <TableRow key={item.mal_id} data={item} />
            ))
          )}
        </TableBody>
      </TableWrapper>

      <Pagination page={page} setPage={setPage} />
    </Container>
  );
};

export default Table;
