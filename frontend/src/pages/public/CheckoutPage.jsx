import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/store-ui/Header";
import Footer from "../../components/store-ui/Footer";
import { useAuth } from "../../context/AuthContext";
import { useGuestCart } from "../../context/GuestCartContext";
import { useToast } from "../../context/ToastContext";
import { checkoutPreviewApi, placeOrderApi } from "../../api/orderApi";
import { verifyPaymentApi } from "../../api/paymentApi";

const CheckoutPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { items, summary } = useGuestCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const isCustomer = isAuthenticated && user?.role === "CUSTOMER";

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [shippingAddress, setShippingAddress] = useState("Madhapur, Hyderabad - 500081");
  const [preview, setPreview] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);

  useEffect(() => {
    if (!isCustomer) return;

    const fetchPreview = async () => {
      try {
        const response = await checkoutPreviewApi({ paymentMethod });
        setPreview(response.data);
      } catch (error) {
        setPreview(null);
      }
    };

    fetchPreview();
  }, [isCustomer, paymentMethod]);

  const handleLoginToContinue = () => {
    navigate("/login", { state: { from: { pathname: "/checkout" }, mergeGuestCart: true } });
  };

  const placeOrder = async () => {
    if (!isCustomer) return;

    try {
      const response = await placeOrderApi({ paymentMethod, shippingAddress });
      setPlacedOrder(response.data.order);
      showToast("Order placed", "success");
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  const verifyPayment = async (success) => {
    try {
      const response = await verifyPaymentApi({ orderId: placedOrder._id, success });
      setPlacedOrder(response.data.order);
      showToast(success ? "Payment successful" : "Payment failed", success ? "success" : "warning");
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  const guestTotal = summary.subtotal + (summary.subtotal > 0 ? 35 : 0);

  return (
    <div className="storefront-shell">
      <Header />
      <main className="container py-4">
        <h1 className="fw-bold mb-3">Checkout</h1>

        {!isCustomer ? (
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="mb-2">Login Required to Place Order</h5>
              {isAuthenticated ? (
                <>
                  <p className="text-secondary">You are logged in as <strong>{user?.role}</strong>. Checkout is available only for customer accounts.</p>
                  <Link className="btn btn-outline-secondary" to="/">Go to Home</Link>
                </>
              ) : (
                <>
                  <p className="text-secondary">You can add products before login. We will keep your selected items and move them to your customer cart after login.</p>
                  <p className="mb-1"><strong>Guest items:</strong> {summary.totalItems}</p>
                  <p className="mb-3"><strong>Estimated total:</strong> Rs {guestTotal}</p>
                  <div className="d-flex gap-2">
                    <button className="btn btn-success" onClick={handleLoginToContinue}>Login to Continue</button>
                    <Link className="btn btn-outline-secondary" to="/cart">Back to Cart</Link>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="card border-0 shadow-sm mb-3">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Payment Method</label>
                    <select className="form-select" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                      <option value="UPI">UPI</option>
                      <option value="CARD">CARD</option>
                      <option value="COD">COD</option>
                    </select>
                  </div>
                  <div className="col-md-8">
                    <label className="form-label">Shipping Address</label>
                    <input className="form-control" value={shippingAddress} onChange={(event) => setShippingAddress(event.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm mb-3">
              <div className="card-body">
                {preview ? (
                  <>
                    <p className="mb-1">Subtotal: Rs {preview.amounts.subtotal}</p>
                    <p className="mb-1">Delivery Fee: Rs {preview.amounts.deliveryFee}</p>
                    <p className="fw-bold mb-0">Total: Rs {preview.amounts.total}</p>
                  </>
                ) : <p className="mb-0">No items found in your account cart.</p>}
              </div>
            </div>

            <button className="btn btn-success mb-3" onClick={placeOrder} disabled={!preview}>Place Order</button>

            {placedOrder ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h6>Order: {placedOrder.orderNo}</h6>
                  <p className="mb-1">Status: {placedOrder.orderStatus}</p>
                  <p className="mb-2">Payment: {placedOrder.paymentStatus}</p>
                  {placedOrder.paymentMethod !== "COD" && placedOrder.paymentStatus === "PENDING" ? (
                    <div className="d-flex gap-2">
                      <button className="btn btn-primary" onClick={() => verifyPayment(true)}>Simulate Payment Success</button>
                      <button className="btn btn-outline-danger" onClick={() => verifyPayment(false)}>Simulate Payment Failure</button>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
