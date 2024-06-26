
import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";

const MealItem = ({ id, image, name, description, price }) => {
    const cartCtx = useContext(CartContext);

    function handleAddMealToCart()  {
        cartCtx.addToCart({ id, image, name, description, price }); 
    }; 

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
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
