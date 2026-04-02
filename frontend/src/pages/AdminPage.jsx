import { Link } from "react-router-dom";
import DashboardLayout from "../components/admin-ui/DashboardLayout";
import Metrics from "../components/admin-ui/Metrics";
import OrdersTable from "../components/admin-ui/OrdersTable";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const avatarText =
    user?.fullName
      ?.split(" ")
      .slice(0, 2)
      .map((token) => token[0])
      .join("")
      .toUpperCase() || "AD";

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="admin-root">
      <DashboardLayout roleLabel={user?.role || "ADMIN"} avatarText={avatarText} onLogout={handleLogout}>
        <div className="mb-3 d-flex gap-2 flex-wrap">
          <Link className="btn btn-primary btn-sm" to="/admin/approvals">Shop Approvals</Link>
          <Link className="btn btn-outline-primary btn-sm" to="/admin/upload-product">Upload Item for Shop</Link>
          {user?.role === "SUPER_ADMIN" ? (
            <Link className="btn btn-outline-primary btn-sm" to="/super-admin/admins">Create Admin</Link>
          ) : null}
        </div>
        <div className="mb-4 d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <div>
            <h2 className="fw-bold mb-1">{user?.role} Overview</h2>
            <p className="text-secondary mb-0">Monitor shops, delivery flow, orders and platform operations.</p>
          </div>
          <span className="badge text-bg-primary px-3 py-2">{user?.fullName}</span>
        </div>
        <Metrics />
        <OrdersTable />
      </DashboardLayout>
    </div>
  );
};

export default AdminPage;
