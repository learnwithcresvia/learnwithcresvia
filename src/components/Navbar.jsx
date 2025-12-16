import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

export default function Navbar() {
  const { user, loading } = useAuth();

  const logout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) return null; // wait until auth state loads

  return (
    <nav className="navbar">
      <div className="navbar-left">LearnWithCresvia</div>

      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>

        {user && (
          <>
            <Link to="/study" className="nav-link">Study</Link>
            <Link to="/coding" className="nav-link">Coding</Link>
            <Link to="/xp" className="nav-link">XP</Link>
          </>
        )}

        {user ? (
          <>
            <span className="nav-link">{user.email}</span>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/auth" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
}
