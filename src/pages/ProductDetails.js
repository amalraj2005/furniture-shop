import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setProduct(data);
    };

    fetchProduct();
  }, [id]);
    const addToCart = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login first");
    return;
  }

  const { error } = await supabase.from("cart_items").insert([
    {
      user_id: user.id,
      product_id: product.id,
      name: product.name,
      price: product.customer_price,
      image_url: product.image_url,
      quantity: qty,
    },
  ]);

  if (error) {
    alert(error.message);
  } else {
    alert("Added to cart");
  }
};
  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow border-0">
            <img
              src={product.image_url}
              alt={product.name}
              style={{
                width: "100%",
                height: "520px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <h2>{product.name}</h2>

          <p className="text-muted">{product.category}</p>

          <div className="mb-3">
            <span className="text-warning fs-4">★★★★★</span>
            <span className="ms-2 text-muted">56 reviews</span>
          </div>

          <div className="card p-4 shadow-sm mb-4">
            <small className="text-danger fw-bold">SALE PRICE</small>
            <h1>₹{product.customer_price}</h1>
            <p className="text-muted">Inclusive of all taxes</p>
          </div>

          <div className="d-flex align-items-center mb-4">
            <strong className="me-3">QTY</strong>

            <button
              className="btn btn-outline-dark"
              onClick={() => qty > 1 && setQty(qty - 1)}
            >
              -
            </button>

            <span className="mx-3 fs-5">{qty}</span>

            <button
              className="btn btn-outline-dark"
              onClick={() => setQty(qty + 1)}
            >
              +
            </button>
          </div>

          <div className="d-flex gap-3 mb-4">
            <button
                className="btn btn-outline-primary w-50"
                onClick={addToCart}
            >
            Add To Cart
            </button>

            <button className="btn btn-primary w-50">
              Buy It Now
            </button>
          </div>

          <div className="card p-4">
            <h5>Highlights</h5>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;