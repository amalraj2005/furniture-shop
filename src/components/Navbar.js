import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        Furniture Shop
      </Link>

      <div className="ms-auto">
        <Link className="btn btn-outline-light me-2" to="/">
          Home
        </Link>

        {!user && (
          <>
            <Link className="btn btn-outline-warning me-2" to="/login">
              Login
            </Link>

            <Link className="btn btn-warning" to="/signup">
              Sign Up
            </Link>
          </>
        )}

        {user && role === "user" && (
          <>
            <Link className="btn btn-outline-info me-2" to="/cart">
              Cart
            </Link>

            <Link className="btn btn-outline-light me-2" to="/profile">
              Profile
            </Link>

            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </>
        )}

        {user && role === "admin" && (
          <>
            <Link className="btn btn-outline-warning me-2" to="/admin">
              Admin Panel
            </Link>

            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;