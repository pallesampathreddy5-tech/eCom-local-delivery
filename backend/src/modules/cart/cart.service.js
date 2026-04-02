import { Cart } from "../../models/Cart.js";
import { AppError } from "../../utils/AppError.js";
import { getProductById } from "../catalog/catalog.service.js";

const ensureCart = async (customerId) => {
  let cart = await Cart.findOne({ customerId });
  if (!cart) {
    cart = await Cart.create({ customerId, items: [] });
  }
  return cart;
};

const cartSummary = (cart) => {
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  return {
    cart,
    summary: {
      totalItems,
      subtotal
    }
  };
};

export const getMyCart = async (customerId) => {
  const cart = await ensureCart(customerId);
  return cartSummary(cart);
};

export const addItemToCart = async ({ customerId, productId, quantity }) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new AppError(404, "Product not found");
  }

  const cart = await ensureCart(customerId);
  const existing = cart.items.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({
      productId: product.id,
      name: product.name,
      categoryId: product.categoryId,
      shopName: product.shopName,
      price: product.price,
      quantity
    });
  }

  await cart.save();
  return cartSummary(cart);
};

export const updateItemQuantity = async ({ customerId, productId, quantity }) => {
  const cart = await ensureCart(customerId);
  const existing = cart.items.find((item) => item.productId === productId);

  if (!existing) {
    throw new AppError(404, "Cart item not found");
  }

  existing.quantity = quantity;
  await cart.save();
  return cartSummary(cart);
};

export const removeCartItem = async ({ customerId, productId }) => {
  const cart = await ensureCart(customerId);
  cart.items = cart.items.filter((item) => item.productId !== productId);
  await cart.save();
  return cartSummary(cart);
};

export const clearCart = async (customerId) => {
  const cart = await ensureCart(customerId);
  cart.items = [];
  await cart.save();
  return cart;
};
