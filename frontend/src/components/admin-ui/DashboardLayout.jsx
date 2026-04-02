import { NavLink } from "react-router-dom";

const DashboardLayout = ({ children, roleLabel, avatarText, onLogout }) => {
  const menu = roleLabel === "SUPER_ADMIN"
      ? [
        { label: "Dashboard", to: "/super-admin/dashboard" },
        { label: "Approvals", to: "/admin/approvals" },
        { label: "Upload Products", to: "/admin/upload-product" },
        { label: "Create Admin", to: "/super-admin/admins" },
        { label: "Audit Logs", to: "/super-admin/audit-logs" }
      ]
    : [
        { label: "Dashboard", to: "/admin/dashboard" },
        { label: "Approvals", to: "/admin/approvals" },
        { label: "Upload Products", to: "/admin/upload-product" }
      ];

  return (
    <div className="dashboard-shell d-flex">
      <aside className="sidebar p-3 p-lg-4">
        <div className="d-flex align-items-center gap-2 mb-4">
          <div className="brand-block" />
          <strong className="text-white fs-5">Hyperlocal Admin</strong>
        </div>
        <ul className="nav flex-column gap-2">
          {menu.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => `menu-item d-block px-3 py-2 rounded-3 text-decoration-none ${isActive ? "active" : ""}`}
              >
                {item.label}
              </NavLink>
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
