import Header from "./components/Header";
import MealsList from "./components/MealsList";
import { CartContextProvider } from "./contexts/cartContext";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <main>
        <MealsList />
      </main>
    </CartContextProvider>
  );
}

export default App;
