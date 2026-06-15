import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const heroImages = [
    "/images/hero1.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const categories = [
    { name: "Sofa Set", image: "/images/sofa set.jpg" },
    { name: "Wardrobe", image: "/images/wardrobe.jpg" },
    { name: "Beds", image: "/images/bed.jpg" },
    { name: "Dining Table", image: "/images/dining.jpg" },
    { name: "Office Furniture", image: "/images/office.jpg" },
    { name: "Chair", image: "/images/chair.jpg" },
  ];

  return (
    <div className="home">
      {/* <nav className="navbar">
        <h2>
          <span>Furniture</span> Gallery
        </h2>

        <div>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin Panel</Link>
          <Link to="/login">Logout</Link>
        </div>
      </nav> */}

<section
  className="hero-banner"
  style={{
    backgroundImage: `url(${heroImages[currentImage]})`,
  }}
>
  <div className="hero-shade">
    <p className="tag">Heavy Savings Ahead</p>
    <h1>Style your Interiers</h1>
    <p>Explore sofas, wardrobes, beds, dining sets and more.</p>
    <button>Shop Now</button>
  </div>
</section>
      <section className="category-section">
        <h2>Explore Categories</h2>

        <div className="category-grid">
          {categories.map((cat) => (
            <Link
              to={`/category/${cat.name}`}
              className="category-card"
              key={cat.name}
            >
              <img src={cat.image} alt={cat.name} className="category-img" />
              <h3>{cat.name}</h3>
              <p>View Products</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;