import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROLE_ROUTE_MAP, ROLES } from "../../config/authConfig";
import { registerRequestByRole } from "../../api/authService";
import { useToast } from "../../context/ToastContext";

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

const RegisterPage = () => {
  const [role, setRole] = useState(ROLES.CUSTOMER);
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

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
          <h2 className="fw-bold mb-2">Register</h2>
          <p className="text-secondary mb-4">Role-based onboarding connected to backend APIs.</p>

          <div className="mb-3">
            <label className="form-label">Select Role</label>
            <select className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
              <option value={ROLES.CUSTOMER}>CUSTOMER</option>
              <option value={ROLES.SHOPKEEPER}>SHOPKEEPER</option>
              <option value={ROLES.DELIVERY_AGENT}>DELIVERY_AGENT</option>
            </select>
          </div>

          <form className="d-grid gap-3" onSubmit={handleSubmit}>
            {role !== ROLES.SHOPKEEPER ? (
              <input
                className="form-control"
                placeholder="Full Name"
                value={form.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
              />
            ) : null}

            {role === ROLES.SHOPKEEPER ? (
              <>
                <input className="form-control" placeholder="Shop Name" value={form.shopName} onChange={(event) => updateField("shopName", event.target.value)} />
                <input className="form-control" placeholder="Owner Name" value={form.ownerName} onChange={(event) => updateField("ownerName", event.target.value)} />
                <input className="form-control" placeholder="Shop Category" value={form.shopCategory} onChange={(event) => updateField("shopCategory", event.target.value)} />
              </>
            ) : null}

            <input className="form-control" placeholder="Mobile Number" value={form.mobile} onChange={(event) => updateField("mobile", event.target.value)} />
            <input className="form-control" placeholder="Email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />

            {role !== ROLES.CUSTOMER ? (
              <input className="form-control" placeholder="Address" value={form.address} onChange={(event) => updateField("address", event.target.value)} />
            ) : null}

            {role === ROLES.SHOPKEEPER ? (
              <>
                <input className="form-control" placeholder="Latitude (optional)" value={form.latitude} onChange={(event) => updateField("latitude", event.target.value)} />
                <input className="form-control" placeholder="Longitude (optional)" value={form.longitude} onChange={(event) => updateField("longitude", event.target.value)} />
                <input className="form-control" placeholder="KYC Document URL (optional)" value={form.kycDocumentUrl} onChange={(event) => updateField("kycDocumentUrl", event.target.value)} />
              </>
            ) : null}

            {role === ROLES.DELIVERY_AGENT ? (
              <>
                <input className="form-control" placeholder="Aadhaar or KYC URL (optional)" value={form.aadhaarOrKycUrl} onChange={(event) => updateField("aadhaarOrKycUrl", event.target.value)} />
                <input className="form-control" placeholder="Photo URL (optional)" value={form.photoUrl} onChange={(event) => updateField("photoUrl", event.target.value)} />
              </>
            ) : null}

            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
            />

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
