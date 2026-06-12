import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

function Category() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [categoryName]);

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

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">{categoryName}</h1>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card shadow h-100">
              {product.image_url && (
                <img
                  src={product.image_url}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: "250px", objectFit: "cover" }}
                />
              )}

              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h6 className="text-success">₹{product.customer_price}</h6>
                <p className="card-text">{product.description}</p>

                <button className="btn btn-dark w-100">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-muted">
          No products available in this category.
        </p>
      )}
    </div>
  );
}

export default Category;