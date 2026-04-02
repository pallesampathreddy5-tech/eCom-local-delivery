import { useNavigate } from "react-router-dom";
import RoleDashboardShell from "./RoleDashboardShell";
import CustomerNav from "../../components/customer/CustomerNav";

const CustomerDashboardPage = () => {
  const navigate = useNavigate();

  return (
    <RoleDashboardShell title="Customer Dashboard" subtitle="Browse products, manage cart, and complete checkout/payment.">
      <CustomerNav />
      <div className="row g-3">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-grid">
              <h6>Browse by Category</h6>
              <p className="text-secondary mb-3">Explore dummy catalog from backend JSON.</p>
              <button className="btn btn-success mt-auto" onClick={() => navigate("/customer/shop")}>Start Shopping</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-grid">
              <h6>Manage Cart</h6>
              <p className="text-secondary mb-3">Update quantities and remove products before checkout.</p>
              <button className="btn btn-outline-success mt-auto" onClick={() => navigate("/customer/cart")}>Open Cart</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body d-grid">
              <h6>Checkout & Payment</h6>
              <p className="text-secondary mb-3">Place order and simulate online payment verification.</p>
              <button className="btn btn-outline-dark mt-auto" onClick={() => navigate("/customer/checkout")}>Go to Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </RoleDashboardShell>
  );
};

export default CustomerDashboardPage;
