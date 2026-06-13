import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setRole(data?.role || "user");
    } else {
      setRole("");
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole("");
    navigate("/login");
  };

  return (
    <nav className="custom-navbar">
      <Link className="brand-logo" to="/">
        <span className="brand-red">Furniture</span>
        <span className="brand-blue"> Gallery</span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link className="signup-btn" to="/signup">Sign Up</Link>
          </>
        )}

        {user && role === "user" && (
          <>
            <Link to="/cart">Cart</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}

        {user && role === "admin" && (
          <>
            <Link to="/admin">Admin Panel</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;