import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../components/store-ui/Header";
import Footer from "../../components/store-ui/Footer";
import { getCategoriesApi, getProductsApi } from "../../api/catalogApi";
import { addToCartApi } from "../../api/cartApi";
import { useAuth } from "../../context/AuthContext";
import { useGuestCart } from "../../context/GuestCartContext";
import { useToast } from "../../context/ToastContext";

const ShopPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { addItem } = useGuestCart();
  const { showToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("categoryId") || "";
  const search = searchParams.get("search") || "";
  const shopUserId = searchParams.get("shopUserId") || "";
  const shopName = searchParams.get("shopName") || "";

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const response = await getProductsApi(params);
      setProducts(response.data.products || []);
    } catch (error) {
      showToast(error.message, "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const catRes = await getCategoriesApi();
        setCategories(catRes.data.categories || []);
      } catch (error) {
        showToast(error.message, "danger");
      }
    };

    init();
  }, [showToast]);

  useEffect(() => {
    fetchProducts({
      ...(shopUserId ? { shopUserId } : {}),
      ...(selectedCategory ? { categoryId: selectedCategory } : {}),
      ...(search ? { search } : {})
    });
  }, [shopUserId, selectedCategory, search]);

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((item) => [item.id, item.name])),
    [categories]
  );

  const onCategoryChange = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("categoryId", value);
    else next.delete("categoryId");
    setSearchParams(next);
  };

  const onSearchChange = (value) => {
    const next = new URLSearchParams(searchParams);
    if (value.trim()) next.set("search", value.trim());
    else next.delete("search");
    setSearchParams(next);
  };

  const handleAddToCart = async (product) => {
    const isCustomer = isAuthenticated && user?.role === "CUSTOMER";

    if (isCustomer) {
      try {
        await addToCartApi({ productId: product.id, quantity: 1 });
        showToast("Added to cart", "success");
      } catch (error) {
        showToast(error.message, "danger");
      }
      return;
    }

    addItem(product);
    showToast("Added to cart. Login at checkout to place order.", "success");
  };

  return (
    <div className="storefront-shell">
      <Header />
      <main className="container py-4">
        <h1 className="fw-bold mb-2">
          {shopName ? `Shop Products from ${shopName}` : "Shop Products"}
        </h1>
        <p className="text-secondary">Select items now, checkout after login.</p>

        <div className="card border-0 shadow-sm mb-3">
          <div className="card-body">
            <div className="row g-2">
              <div className="col-md-4">
                <select className="form-select" value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option value={category.id} key={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <input className="form-control" placeholder="Search products or stores" value={search} onChange={(event) => onSearchChange(event.target.value)} />
              </div>
              <div className="col-md-2 d-grid">
                <button className="btn btn-outline-secondary" onClick={() => setSearchParams({})}>Reset</button>
              </div>
            </div>
          </div>
        </div>

        {loading ? <p>Loading products...</p> : null}

        <div className="row g-3">
          {products.map((product) => (
            <div className="col-md-6 col-xl-4" key={product.id}>
              <div className="card border-0 shadow-sm h-100">
                <img src={product.image} alt={product.name} className="card-img-top" style={{ height: 180, objectFit: "cover" }} />
                <div className="card-body d-grid">
                  <h6 className="fw-bold mb-1">{product.name}</h6>
                  <small className="text-secondary">{categoryMap[product.categoryId] || product.categoryId}</small>
                  <small className="text-secondary">{product.shopName}</small>
                  <p className="small text-muted mt-2 mb-2">{product.description}</p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <strong>Rs {product.price}</strong>
                    <button className="btn btn-sm btn-success" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
