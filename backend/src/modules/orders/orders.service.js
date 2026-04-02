import { ORDER_STATUS, PAYMENT_METHOD, PAYMENT_STATUS } from "../../constants/order.js";
import { Cart } from "../../models/Cart.js";
import { Order } from "../../models/Order.js";
import { AppError } from "../../utils/AppError.js";

const DELIVERY_FEE = 35;
const COD_MIN_ORDER_VALUE = 1000;

const generateOrderNo = () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const mapCartTotals = (items) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;
  return { subtotal, deliveryFee, total };
};

export const getCheckoutPreview = async ({ customerId, paymentMethod }) => {
  const cart = await Cart.findOne({ customerId });
  const items = cart?.items || [];

  if (items.length === 0) {
    throw new AppError(400, "Cart is empty");
  }

  const amounts = mapCartTotals(items);

  return {
    items,
    amounts,
    constraints: {
      codAllowed: amounts.total >= COD_MIN_ORDER_VALUE,
      codMinOrderValue: COD_MIN_ORDER_VALUE,
      selectedPaymentMethod: paymentMethod || null
    }
  };
};

export const placeOrder = async ({ customerId, paymentMethod, shippingAddress }) => {
  const cart = await Cart.findOne({ customerId });
  const items = cart?.items || [];

  if (items.length === 0) {
    throw new AppError(400, "Cart is empty");
  }

  const amounts = mapCartTotals(items);

  if (paymentMethod === PAYMENT_METHOD.COD && amounts.total < COD_MIN_ORDER_VALUE) {
    throw new AppError(400, `COD is allowed only for order total >= ${COD_MIN_ORDER_VALUE}`);
  }

  const paymentStatus = paymentMethod === PAYMENT_METHOD.COD ? PAYMENT_STATUS.PENDING : PAYMENT_STATUS.PENDING;
  const orderStatus = paymentMethod === PAYMENT_METHOD.COD ? ORDER_STATUS.PLACED : ORDER_STATUS.PAYMENT_PENDING;

  const order = await Order.create({
    orderNo: generateOrderNo(),
    customerId,
    items: items.map((item) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      lineTotal: item.price * item.quantity
    })),
    amounts,
    paymentMethod,
    paymentStatus,
    orderStatus,
    shippingAddress
  });

  if (paymentMethod === PAYMENT_METHOD.COD) {
    order.paymentStatus = PAYMENT_STATUS.SUCCESS;
    order.orderStatus = ORDER_STATUS.PAID;
    await order.save();
  }

  await Cart.updateOne({ customerId }, { $set: { items: [] } });

  return {
    order,
    paymentActionRequired: paymentMethod !== PAYMENT_METHOD.COD
  };
};

export const getMyOrders = async (customerId) => {
  return Order.find({ customerId }).sort({ createdAt: -1 });
};

export const markOrderPayment = async ({ customerId, orderId, success }) => {
  const order = await Order.findOne({ _id: orderId, customerId });
  if (!order) {
    throw new AppError(404, "Order not found");
  }

  if (order.paymentMethod === PAYMENT_METHOD.COD) {
    throw new AppError(400, "COD orders do not require online payment verification");
  }

  if (success) {
    order.paymentStatus = PAYMENT_STATUS.SUCCESS;
    order.orderStatus = ORDER_STATUS.PAID;
  } else {
    order.paymentStatus = PAYMENT_STATUS.FAILED;
    order.orderStatus = ORDER_STATUS.FAILED;
  }

  await order.save();
  return order;
};
