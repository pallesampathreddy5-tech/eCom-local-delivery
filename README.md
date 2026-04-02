# Multi-Vendor Hyperlocal Delivery Platform

Production-oriented foundation for a role-based hyperlocal commerce app.

## Projects

- `frontend` -> Single React + Vite app with Store UI + Admin UI.
- `backend` -> Node.js + Express.js + MongoDB auth foundation with validation and JWT session flow.

## Database

Current MongoDB connection URL used:

```txt
mongodb://localhost:27017/hyperlocal-marketplace
```

You can keep this in `backend/.env` as `MONGODB_URI`.

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Backend runs at:

```txt
http://localhost:5000
```

Health check:

```txt
GET /health
```

## Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend runs at:

```txt
http://localhost:5173
```

## Implemented Auth APIs

Base: `http://localhost:5000/api/v1`

- `POST /auth/register/customer`
- `POST /auth/register/shopkeeper`
- `POST /auth/register/delivery-agent`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me` (Bearer access token)

## Implemented Customer Journey APIs

Base: `http://localhost:5000/api/v1`

- `GET /catalog/categories`
- `GET /catalog/products?categoryId=&search=`
- `GET /catalog/products/:productId`
- `GET /cart`
- `POST /cart/items`
- `PATCH /cart/items/:productId`
- `DELETE /cart/items/:productId`
- `POST /orders/checkout/preview`
- `POST /orders/checkout/place-order`
- `POST /payments/verify`
- `GET /orders/my`

Catalog products/categories are served from local JSON:

- `backend/src/data/catalog.json`

## Validation + Security Implemented

- Zod request validation
- Required field checks for register/login
- Bcrypt password hashing
- JWT access token + refresh token
- Refresh token in HttpOnly cookie
- Helmet
- CORS with credentials
- Rate limiting
- Mongo sanitization
- Centralized error handling
- Standard API response format

## Frontend Auth UX Implemented

- Role-based login page
- Role-based register page connected to backend APIs
- Required field validation before submit
- Toast alerts for success/error states
- Protected routes by role
- Logout for all dashboards including admin topbar

## Frontend Customer Journey Implemented

- `/customer/shop` -> Browse products by category/search and add to cart
- `/customer/cart` -> Update quantity/remove items
- `/customer/checkout` -> Preview totals, place order, simulate payment
- `/customer/orders` -> Order history

## Seed Sample Users (for Login Testing)

After backend starts, run:

```bash
cd backend
npm run seed:auth
```

This creates/upserts sample accounts in MongoDB.

| Role | Login Email | Password | Phone |
|---|---|---|---|
| CUSTOMER | customer@localbasket.com | Customer@123 | 9000000001 |
| SHOPKEEPER | shop@localbasket.com | Shop@123 | 9000000002 |
| DELIVERY_AGENT | delivery@localbasket.com | Delivery@123 | 9000000003 |
| ADMIN | admin@localbasket.com | Admin@123 | 9000000004 |
| SUPER_ADMIN | superadmin@localbasket.com | SuperAdmin@123 | 9000000005 |

## Important Notes

- Shopkeeper and delivery registration APIs save into DB with profile collections.
- Admin and super admin registration are intentionally not public endpoints.
- This is the backend auth foundation; next modules (catalog/cart/orders/delivery/payments/redis) can now be added cleanly.
