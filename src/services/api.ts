const apiUrl = import.meta.env.VITE_API_URL;

export const fetchData = async (page: number = 1) => {
  try {
    const response = await fetch(`${apiUrl}?page=${page}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const filteredData = data.data.filter(
      (item: any) =>
        item.year !== null &&
        ["Action", "Comedy", "Sports", "Drama"].includes(item.genres[0]?.name)
    );

    return filteredData;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return [];
  }
};
