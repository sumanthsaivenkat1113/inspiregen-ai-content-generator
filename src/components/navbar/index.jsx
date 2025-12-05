import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

export default function Navbar({
  isBtnReq = true,
  previewBtn = { req: false, label: null, onClick: null },
  generateName = null,
}) {
  const { user, logout, googleLogout } = useAuth();
  const navigate = useNavigate();

  // ⭐ Logout Handler
  const handleLogout = async () => {
    try {
      if (user?.authProvider === "google") {
        await googleLogout();
      } else {
        await logout();
      }

      navigate("/"); // ⭐ Redirect after logout
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link style={{ textDecoration: "none" }} to="/">
          <div className="navbar__brand">InspireGen</div>
          </Link>

        {/* If user NOT logged in */}
        {!user && isBtnReq && (
          <div className="navbar__actions">
            <Link to="/login">
              <button className="navbar__btn navbar__btn--login">Login</button>
            </Link>
            <Link to="/signup">
              <button className="navbar__btn navbar__btn--signup">Sign Up</button>
            </Link>
          </div>
        )}

        

        {/* Preview buttons */}
        {previewBtn.req && (
          <div className="navbar__actions">
            <button
              className="navbar__btn navbar__btn--preview"
              onClick={previewBtn.onClick}
            >
              {previewBtn.label}
            </button>
            <Link to="/generate/content">
              <button className="navbar__btn">
                Generate new {generateName}
              </button>
            </Link>
          </div>
        )}
        {/* If user logged in */}
        {user && (
          <div className="navbar__actions">
            <button
              className="navbar__btn navbar__btn--logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
