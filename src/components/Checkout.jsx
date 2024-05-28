import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";
import { UserProgressContext } from "../contexts/userProgressContext";
import { currencyFormatter } from "../util/formatting";
import useHttp from "../hooks/useHttp";
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Error from "./UI/Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalCartPrice = cartCtx.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const {
    data,
    error,
    loading: isSending,
    sendRequest,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest({
      order: {
        customer: customerData,
        items: cartCtx.items,
      },
    });
  }

  function handleFinishCheckout() {
    cartCtx.clearCart();
    userProgressCtx.hideCheckout();
  }

  if (data && !error) {
    return ( 
      <Modal
        className="checkout"
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinishCheckout}
      >
        <h2>Order Submitted</h2>
        <p>Your order was submitted successully</p>
        <p>We will get back to you with more details via email within the next few minutes</p>
        <div className="modal-actions">
          <Button onClick={handleFinishCheckout}>Ok</Button>
        </div>
      </Modal>
    );
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

        <div className="modal-actions">
          {isSending && <p>Sending order data...</p>}
          {!isSending && (
            <>
              <Button type="button" textOnly onClick={handleCloseCheckout}>
                Cancel
              </Button>
              <Button>Submit Order</Button>
            </>
          )}
        </div>
        {error && <Error title="Error to submit order" message={error} />}
      </form>
    </Modal>
  );
}
