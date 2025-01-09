export const filterByCategory = (data: any[], selectedCategories: string[]) => {
  return data.filter((item) =>
    selectedCategories.includes(item.genres[0].name)
  );
};

export const filterByNumber = (data: any[], min: number, max: number) => {
  const filtered = data.filter((item) => item.year >= min && item.year <= max);

  return filtered;
};
