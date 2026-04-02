import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/admin-ui/DashboardLayout";
import { useToast } from "../context/ToastContext";
import { getPendingShopsApi, updateShopApprovalApi } from "../api/shopApi";

const AdminApprovalsPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [shops, setShops] = useState([]);

  const avatarText = user?.fullName?.split(" ").map((v) => v[0]).join("").slice(0, 2).toUpperCase() || "AD";

  const load = async () => {
    try {
      const response = await getPendingShopsApi();
      setShops(response.data.shops || []);
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  useEffect(() => { load(); }, []);

  const changeStatus = async (shopUserId, status) => {
    try {
      await updateShopApprovalApi(shopUserId, { status });
      showToast(`Shop ${status.toLowerCase()}`, "success");
      load();
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="admin-root">
      <DashboardLayout roleLabel={user?.role || "ADMIN"} avatarText={avatarText} onLogout={handleLogout}>
        <h3 className="fw-bold mb-3">Pending Shop Approvals</h3>
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            {shops.length === 0 ? <p className="mb-0">No pending shops.</p> : null}
            {shops.map((shop) => (
              <div key={shop.id} className="d-flex justify-content-between align-items-center border-bottom py-3 gap-2 flex-wrap">
                <div>
                  <h6 className="mb-1">{shop.shopName}</h6>
                  <small className="text-secondary">{shop.ownerName} | {shop.mobile || "-"}</small>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-success" onClick={() => changeStatus(shop.shopUserId, "APPROVED")}>Approve</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => changeStatus(shop.shopUserId, "REJECTED")}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default AdminApprovalsPage;
