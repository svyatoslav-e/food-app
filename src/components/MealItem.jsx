import { currencyFormatter } from "../util/formatting";

const MealItem = ({ image, name, description, price }) => {
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-description">{description}</p>
          <p className="meal-item-price">Price: {currencyFormatter(price)}</p>
        </div>
        <p className="meal-item-actions">
          <button>+</button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
