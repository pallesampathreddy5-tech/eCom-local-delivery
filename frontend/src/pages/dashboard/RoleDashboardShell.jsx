import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RoleDashboardShell = ({ title, subtitle, children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="container py-4">
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <p className="mb-1 text-secondary">Logged in as {user?.role}</p>
            <h3 className="mb-0 fw-bold">{title}</h3>
            <p className="mb-0 text-secondary">{subtitle}</p>
          </div>
          <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default RoleDashboardShell;
