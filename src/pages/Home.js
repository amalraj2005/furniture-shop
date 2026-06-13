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

    if (!error) {
      setCategories(data);
    }
  };

  return (
    <div>

      {/* HERO SECTION */}
      <div className="hero-section">
        <div className="hero-overlay">

          <div className="logo-symbol">
            <div className="left-shape"></div>
            <div className="right-shape"></div>
          </div>

          <h1 className="hero-title">
            <span className="red-text">FURNITURE</span>
            <br />
            <span className="blue-text">GALLERY</span>
          </h1>

          <p className="hero-subtitle">
            Premium furniture for your dream home
          </p>

<button
  className="shop-btn"
  onClick={() => {
    document
      .getElementById("categories")
      .scrollIntoView({
        behavior: "smooth",
      });
  }}
>
  SHOP NOW
</button>

        </div>
      </div>

      {/* CATEGORY SECTION */}

      <div id="categories" className="container py-5">
        <h2 className="text-center fw-bold mb-5">
          Shop By Category
        </h2>

        <div className="row">
          {categories.map((category) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
              key={category.id}
            >
              <Link
                to={`/category/${category.name}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <div className="category-card">

                  <div className="category-card-body">
                    <h4>{category.name}</h4>
                    <span>Explore Collection →</span>
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