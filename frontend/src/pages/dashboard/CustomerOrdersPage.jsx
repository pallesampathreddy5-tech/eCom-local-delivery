import { useEffect, useState } from "react";
import { getMyOrdersApi } from "../../api/orderApi";
import CustomerNav from "../../components/customer/CustomerNav";
import { useToast } from "../../context/ToastContext";
import RoleDashboardShell from "./RoleDashboardShell";

const CustomerOrdersPage = () => {
  const { showToast } = useToast();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await getMyOrdersApi();
      setOrders(response.data.orders || []);
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <RoleDashboardShell title="My Orders" subtitle="Track placed and paid orders.">
      <CustomerNav />

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {orders.length === 0 ? <p className="mb-0">No orders yet.</p> : null}

          {orders.map((order) => (
            <div key={order._id} className="border-bottom py-3">
              <div className="d-flex justify-content-between flex-wrap gap-2">
                <div>
                  <h6 className="mb-1">{order.orderNo}</h6>
                  <small className="text-secondary">{new Date(order.createdAt).toLocaleString()}</small>
                </div>
                <div className="text-end">
                  <p className="mb-1"><strong>Total:</strong> Rs {order.amounts.total}</p>
                  <small className="text-secondary">{order.orderStatus} | {order.paymentStatus}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RoleDashboardShell>
  );
};

export default CustomerOrdersPage;
