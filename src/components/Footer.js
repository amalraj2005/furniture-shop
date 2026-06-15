import { Link } from "react-router-dom";
import "./Footer.css";
function Footer() {
  return (
    <footer
      style={{
        background: "#111",
        color: "white",
        marginTop: "60px",
        padding: "50px 0",
      }}
    >
      <div className="container">
        <div className="row">

          <div className="col-md-4">
            <h3>Furniture Gallery</h3>
            <p>
              Premium furniture for your dream home.
            </p>
          </div>

          <div className="col-md-3">
            <h5>Popular Categories</h5>
            
            <p><Link to="/category/Sofa Set" className="footer-link">Sofa Set</Link></p>
            <p><Link to="/category/Wardrobe" className="footer-link">Wardrobe</Link></p>
            <p><Link to="/category/Bed" className="footer-link">Bed</Link></p>
            <p><Link to="/category/Dining Table" className="footer-link">Dining Table</Link></p>
            <p><Link to="/category/Chair" className="footer-link">Chair</Link></p>
           
          </div>

          <div className="col-md-2">
            <h5>Quick Links</h5>
            
            <p><Link to="/" className="footer-link">Home</Link></p>
            <p><Link to="/profile" className="footer-link">Profile</Link></p>
            <p><Link to="/cart" className="footer-link">Cart</Link></p>
            <p><Link to="/" className="footer-link">Contact</Link></p>
          </div>

          <div className="col-md-3">
            <h5>Contact</h5>
            <p>📞 +91 00000 00000</p>
            <p>📧 sample@gmail.com</p>
            <p>📍  Palakkad, Kerala</p>
          </div>

        </div>

        <hr />

        <p className="text-center mb-0">
          © 2026 Furniture Gallery. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;