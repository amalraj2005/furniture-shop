import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";

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
    <div className="container mt-5">
      <h1 className="mb-4 text-center">{categoryName}</h1>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card shadow h-100">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
              )}

<div className="card-body">
  <h5>{product.name}</h5>
  <p>₹{product.customer_price}</p>
  <p>{product.description}</p>

  <Link
    to={`/product/${product.id}`}
    className="btn btn-dark w-100"
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