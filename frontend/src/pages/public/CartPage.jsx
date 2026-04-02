import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/store-ui/Header";
import Footer from "../../components/store-ui/Footer";
import { useAuth } from "../../context/AuthContext";
import { useGuestCart } from "../../context/GuestCartContext";
import { useToast } from "../../context/ToastContext";
import { getCartApi, removeCartItemApi, updateCartItemApi } from "../../api/cartApi";

const CartPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { items, summary, updateQty, removeItem } = useGuestCart();
  const { showToast } = useToast();
  const [serverCart, setServerCart] = useState({ items: [] });
  const [serverSummary, setServerSummary] = useState({ totalItems: 0, subtotal: 0 });

  const isCustomer = isAuthenticated && user?.role === "CUSTOMER";

  const fetchServerCart = async () => {
    try {
      const response = await getCartApi();
      setServerCart(response.data.cart);
      setServerSummary(response.data.summary);
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  useEffect(() => {
    if (isCustomer) {
      fetchServerCart();
    }
  }, [isCustomer]);

  const visibleItems = isCustomer ? serverCart.items : items;
  const visibleSummary = isCustomer ? serverSummary : summary;

  const onDecrease = async (item) => {
    if (item.quantity <= 1) return;
    if (isCustomer) {
      await updateCartItemApi(item.productId, { quantity: item.quantity - 1 });
      fetchServerCart();
      return;
    }
    updateQty(item.productId, item.quantity - 1);
  };

  const onIncrease = async (item) => {
    if (isCustomer) {
      await updateCartItemApi(item.productId, { quantity: item.quantity + 1 });
      fetchServerCart();
      return;
    }
    updateQty(item.productId, item.quantity + 1);
  };

  const onRemove = async (item) => {
    if (isCustomer) {
      await removeCartItemApi(item.productId);
      fetchServerCart();
      return;
    }
    removeItem(item.productId);
  };

  return (
    <div className="storefront-shell">
      <Header />
      <main className="container py-4">
        <h1 className="fw-bold mb-3">Cart</h1>

        <div className="card border-0 shadow-sm">
          <div className="card-body">
            {visibleItems.length === 0 ? <p className="mb-0">Your cart is empty.</p> : null}
            {visibleItems.map((item) => (
              <div key={item.productId} className="d-flex justify-content-between align-items-center py-3 border-bottom gap-3">
                <div>
                  <h6 className="mb-1">{item.name}</h6>
                  <small className="text-secondary">{item.shopName}</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => onDecrease(item)}>-</button>
                  <span>{item.quantity}</span>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => onIncrease(item)}>+</button>
                </div>
                <div className="text-end">
                  <strong>Rs {item.price * item.quantity}</strong>
                  <div>
                    <button className="btn btn-sm btn-link text-danger p-0" onClick={() => onRemove(item)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between align-items-center mt-3">
              <p className="mb-0"><strong>Items:</strong> {visibleSummary.totalItems} | <strong>Subtotal:</strong> Rs {visibleSummary.subtotal}</p>
              <Link to="/checkout" className="btn btn-success">Proceed to Checkout</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
