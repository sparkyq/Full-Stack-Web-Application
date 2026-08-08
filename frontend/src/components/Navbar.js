import "../styles/navbar.css";
import { Link } from "react-router-dom";

function Navbar({
  cartCount,
  openCart,
}) {

  const username =
    localStorage.getItem(
      "username"
    );

  const logout = () => {

    localStorage.removeItem(
      "access"
    );

    localStorage.removeItem(
      "refresh"
    );

    localStorage.removeItem(
      "username"
    );

    window.location.reload();
  };

  return (
    <nav className="navbar">

      <h2>E-Commerce System</h2>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/analytics">
          Analytics
        </Link>

        {username ? (
          <>
            <span className="user-greeting">
              Hello, {username}
            </span>

            <button
              className="logout-btn"
              onClick={logout}
            >
             Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

        <div
          className="cart-icon"
          onClick={openCart}
        >
          🛒
          <span>
            {cartCount}
          </span>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;