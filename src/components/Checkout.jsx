import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";
import { UserProgressContext } from "../contexts/userProgressContext";
import { currencyFormatter } from "../util/formatting";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalCartPrice = cartCtx.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            },
        }),
    })
  }

  return (
    <Modal
      className="checkout"
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form onSubmit={handleFormSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter(totalCartPrice)}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="E-mail Adress" id="email" type="email" />
        <Input label="Street" id="street" type="street" />
        <div className="control-row">
          <Input label="City" id="city" type="text" />
          <Input label="Postal Code" id="postal-code" type="text" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleCloseCheckout}>
            Cancel
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
