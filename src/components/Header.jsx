import Logo from "../assets/logo.jpg";

export default function Header() {
  return (
    <header id="main-header">
      <div id="title">
        <img src={Logo} alt="Food Order Logo" />
        <h1>Food Order 💪</h1>
      </div>
      <nav>
        <button>CART (0)</button>
      </nav>
    </header>
  );
}
