import { Navigate, Route, Routes } from "react-router-dom";
import StorefrontPage from "./pages/StorefrontPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AboutPage from "./pages/public/AboutPage";
import CategoriesPage from "./pages/public/CategoriesPage";
import ShopPage from "./pages/public/ShopPage";
import CartPage from "./pages/public/CartPage";
import CheckoutPage from "./pages/public/CheckoutPage";
import CustomerDashboardPage from "./pages/dashboard/CustomerDashboardPage";
import CustomerShopPage from "./pages/dashboard/CustomerShopPage";
import CustomerCartPage from "./pages/dashboard/CustomerCartPage";
import CustomerCheckoutPage from "./pages/dashboard/CustomerCheckoutPage";
import CustomerOrdersPage from "./pages/dashboard/CustomerOrdersPage";
import ShopDashboardPage from "./pages/dashboard/ShopDashboardPage";
import ShopManageProductsPage from "./pages/dashboard/ShopManageProductsPage";
import DeliveryDashboardPage from "./pages/dashboard/DeliveryDashboardPage";
import AdminApprovalsPage from "./pages/AdminApprovalsPage";
import AdminUploadProductPage from "./pages/AdminUploadProductPage";
import SuperAdminCreateAdminPage from "./pages/SuperAdminCreateAdminPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ROLES } from "./config/authConfig";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<StorefrontPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/register/shop" element={<RegisterPage />} />
      <Route path="/register/delivery" element={<RegisterPage />} />

      <Route path="/customer/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}><CustomerDashboardPage /></ProtectedRoute>} />
      <Route path="/customer/shop" element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}><CustomerShopPage /></ProtectedRoute>} />
      <Route path="/customer/cart" element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}><CustomerCartPage /></ProtectedRoute>} />
      <Route path="/customer/checkout" element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}><CustomerCheckoutPage /></ProtectedRoute>} />
      <Route path="/customer/orders" element={<ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}><CustomerOrdersPage /></ProtectedRoute>} />
      <Route path="/shop/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.SHOPKEEPER]}><ShopDashboardPage /></ProtectedRoute>} />
      <Route path="/shop/products/manage" element={<ProtectedRoute allowedRoles={[ROLES.SHOPKEEPER]}><ShopManageProductsPage /></ProtectedRoute>} />
      <Route path="/delivery/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.DELIVERY_AGENT]}><DeliveryDashboardPage /></ProtectedRoute>} />
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]}><AdminPage /></ProtectedRoute>} />
      <Route path="/admin/approvals" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}><AdminApprovalsPage /></ProtectedRoute>} />
      <Route path="/admin/upload-product" element={<ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.SUPER_ADMIN]}><AdminUploadProductPage /></ProtectedRoute>} />
      <Route path="/super-admin/dashboard" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><AdminPage /></ProtectedRoute>} />
      <Route path="/super-admin/admins" element={<ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}><SuperAdminCreateAdminPage /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
