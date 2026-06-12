import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase";
import "./Home.css";

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*");

    if (error) {
      console.log(error);
    } else {
      setCategories(data);
    }
  };

  return (
    <div>
      <div className="hero-section">
        <div className="overlay">
          <h1>Luxury Furniture Collection</h1>
          <p>Transform your living space with premium furniture.</p>
          <button className="btn btn-warning btn-lg">
            Explore Collection
          </button>
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4">Shop By Category</h2>

        <div className="row">
          {categories.map((category) => (
            <div className="col-md-3 mb-4" key={category.id}>
              <Link
                to={`/category/${category.name}`}
                style={{ textDecoration: "none" }}
              >
                <div className="card shadow border-0 h-100">
                  <div className="card-body text-center">
                    <h5>{category.name}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;