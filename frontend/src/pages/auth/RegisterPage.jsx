import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROLE_ROUTE_MAP, ROLES } from "../../config/authConfig";
import { registerRequestByRole } from "../../api/authService";
import { useToast } from "../../context/ToastContext";
import logo from "../../assets/LocalKart logo design on white background.png";

const initialState = {
  fullName: "",
  mobile: "",
  email: "",
  password: "",
  shopName: "",
  ownerName: "",
  shopCategory: "",
  address: "",
  latitude: "",
  longitude: "",
  kycDocumentUrl: "",
  aadhaarOrKycUrl: "",
  photoUrl: ""
};

const FloatingInput = ({ id, label, value, onChange, type = "text" }) => (
  <div className="form-floating">
    <input id={id} className="form-control" type={type} placeholder={label} value={value} onChange={onChange} />
    <label htmlFor={id}>{label}</label>
  </div>
);

const RegisterPage = () => {
  const location = useLocation();
  const [role, setRole] = useState(ROLES.CUSTOMER);
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/register/shop") setRole(ROLES.SHOPKEEPER);
    if (location.pathname === "/register/delivery") setRole(ROLES.DELIVERY_AGENT);
  }, [location.pathname]);

  const roleLabel = useMemo(() => role.replace("_", " "), [role]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (role === ROLES.CUSTOMER) {
      if (!form.fullName.trim() || !form.mobile.trim() || !form.password.trim()) {
        return "Full name, mobile and password are required for customer registration.";
      }
    }

    if (role === ROLES.SHOPKEEPER) {
      if (!form.shopName.trim() || !form.ownerName.trim() || !form.mobile.trim() || !form.address.trim() || !form.shopCategory.trim() || !form.password.trim()) {
        return "Shop name, owner name, mobile, address, category and password are required for shopkeeper registration.";
      }
    }

    if (role === ROLES.DELIVERY_AGENT) {
      if (!form.fullName.trim() || !form.mobile.trim() || !form.email.trim() || !form.address.trim() || !form.password.trim()) {
        return "Full name, mobile, email, address and password are required for delivery agent registration.";
      }
    }

    return null;
  };

  const buildPayload = () => {
    if (role === ROLES.CUSTOMER) {
      return {
        fullName: form.fullName.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim() || undefined,
        password: form.password
      };
    }

    if (role === ROLES.SHOPKEEPER) {
      const payload = {
        shopName: form.shopName.trim(),
        ownerName: form.ownerName.trim(),
        mobile: form.mobile.trim(),
        address: form.address.trim(),
        email: form.email.trim() || undefined,
        password: form.password,
        shopCategory: form.shopCategory.trim(),
        kycDocumentUrl: form.kycDocumentUrl.trim() || undefined
      };

      if (form.latitude.trim()) payload.latitude = Number(form.latitude);
      if (form.longitude.trim()) payload.longitude = Number(form.longitude);
      return payload;
    }

    return {
      fullName: form.fullName.trim(),
      mobile: form.mobile.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      aadhaarOrKycUrl: form.aadhaarOrKycUrl.trim() || undefined,
      photoUrl: form.photoUrl.trim() || undefined,
      password: form.password
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationMessage = validate();

    if (validationMessage) {
      showToast(validationMessage, "danger");
      return;
    }

    try {
      setIsSubmitting(true);
      await registerRequestByRole(role, buildPayload());
      showToast(`${roleLabel} registered successfully. Please login.`, "success");
      setForm(initialState);
      navigate("/login", { replace: true, state: { from: { pathname: ROLE_ROUTE_MAP[role] } } });
    } catch (error) {
      showToast(error.message || "Registration failed", "danger");
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

          <h2 className="fw-bold mb-2">Register</h2>
          <p className="text-secondary mb-4">Role-based onboarding connected to backend APIs.</p>

          <form className="d-grid gap-3 auth-form" onSubmit={handleSubmit}>
            <div>
              <label className="form-label fw-semibold mb-2">Register As</label>
              <div className="auth-role-switch d-flex gap-2 flex-wrap">
                {[
                  { key: ROLES.CUSTOMER, label: "Customer" },
                  { key: ROLES.SHOPKEEPER, label: "Shopkeeper" },
                  { key: ROLES.DELIVERY_AGENT, label: "Delivery Agent" }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className={`btn btn-sm ${role === item.key ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => setRole(item.key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {role !== ROLES.SHOPKEEPER ? (
              <FloatingInput id="fullName" label="Full Name" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} />
            ) : null}

            {role === ROLES.SHOPKEEPER ? (
              <>
                <FloatingInput id="shopName" label="Shop Name" value={form.shopName} onChange={(event) => updateField("shopName", event.target.value)} />
                <FloatingInput id="ownerName" label="Owner Name" value={form.ownerName} onChange={(event) => updateField("ownerName", event.target.value)} />
                <FloatingInput id="shopCategory" label="Shop Category" value={form.shopCategory} onChange={(event) => updateField("shopCategory", event.target.value)} />
              </>
            ) : null}

            <FloatingInput id="mobile" label="Mobile Number" value={form.mobile} onChange={(event) => updateField("mobile", event.target.value)} />
            <FloatingInput id="email" label="Email" value={form.email} onChange={(event) => updateField("email", event.target.value)} type="email" />

            {role !== ROLES.CUSTOMER ? (
              <FloatingInput id="address" label="Address" value={form.address} onChange={(event) => updateField("address", event.target.value)} />
            ) : null}

            {role === ROLES.SHOPKEEPER ? (
              <>
                <FloatingInput id="latitude" label="Latitude (optional)" value={form.latitude} onChange={(event) => updateField("latitude", event.target.value)} />
                <FloatingInput id="longitude" label="Longitude (optional)" value={form.longitude} onChange={(event) => updateField("longitude", event.target.value)} />
                <FloatingInput id="kycDocumentUrl" label="KYC Document URL (optional)" value={form.kycDocumentUrl} onChange={(event) => updateField("kycDocumentUrl", event.target.value)} />
              </>
            ) : null}

            {role === ROLES.DELIVERY_AGENT ? (
              <>
                <FloatingInput id="aadhaarOrKycUrl" label="Aadhaar or KYC URL (optional)" value={form.aadhaarOrKycUrl} onChange={(event) => updateField("aadhaarOrKycUrl", event.target.value)} />
                <FloatingInput id="photoUrl" label="Photo URL (optional)" value={form.photoUrl} onChange={(event) => updateField("photoUrl", event.target.value)} />
              </>
            ) : null}

            <FloatingInput id="password" label="Password" value={form.password} onChange={(event) => updateField("password", event.target.value)} type="password" />

            <button type="submit" className="btn btn-success py-2" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : `Register as ${roleLabel}`}
            </button>
          </form>

          <div className="mt-3 small">
            <Link to="/login" className="text-decoration-none">Back to login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
