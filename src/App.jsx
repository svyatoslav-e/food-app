import Cart from "./components/Cart";
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
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
