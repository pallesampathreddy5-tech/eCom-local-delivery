import RoleDashboardShell from "./RoleDashboardShell";

const DeliveryDashboardPage = () => {
  return (
    <RoleDashboardShell title="Delivery Dashboard" subtitle="Accept requests, update delivery status, and upload proof.">
      <div className="row g-3">
        <div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body"><h6>Available Requests</h6><p className="text-secondary mb-0">9 open deliveries</p></div></div></div>
        <div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body"><h6>Accepted Today</h6><p className="text-secondary mb-0">4 deliveries</p></div></div></div>
        <div className="col-md-4"><div className="card border-0 shadow-sm"><div className="card-body"><h6>Earnings</h6><p className="text-secondary mb-0">Rs 1,120 today</p></div></div></div>
      </div>
    </RoleDashboardShell>
  );
};

export default DeliveryDashboardPage;
