# Backend

Node.js + Express backend for the hyperlocal platform.

## Commands

```bash
npm install
npm run dev
npm run seed:auth
```

## Environment

Create `.env` from `.env.example`.

Required values:
- `MONGODB_URI=mongodb://localhost:27017/`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `FRONTEND_ORIGIN=http://localhost:5173`

## Auth Routes

- `POST /api/v1/auth/register/customer`
- `POST /api/v1/auth/register/shopkeeper`
- `POST /api/v1/auth/register/delivery-agent`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

## Customer Journey Routes

- `GET /api/v1/catalog/categories`
- `GET /api/v1/catalog/products`
- `GET /api/v1/catalog/products/:productId`
- `GET /api/v1/cart`
- `POST /api/v1/cart/items`
- `PATCH /api/v1/cart/items/:productId`
- `DELETE /api/v1/cart/items/:productId`
- `POST /api/v1/orders/checkout/preview`
- `POST /api/v1/orders/checkout/place-order`
- `POST /api/v1/payments/verify`
- `GET /api/v1/orders/my`

Dummy catalog source:
- `src/data/catalog.json`
