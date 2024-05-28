import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import Error from "./UI/Error";

const requestConfig = {};

export default function MealsList() {
  const { data, error, loading } = useHttp('http://localhost:3000/meals', requestConfig, []);

  console.log(data, error, loading);


  if (error) {
    return <Error title='An error occured' message={error} />;
  }

  return (
    <section>
      {loading && <p className="center">Loading...</p>}
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
