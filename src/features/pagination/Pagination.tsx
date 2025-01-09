import React from "react";
import styled from "styled-components";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
}

const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid #d1d1d1;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #f9f9f9;
  }
`;

const PageNumber = styled.span`
  margin: 0 16px;
  font-size: 16px;
  font-weight: 600;
`;

export const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => {
  return (
    <Container>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </Button>
      <PageNumber>Page {page}</PageNumber>
      <Button onClick={() => setPage(page + 1)}>Next</Button>
    </Container>
  );
};
