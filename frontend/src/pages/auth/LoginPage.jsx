import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROLE_ROUTE_MAP, ROLES } from "../../config/authConfig";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const ROLE_OPTIONS = [
  ROLES.CUSTOMER,
  ROLES.SHOPKEEPER,
  ROLES.DELIVERY_AGENT,
  ROLES.ADMIN,
  ROLES.SUPER_ADMIN
];

const LoginPage = () => {
  const { login, isAuthenticated, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ loginId: "", password: "", role: ROLES.CUSTOMER });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      navigate(ROLE_ROUTE_MAP[user.role], { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.loginId.trim()) {
      const message = "Email or mobile is required.";
      setError(message);
      showToast(message, "danger");
      return;
    }

    if (!form.password.trim()) {
      const message = "Password is required.";
      setError(message);
      showToast(message, "danger");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await login(form);
      showToast("Login successful", "success");
      const nextPath = location.state?.from?.pathname;
      navigate(nextPath || ROLE_ROUTE_MAP[result.user.role], { replace: true });
    } catch (apiError) {
      const message = apiError.message || "Login failed";
      setError(message);
      showToast(message, "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center px-3 py-5">
      <div className="auth-card card border-0 shadow-sm">
        <div className="card-body p-4 p-md-5">
          <h2 className="fw-bold mb-2">Login to LocalBasket</h2>
          <p className="text-secondary mb-4">Single auth system for customer, shop, delivery and admin roles.</p>

          <form className="d-grid gap-3" onSubmit={handleSubmit}>
            <div>
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={form.role}
                onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
              >
                {ROLE_OPTIONS.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Email</label>
              <input
                className="form-control"
                type="email"
                placeholder="Enter email"
                value={form.loginId}
                onChange={(event) => setForm((prev) => ({ ...prev, loginId: event.target.value }))}
                required
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                required
              />
            </div>

            {error ? <p className="text-danger small mb-0">{error}</p> : null}

            <button className="btn btn-success w-100 py-2" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="d-flex justify-content-between mt-3 small">
            <Link to="/register" className="text-decoration-none">Create account</Link>
            <a href="#" className="text-decoration-none">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
