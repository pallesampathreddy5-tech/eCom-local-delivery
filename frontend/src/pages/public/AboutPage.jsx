import Header from "../../components/store-ui/Header";
import Footer from "../../components/store-ui/Footer";

const AboutPage = () => {
  return (
    <div className="storefront-shell">
      <Header />
      <main className="container py-5">
        <h1 className="fw-bold mb-3">About LocalKart</h1>
        <p className="text-secondary fs-5">LocalKart is a hyperlocal marketplace connecting customers, neighborhood stores, and delivery partners in one platform.</p>

        <div className="row g-3 mt-2">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5>1. Discover Nearby Stores</h5>
                <p className="text-secondary mb-0">Customers browse products by categories and local availability.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5>2. Place Order Instantly</h5>
                <p className="text-secondary mb-0">Shops receive orders, prepare items, and update statuses.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h5>3. Delivery to Doorstep</h5>
                <p className="text-secondary mb-0">Verified delivery partners pick up and deliver quickly with tracking.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
