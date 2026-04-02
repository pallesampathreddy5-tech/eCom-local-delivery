import { Link, Navigate, Route, Routes } from "react-router-dom";
import StorefrontPage from "./pages/StorefrontPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CustomerDashboardPage from "./pages/dashboard/CustomerDashboardPage";
import CustomerShopPage from "./pages/dashboard/CustomerShopPage";
import CustomerCartPage from "./pages/dashboard/CustomerCartPage";
import CustomerCheckoutPage from "./pages/dashboard/CustomerCheckoutPage";
import CustomerOrdersPage from "./pages/dashboard/CustomerOrdersPage";
import ShopDashboardPage from "./pages/dashboard/ShopDashboardPage";
import DeliveryDashboardPage from "./pages/dashboard/DeliveryDashboardPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ROLES } from "./config/authConfig";

const App = () => {
  return (
    <>
      <div className="app-switcher d-flex gap-2 p-2 border-bottom bg-white position-sticky top-0 z-3">
        <Link className="btn btn-sm btn-outline-success" to="/">Store UI</Link>
        <Link className="btn btn-sm btn-outline-primary" to="/admin/dashboard">Admin UI</Link>
        <Link className="btn btn-sm btn-outline-dark" to="/login">Login</Link>
      </div>
      <Routes>
        <Route path="/" element={<StorefrontPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/customer/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}><CustomerDashboardPage /></ProtectedRoute>} />
        <Route path="/customer/shop" element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}><CustomerShopPage /></ProtectedRoute>} />
        <Route path="/customer/cart" element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}><CustomerCartPage /></ProtectedRoute>} />
        <Route path="/customer/checkout" element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}><CustomerCheckoutPage /></ProtectedRoute>} />
        <Route path="/customer/orders" element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}><CustomerOrdersPage /></ProtectedRoute>} />
        <Route path="/shop/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.SHOPKEEPER]}><ShopDashboardPage /></ProtectedRoute>} />
        <Route path="/delivery/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.DELIVERY_AGENT]}><DeliveryDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]}><AdminPage /></ProtectedRoute>} />
        <Route path="/super-admin/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><AdminPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
