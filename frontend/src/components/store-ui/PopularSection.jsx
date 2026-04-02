import { addToCartApi } from "../../api/cartApi";
import { useAuth } from "../../context/AuthContext";
import { useGuestCart } from "../../context/GuestCartContext";
import { useToast } from "../../context/ToastContext";

const products = [
  { id: "p-001", name: "Banana (1 Dozen)", categoryId: "cat-fruits", shopName: "Lakshmi Stores", price: 70 },
  { id: "p-009", name: "Orange Juice (1L)", categoryId: "cat-beverages", shopName: "Juice Hub", price: 110 },
  { id: "p-006", name: "Curd (500g)", categoryId: "cat-dairy", shopName: "Milk Hub", price: 45 },
  { id: "p-007", name: "Masala Chips", categoryId: "cat-snacks", shopName: "Snack Zone", price: 30 }
];

const PopularSection = () => {
  const { isAuthenticated, user } = useAuth();
  const { addItem } = useGuestCart();
  const { showToast } = useToast();

  const addProduct = async (item) => {
    if (isAuthenticated && user?.role === "CUSTOMER") {
      try {
        await addToCartApi({ productId: item.id, quantity: 1 });
        showToast("Added to cart", "success");
      } catch (error) {
        showToast(error.message, "danger");
      }
      return;
    }

    addItem(item);
    showToast("Added to cart. Continue as guest and login at checkout.", "success");
  };

  return (
    <section className="py-5 popular-bg">
      <div className="container">
        <h2 className="fw-bold mb-4">Popular Products & Shops</h2>
        <div className="row g-3">
          {products.map((item) => (
            <div className="col-md-6 col-lg-3" key={item.id}>
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{item.name}</h5>
                  <p className="text-secondary mb-2">{item.shopName}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>Rs {item.price}</strong>
                    <button className="btn btn-sm btn-success rounded-pill px-3" onClick={() => addProduct(item)}>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSection;
