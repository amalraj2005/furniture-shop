import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Profile() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email || "");
    };

    getUser();
  }, []);

  return (
    <div className="container mt-5">
      <h2>My Profile</h2>
      <p>Email: {email}</p>
    </div>
  );
}

export default Profile;