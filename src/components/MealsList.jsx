import { useFetch } from "../hooks/useFetch";
import { fetchMeals } from "../api";

// Path: src/components/MealItem.jsx
import MealItem from "./MealItem";

export default function MealsList() {
  const { data, error, loading } = useFetch({
    fetchFn: fetchMeals,
    initialValue: [],
  });

  if (error) {
    return <p>An error occured</p>;
  }

  return (
    <section>
      {loading && <p>Loading...</p>}
      {!loading && data.length === 0 && <p>No meals available</p>}
      {data.length > 0 && (
        <ul id="meals">
          {data.map((meal) => (
            <MealItem key={meal.id} {...meal} />
          ))}
        </ul>
      )}
    </section>
  );
}
