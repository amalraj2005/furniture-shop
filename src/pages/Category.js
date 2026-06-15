import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";
import "./Category.css";

function Category() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", categoryName);

      if (error) {
        console.log(error);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>{categoryName}</h1>
        <p>{products.length} Products Available</p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="product-img"
              />
            )}

            <div className="product-info">
              <h3>{product.name}</h3>

              <p className="product-description">
                {product.description}
              </p>

              <div className="product-footer">
                <span className="price">
                  ₹{product.customer_price}
                </span>

                <Link
                  to={`/product/${product.id}`}
                  className="view-btn"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;