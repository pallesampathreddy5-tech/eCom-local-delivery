import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkoutPreviewApi, placeOrderApi } from "../../api/orderApi";
import { verifyPaymentApi } from "../../api/paymentApi";
import CustomerNav from "../../components/customer/CustomerNav";
import { useToast } from "../../context/ToastContext";
import RoleDashboardShell from "./RoleDashboardShell";

const CustomerCheckoutPage = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [shippingAddress, setShippingAddress] = useState("Madhapur, Hyderabad - 500081");
  const [preview, setPreview] = useState(null);
  const [placedOrder, setPlacedOrder] = useState(null);

  const fetchPreview = async () => {
    try {
      const response = await checkoutPreviewApi({ paymentMethod });
      setPreview(response.data);
    } catch (error) {
      setPreview(null);
      showToast(error.message, "warning");
    }
  };

  useEffect(() => {
    fetchPreview();
  }, [paymentMethod]);

  const placeOrder = async () => {
    if (!shippingAddress.trim()) {
      showToast("Shipping address is required", "danger");
      return;
    }

    try {
      const response = await placeOrderApi({ paymentMethod, shippingAddress });
      setPlacedOrder(response.data.order);
      showToast("Order placed", "success");
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  const verifyPayment = async (success) => {
    if (!placedOrder?._id) return;

    try {
      const response = await verifyPaymentApi({ orderId: placedOrder._id, success });
      setPlacedOrder(response.data.order);
      showToast(success ? "Payment successful" : "Payment marked failed", success ? "success" : "warning");
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  const codBlocked = preview?.constraints && !preview.constraints.codAllowed;

  return (
    <RoleDashboardShell title="Checkout" subtitle="Review amount and complete payment.">
      <CustomerNav />

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
              {paymentMethod === "COD" && codBlocked ? (
                <small className="text-danger">COD allowed only when total {"\u003e="} Rs {preview.constraints.codMinOrderValue}</small>
              ) : null}
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
          <h6>Order Summary</h6>
          {!preview ? <p className="mb-0">No cart items available.</p> : (
            <>
              <p className="mb-1">Subtotal: Rs {preview.amounts.subtotal}</p>
              <p className="mb-1">Delivery Fee: Rs {preview.amounts.deliveryFee}</p>
              <p className="mb-0 fw-bold">Total: Rs {preview.amounts.total}</p>
            </>
          )}
        </div>
      </div>

      <div className="d-flex gap-2 mb-3">
        <button className="btn btn-success" onClick={placeOrder} disabled={!preview || (paymentMethod === "COD" && codBlocked)}>
          Place Order
        </button>
        <button className="btn btn-outline-secondary" onClick={() => navigate("/customer/cart")}>Back to Cart</button>
      </div>

      {placedOrder ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h6 className="mb-2">Placed Order: {placedOrder.orderNo}</h6>
            <p className="mb-1">Order Status: {placedOrder.orderStatus}</p>
            <p className="mb-3">Payment Status: {placedOrder.paymentStatus}</p>

            {placedOrder.paymentMethod !== "COD" && placedOrder.paymentStatus === "PENDING" ? (
              <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={() => verifyPayment(true)}>Simulate Payment Success</button>
                <button className="btn btn-outline-danger" onClick={() => verifyPayment(false)}>Simulate Payment Failure</button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </RoleDashboardShell>
  );
};

export default CustomerCheckoutPage;
