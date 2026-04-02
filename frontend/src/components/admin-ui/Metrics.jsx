const metrics = [
  { title: "Total Orders", value: "12,430", trend: "+8.4%" },
  { title: "Pending Approvals", value: "186", trend: "-2.3%" },
  { title: "Active Delivery Agents", value: "942", trend: "+4.1%" },
  { title: "Today Revenue", value: "Rs 8.7L", trend: "+12.7%" }
];

const Metrics = () => {
  return (
    <div className="row g-3 mb-4">
      {metrics.map((card) => (
        <div className="col-md-6 col-xl-3" key={card.title}>
          <div className="metric-card p-3 rounded-4 h-100">
            <p className="text-secondary mb-2">{card.title}</p>
            <h3 className="fw-bold mb-1">{card.value}</h3>
            <span className="trend">{card.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Metrics;
