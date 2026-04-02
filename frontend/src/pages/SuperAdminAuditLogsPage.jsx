import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/admin-ui/DashboardLayout";
import { useToast } from "../context/ToastContext";
import { getAuditLogsApi } from "../api/shopApi";

const SuperAdminAuditLogsPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [logs, setLogs] = useState([]);

  const avatarText = user?.fullName?.split(" ").map((v) => v[0]).join("").slice(0, 2).toUpperCase() || "SA";

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getAuditLogsApi();
        setLogs(response.data.logs || []);
      } catch (error) {
        showToast(error.message, "danger");
      }
    };

    load();
  }, [showToast]);

  return (
    <div className="admin-root">
      <DashboardLayout roleLabel={user?.role || "SUPER_ADMIN"} avatarText={avatarText} onLogout={handleLogout}>
        <h3 className="fw-bold mb-3">Audit Logs</h3>
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            {logs.length === 0 ? <p className="mb-0">No audit logs yet.</p> : null}
            {logs.map((log) => (
              <div key={log._id} className="border-bottom py-3">
                <div className="d-flex justify-content-between flex-wrap gap-2">
                  <div>
                    <h6 className="mb-1">{log.action}</h6>
                    <small className="text-secondary">
                      By: {log.actorUserId?.fullName || log.actorRole} ({log.actorRole})
                    </small>
                  </div>
                  <small className="text-secondary">{new Date(log.createdAt).toLocaleString()}</small>
                </div>
                <small className="text-secondary d-block mt-1">Target: {log.targetType} | {log.targetId}</small>
                {log.metadata ? (
                  <pre className="bg-light rounded p-2 mt-2 small mb-0" style={{ whiteSpace: "pre-wrap" }}>
                    {JSON.stringify(log.metadata, null, 2)}
                  </pre>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default SuperAdminAuditLogsPage;
