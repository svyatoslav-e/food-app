import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";
import { UserProgressContext } from "../contexts/userProgressContext";
import { currencyFormatter } from "../util/formatting";
import Modal from "./UI/Modal";
import Button from "./UI/Button";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalCartPrice = cartCtx.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.id}>{item.name} - {item.quantity}</li>
        ))}
      </ul>
      <p className="cart-total">Total: {currencyFormatter(totalCartPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>Close</Button>
        <Button onClick={handleCheckout}>Checkout</Button>  
      </p>
    </Modal>
  );
};

export default Cart;
 