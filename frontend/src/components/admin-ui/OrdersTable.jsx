const rows = [
  { id: "ORD-99231", customer: "Rahul Verma", shop: "Fresh Point", status: "READY_FOR_PICKUP", total: "Rs 420" },
  { id: "ORD-99232", customer: "Anita Rao", shop: "Quick Mart", status: "OUT_FOR_DELIVERY", total: "Rs 890" },
  { id: "ORD-99233", customer: "Karan Singh", shop: "Daily Basket", status: "PAYMENT_PENDING", total: "Rs 1,240" },
  { id: "ORD-99234", customer: "Neha Das", shop: "Green Valley", status: "DELIVERED", total: "Rs 560" }
];

const OrdersTable = () => {
  return (
    <div className="table-card rounded-4 p-3 p-lg-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-bold mb-0">Recent Orders</h5>
        <button className="btn btn-sm btn-outline-primary">View All</button>
      </div>
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Shop</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="fw-semibold">{row.id}</td>
                <td>{row.customer}</td>
                <td>{row.shop}</td>
                <td><span className="badge status-pill">{row.status}</span></td>
                <td className="fw-semibold">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
