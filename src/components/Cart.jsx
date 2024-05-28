import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";
import { UserProgressContext } from "../contexts/userProgressContext";
import { currencyFormatter } from "../util/formatting";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartItem from "./CartItem";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalCartPrice = cartCtx.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleCheckout() {
    userProgressCtx.showCheckout();
  }
  function handleIncreaseQty(item) {
    cartCtx.addToCart(item);
  }

  function handleDecreaseQty(item) {
    cartCtx.removeFromCart(item.id);
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => handleIncreaseQty(item)}
            onDecrease={() => handleDecreaseQty(item)}
          />
        ))}
      </ul>
      <p className="cart-total">Total: {currencyFormatter(totalCartPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleCheckout}>Checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
