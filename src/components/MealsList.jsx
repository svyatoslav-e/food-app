import { useFetch } from "../hooks/useFetch";
import { fetchMeals } from "../api";

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
            <li key={meal.id} className="meal-item">
                <h3>{meal.name}</h3>
                <img
                  src={`http://localhost:3000/${meal.image}`}
                  alt={meal.name}
                />
                <p className="meal-item-description">{meal.description}</p>
                <p className="meal-item-price">Price: ${meal.price}</p>
                <div className="meal-item-actions">
                  <button>+</button>
                </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
