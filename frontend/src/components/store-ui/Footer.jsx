const Footer = () => {
  return (
    <footer className="footer-wrap py-4 mt-4">
      <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">
        <p className="mb-0 text-secondary">© {new Date().getFullYear()} LocalBasket Hyperlocal Platform</p>
        <div className="d-flex gap-3">
          <a href="#" className="text-secondary text-decoration-none">Privacy</a>
          <a href="#" className="text-secondary text-decoration-none">Terms</a>
          <a href="#" className="text-secondary text-decoration-none">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
