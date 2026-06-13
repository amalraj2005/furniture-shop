import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id);

    if (!error) {
      setCartItems(data);
    }
  };

  const removeFromCart = async (id) => {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchCartItems();
    }
  };

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Cart</h2>

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      {cartItems.map((item) => (
        <div className="card mb-3 p-3 shadow-sm" key={item.id}>
          <div className="row align-items-center">
            <div className="col-md-3">
              <img
                src={item.image_url}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="col-md-6">
              <h5>{item.name}</h5>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </div>

            <div className="col-md-3">
              <h5>Total: ₹{item.price * item.quantity}</h5>

              <button
                className="btn btn-danger mt-2"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div className="card p-4 mt-4 shadow">
          <h3>Grand Total: ₹{grandTotal}</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;