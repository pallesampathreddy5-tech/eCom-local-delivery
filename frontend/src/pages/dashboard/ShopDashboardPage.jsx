import { Link } from "react-router-dom";
import RoleDashboardShell from "./RoleDashboardShell";

const ShopDashboardPage = () => {
  return (
    <RoleDashboardShell title="Shopkeeper Dashboard" subtitle="Manage products and inventory updates.">
      <div className="d-flex gap-2 mb-3">
        <Link className="btn btn-success" to="/shop/products/manage">Manage Products</Link>
      </div>
      <div className="row g-3">
        <div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body"><h6>Product Upload</h6><p className="text-secondary mb-0">Create and list products for your approved shop.</p></div></div></div>
        <div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body"><h6>Inventory</h6><p className="text-secondary mb-0">Update stock count and product pricing.</p></div></div></div>
        <div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body"><h6>Approval</h6><p className="text-secondary mb-0">Shop must be admin-approved before product uploads.</p></div></div></div>
      </div>
    </RoleDashboardShell>
  );
};

export default ShopDashboardPage;
