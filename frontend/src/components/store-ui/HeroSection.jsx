import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="hero-wrap py-5">
      <div className="container py-4">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <span className="badge bg-light text-success mb-3 px-3 py-2">Hyperlocal Delivery in Minutes</span>
            <h1 className="display-4 fw-bold lh-sm mb-3">From local stores to your home doorstep.</h1>
            <p className="text-secondary fs-5 mb-4">Shop groceries and essentials from nearby shops and get deliveries powered by trusted delivery partners.</p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/shop" className="btn btn-success btn-lg rounded-pill px-4">Start Shopping</Link>
              <Link to="/about" className="btn btn-outline-dark btn-lg rounded-pill px-4">How It Works</Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-card p-4 p-md-5 rounded-5">
              <h5 className="fw-bold">Why LocalKart</h5>
              <ul className="list-unstyled mb-0 mt-3">
                <li className="d-flex justify-content-between py-2 border-bottom"><span>Local shop support</span><strong>100% Nearby</strong></li>
                <li className="d-flex justify-content-between py-2 border-bottom"><span>Live order workflow</span><strong>Trackable</strong></li>
                <li className="d-flex justify-content-between py-2"><span>Delivery partner network</span><strong>Fast & reliable</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
