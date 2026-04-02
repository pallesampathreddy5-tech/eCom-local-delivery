import { NavLink } from "react-router-dom";

const CustomerNav = () => {
  const navItemClass = ({ isActive }) =>
    `btn btn-sm ${isActive ? "btn-success" : "btn-outline-success"}`;

  return (
    <div className="d-flex flex-wrap gap-2 mb-3">
      <NavLink className={navItemClass} to="/customer/dashboard">Dashboard</NavLink>
      <NavLink className={navItemClass} to="/customer/shop">Shop Products</NavLink>
      <NavLink className={navItemClass} to="/customer/cart">Cart</NavLink>
      <NavLink className={navItemClass} to="/customer/checkout">Checkout</NavLink>
      <NavLink className={navItemClass} to="/customer/orders">My Orders</NavLink>
    </div>
  );
};

export default CustomerNav;
