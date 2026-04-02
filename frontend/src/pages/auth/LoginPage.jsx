import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addToCartApi } from "../../api/cartApi";
import { ROLE_ROUTE_MAP, ROLES } from "../../config/authConfig";
import { useAuth } from "../../context/AuthContext";
import { useGuestCart } from "../../context/GuestCartContext";
import { useToast } from "../../context/ToastContext";
import logo from "../../assets/LocalKart logo design on white background.png";

const ROLE_OPTIONS = [ROLES.CUSTOMER, ROLES.SHOPKEEPER, ROLES.DELIVERY_AGENT];

const LoginPage = () => {
  const { login, isAuthenticated, user } = useAuth();
  const { items: guestItems, clear: clearGuestCart } = useGuestCart();
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
      const shouldMergeGuestCart = Boolean(location.state?.mergeGuestCart);

      if (shouldMergeGuestCart) {
        if (result.user.role !== ROLES.CUSTOMER) {
          showToast("Checkout is available for customer accounts only.", "warning");
        } else if (guestItems.length > 0) {
          for (const item of guestItems) {
            await addToCartApi({ productId: item.productId, quantity: item.quantity });
          }
          clearGuestCart();
        }
      }

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
          <div className="text-center mb-4">
            <Link to="/" className="d-inline-block">
              <img src={logo} alt="LocalKart" className="auth-logo" />
            </Link>
          </div>

          <h2 className="fw-bold mb-2">Login to LocalKart</h2>
          <p className="text-secondary mb-4">Single auth system for customer, shop, delivery and admin roles.</p>

          <form className="d-grid gap-3 auth-form" onSubmit={handleSubmit}>
            <div>
              <label className="form-label fw-semibold mb-2">Login As</label>
              <div className="auth-role-switch d-flex gap-2 flex-wrap">
                {ROLE_OPTIONS.map((role) => (
                  <button
                    key={role}
                    type="button"
                    className={`btn btn-sm ${form.role === role ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => setForm((prev) => ({ ...prev, role }))}
                  >
                    {role === ROLES.CUSTOMER ? "Customer" : role === ROLES.SHOPKEEPER ? "Shopkeeper" : "Delivery Agent"}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                type="text"
                id="loginId"
                placeholder="Email or Mobile Number"
                value={form.loginId}
                onChange={(event) => setForm((prev) => ({ ...prev, loginId: event.target.value }))}
                required
              />
              <label htmlFor="loginId">Email or Mobile Number</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control"
                type="password"
                id="loginPassword"
                placeholder="Password"
                value={form.password}
                onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                required
              />
              <label htmlFor="loginPassword">Password</label>
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
