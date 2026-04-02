import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/LocalKart logo design on white background.png";
import { useAuth } from "../../context/AuthContext";
import { useGuestCart } from "../../context/GuestCartContext";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { summary } = useGuestCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const navClass = ({ isActive }) =>
    `nav-link p-0 fw-semibold ${isActive ? "text-success" : "text-secondary"}`;

  return (
    <header className="border-bottom bg-white sticky-top">
      <div className="container py-3 d-flex justify-content-between align-items-center gap-3">
        <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
          <img src={logo} alt="LocalKart" className="brand-logo" />
        </Link>

        <nav className="d-none d-lg-flex gap-4 align-items-center">
          <NavLink className={navClass} to="/">Home</NavLink>
          <NavLink className={navClass} to="/categories">Categories</NavLink>
          <NavLink className={navClass} to="/about">About Us</NavLink>
          <NavLink className={navClass} to="/shop">Shop</NavLink>
          <NavLink className={navClass} to="/cart">Cart ({summary.totalItems})</NavLink>
        </nav>

        <div className="d-flex gap-2 align-items-center">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="btn btn-outline-success rounded-pill px-4">Login</Link>
              <Link to="/register" className="btn btn-success rounded-pill px-4">Register</Link>
            </>
          ) : (
            <>
              <span className="badge text-bg-light px-3 py-2 d-none d-md-inline">{user?.role}</span>
              <button className="btn btn-outline-danger rounded-pill px-4" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
