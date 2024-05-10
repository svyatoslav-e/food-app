export const fetchMeals = async () => {
  const response = await fetch("http://localhost:3000/meals");
  const data = await response.json();
  return data;
}