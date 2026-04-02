const HeroSection = () => {
  return (
    <section className="hero-wrap py-5">
      <div className="container py-4">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <span className="badge bg-light text-success mb-3 px-3 py-2">Hyperlocal Delivery in Minutes</span>
            <h1 className="display-4 fw-bold lh-sm mb-3">Fresh groceries and essentials from nearby shops.</h1>
            <p className="text-secondary fs-5 mb-4">Discover trusted neighborhood stores, compare products, and get same-day delivery with live tracking.</p>
            <div className="d-flex flex-wrap gap-3">
              <button className="btn btn-success btn-lg rounded-pill px-4">Shop Now</button>
              <button className="btn btn-outline-dark btn-lg rounded-pill px-4">Explore Shops</button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-card p-4 p-md-5 rounded-5">
              <h5 className="fw-bold">Today&apos;s Top Picks</h5>
              <ul className="list-unstyled mb-0 mt-3">
                <li className="d-flex justify-content-between py-2 border-bottom"><span>Farm Fresh Vegetables</span><strong>From Rs 99</strong></li>
                <li className="d-flex justify-content-between py-2 border-bottom"><span>Dairy Essentials</span><strong>From Rs 149</strong></li>
                <li className="d-flex justify-content-between py-2"><span>Bakery and Snacks</span><strong>From Rs 79</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
