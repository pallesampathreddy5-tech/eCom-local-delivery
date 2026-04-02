const PartnersSection = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="cta-box cta-delivery rounded-5 p-4 p-md-5 h-100">
              <h3 className="fw-bold">Become a Delivery Partner</h3>
              <p className="text-secondary">Flexible slots, transparent earnings, instant payout-ready architecture.</p>
              <button className="btn btn-dark rounded-pill px-4">Apply as Agent</button>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="cta-box cta-shop rounded-5 p-4 p-md-5 h-100">
              <h3 className="fw-bold">Register Your Shop</h3>
              <p className="text-secondary">Onboard your store, manage catalog, and scale local orders with our platform.</p>
              <button className="btn btn-success rounded-pill px-4">Start Selling</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
