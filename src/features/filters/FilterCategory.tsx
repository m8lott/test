import React from "react";
import styled from "styled-components";

interface FilterCategoryProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const Container = styled.div`
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-weight: bold;
  margin-bottom: 8px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

export const FilterCategory: React.FC<FilterCategoryProps> = ({
  selectedCategories,
  setSelectedCategories,
}) => {
  const categories = ["Action", "Comedy", "Sports", "Drama"];

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <Container>
      <Title>Category Filter</Title>
      {categories.map((category) => (
        <Label key={category}>
          <Checkbox
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
          />
          {category}
        </Label>
      ))}
    </Container>
  );
};
