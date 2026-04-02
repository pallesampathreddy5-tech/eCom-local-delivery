import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-bottom bg-white sticky-top">
      <div className="container py-3 d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <div className="brand-dot" />
          <strong className="fs-4">LocalBasket</strong>
        </div>
        <nav className="d-none d-lg-flex gap-4 fw-semibold text-secondary">
          <a href="#" className="nav-link p-0">Home</a>
          <a href="#" className="nav-link p-0">Categories</a>
          <a href="#" className="nav-link p-0">Popular</a>
          <a href="#" className="nav-link p-0">Delivery Partner</a>
        </nav>
        <div className="d-flex gap-2">
          <Link to="/login" className="btn btn-outline-success rounded-pill px-4">Login</Link>
          <Link to="/register" className="btn btn-success rounded-pill px-4">Register</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
