import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import MealsList from "./components/MealsList";
import { CartContextProvider } from "./contexts/cartContext";
import { UserProgressContextProvider } from "./contexts/userProgressContext";

function App() {
  return (
    <UserProgressContextProvider> 
      <CartContextProvider>
        <Header />
        <main>
          <MealsList />
        </main>
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
