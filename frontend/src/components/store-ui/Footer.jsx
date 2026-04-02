import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-wrap py-4 mt-4">
      <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">
        <p className="mb-0 text-secondary">© {new Date().getFullYear()} LocalKart Hyperlocal Platform</p>
        <div className="d-flex gap-3">
          <Link to="/about" className="text-secondary text-decoration-none">About</Link>
          <Link to="/categories" className="text-secondary text-decoration-none">Categories</Link>
          <Link to="/shop" className="text-secondary text-decoration-none">Shop</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
