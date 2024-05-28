import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";
import { UserProgressContext } from "../contexts/userProgressContext";
import Logo from "../assets/logo.jpg";
import Button from "./UI/Button";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((acc, item) => acc + item.quantity, 0);

  function handleShowCart() {
    userCtx.showCart();
  } 

  return (
    <header id="main-header">
      <div id="title">
        <img src={Logo} alt="Food Order Logo" />
        <h1>Food Order 💪</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header> 
  );
}
