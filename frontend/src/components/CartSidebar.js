import "../styles/cart.css";
import API from "../services/api";

function CartSidebar({
  cart,
  setCart,
  closeCart,
}) {

  const removeItem = (index) => {

    const updatedCart =
      cart.filter(
        (_, i) => i !== index
      );

    setCart(updatedCart);
  };

  const createOrder = async () => {

    const token =
      localStorage.getItem("access");

    try {

      await API.post(
        "orders/create/",
        {
          cart: cart.map(item => ({
            id: item.id,
            quantity: 1
          }))
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Order created successfully!"
      );

      setCart([]);

    } catch (error) {

      alert(
        "Login required"
      );
    }
  };

  return (
    <div className="cart-sidebar">

      <div className="cart-header">

        <h2>Shopping Cart</h2>

        <button onClick={closeCart}>
          ✖
        </button>

      </div>

      {cart.length === 0 ? (

        <p>Cart is empty</p>

      ) : (

        <>
          {cart.map((item, index) => (

            <div
              className="cart-item"
              key={index}
            >
              <h4>{item.name}</h4>

              <p>{item.price}₴</p>

              <button
                className="remove-btn"
                onClick={() =>
                  removeItem(index)
                }
              >
                Remove
              </button>

            </div>

          ))}

          <button
            className="checkout-btn"
            onClick={createOrder}
          >
            Checkout
          </button>
        </>

      )}

    </div>
  );
}

export default CartSidebar;