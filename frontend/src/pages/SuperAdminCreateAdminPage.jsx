import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/admin-ui/DashboardLayout";
import { useToast } from "../context/ToastContext";
import { createAdminUserApi } from "../api/shopApi";

const initialForm = { fullName: "", mobile: "", email: "", password: "" };

const SuperAdminCreateAdminPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  const avatarText = user?.fullName?.split(" ").map((v) => v[0]).join("").slice(0, 2).toUpperCase() || "SA";

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      const response = await createAdminUserApi(form);
      showToast(`Admin created: ${response.data.user.email}`, "success");
      setForm(initialForm);
    } catch (error) {
      showToast(error.message, "danger");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-root">
      <DashboardLayout roleLabel={user?.role || "SUPER_ADMIN"} avatarText={avatarText} onLogout={handleLogout}>
        <h3 className="fw-bold mb-3">Create Admin User</h3>
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <form className="row g-2" onSubmit={onSubmit}>
              <div className="col-md-6 form-floating"><input id="sa-name" className="form-control" placeholder="Full Name" value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} required /><label htmlFor="sa-name">Full Name</label></div>
              <div className="col-md-6 form-floating"><input id="sa-mobile" className="form-control" placeholder="Mobile" value={form.mobile} onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))} required /><label htmlFor="sa-mobile">Mobile</label></div>
              <div className="col-md-6 form-floating"><input id="sa-email" className="form-control" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required /><label htmlFor="sa-email">Email</label></div>
              <div className="col-md-6 form-floating"><input id="sa-password" className="form-control" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} required /><label htmlFor="sa-password">Password</label></div>
              <div className="col-12 d-grid"><button className="btn btn-primary" disabled={saving}>{saving ? "Creating..." : "Create Admin"}</button></div>
            </form>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default SuperAdminCreateAdminPage;
