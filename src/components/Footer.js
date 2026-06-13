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
            <p>Sofa Set</p>
            <p>Wardrobe</p>
            <p>Bed</p>
            <p>Dining Table</p>
            <p>Chair</p>
          </div>

          <div className="col-md-2">
            <h5>Quick Links</h5>
            <p>Home</p>
            <p>Profile</p>
            <p>Cart</p>
            <p>Contact</p>
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