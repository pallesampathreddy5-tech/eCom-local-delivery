import RoleDashboardShell from "./RoleDashboardShell";

const ShopDashboardPage = () => {
  return (
    <RoleDashboardShell title="Shopkeeper Dashboard" subtitle="Manage products, inventory, and incoming orders.">
      <div className="row g-3">
        <div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body"><h6>Products</h6><p className="text-secondary mb-0">146 active items</p></div></div></div>
        <div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body"><h6>Preparing Orders</h6><p className="text-secondary mb-0">7 currently preparing</p></div></div></div>
        <div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body"><h6>KYC Status</h6><p className="text-secondary mb-0">Verified</p></div></div></div>
      </div>
    </RoleDashboardShell>
  );
};

export default ShopDashboardPage;
