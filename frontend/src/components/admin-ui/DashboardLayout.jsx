const menu = ["Dashboard", "Approvals", "Products", "Orders", "Deliveries", "Reports", "Audit Logs"];

const DashboardLayout = ({ children, roleLabel, avatarText, onLogout }) => {
  return (
    <div className="dashboard-shell d-flex">
      <aside className="sidebar p-3 p-lg-4">
        <div className="d-flex align-items-center gap-2 mb-4">
          <div className="brand-block" />
          <strong className="text-white fs-5">Hyperlocal Admin</strong>
        </div>
        <ul className="nav flex-column gap-2">
          {menu.map((item, idx) => (
            <li key={item} className={`menu-item px-3 py-2 rounded-3 ${idx === 0 ? "active" : ""}`}>
              {item}
            </li>
          ))}
        </ul>
      </aside>

      <div className="content flex-grow-1">
        <header className="topbar border-bottom d-flex justify-content-between align-items-center px-3 px-lg-4">
          <h5 className="mb-0 fw-semibold">Operations Control Center</h5>
          <div className="d-flex align-items-center gap-3">
            <span className="badge text-bg-light px-3 py-2">{roleLabel}</span>
            <div className="avatar">{avatarText}</div>
            <button type="button" className="btn btn-sm btn-outline-danger" onClick={onLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="p-3 p-lg-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
