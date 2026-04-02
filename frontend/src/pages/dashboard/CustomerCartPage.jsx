import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCartApi, removeCartItemApi, updateCartItemApi } from "../../api/cartApi";
import CustomerNav from "../../components/customer/CustomerNav";
import { useToast } from "../../context/ToastContext";
import RoleDashboardShell from "./RoleDashboardShell";

const CustomerCartPage = () => {
  const { showToast } = useToast();
  const [cart, setCart] = useState({ items: [] });
  const [summary, setSummary] = useState({ subtotal: 0, totalItems: 0 });

  const fetchCart = async () => {
    try {
      const response = await getCartApi();
      setCart(response.data.cart);
      setSummary(response.data.summary);
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const changeQty = async (productId, quantity) => {
    try {
      await updateCartItemApi(productId, { quantity });
      fetchCart();
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  const removeItem = async (productId) => {
    try {
      await removeCartItemApi(productId);
      showToast("Item removed", "warning");
      fetchCart();
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  return (
    <RoleDashboardShell title="My Cart" subtitle="Review products and proceed to checkout.">
      <CustomerNav />

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {cart.items.length === 0 ? <p className="mb-0">Cart is empty.</p> : null}

          {cart.items.map((item) => (
            <div key={item.productId} className="d-flex justify-content-between align-items-center border-bottom py-3 gap-3">
              <div>
                <h6 className="mb-1">{item.name}</h6>
                <small className="text-secondary">{item.shopName}</small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-sm btn-outline-secondary" disabled={item.quantity <= 1} onClick={() => changeQty(item.productId, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => changeQty(item.productId, item.quantity + 1)}>+</button>
              </div>
              <div className="text-end">
                <strong>Rs {item.price * item.quantity}</strong>
                <div>
                  <button className="btn btn-sm btn-link text-danger p-0" onClick={() => removeItem(item.productId)}>Remove</button>
                </div>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <strong>Items:</strong> {summary.totalItems} | <strong>Subtotal:</strong> Rs {summary.subtotal}
            </div>
            <Link to="/customer/checkout" className="btn btn-success" aria-disabled={cart.items.length === 0}>
              Proceed Checkout
            </Link>
          </div>
        </div>
      </div>
    </RoleDashboardShell>
  );
};

export default CustomerCartPage;
