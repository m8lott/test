import React from "react";
import styled from "styled-components";

interface FilterNumberProps {
  setMinNumber: (min: number) => void;
  setMaxNumber: (max: number) => void;
}

const Container = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  width: 45%;
  transition: border 0.3s ease;

  &:focus {
    border-color: #636ed6;
  }

  /* Remove increment and decrement arrows */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const FilterNumber: React.FC<FilterNumberProps> = ({
  setMinNumber,
  setMaxNumber,
}) => {
  return (
    <Container>
      <Title>Filter by Year</Title>
      <InputWrapper>
        <Input
          type="number"
          placeholder="Min Year"
          onChange={(e) => setMinNumber(Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Max Year"
          onChange={(e) => setMaxNumber(Number(e.target.value))}
        />
      </InputWrapper>
    </Container>
  );
};
