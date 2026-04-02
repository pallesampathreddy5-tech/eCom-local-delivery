import { useEffect, useMemo, useState } from "react";
import { addToCartApi } from "../../api/cartApi";
import { getCategoriesApi, getProductsApi } from "../../api/catalogApi";
import CustomerNav from "../../components/customer/CustomerNav";
import RoleDashboardShell from "./RoleDashboardShell";
import { useToast } from "../../context/ToastContext";

const CustomerShopPage = () => {
  const { showToast } = useToast();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const response = await getCategoriesApi();
    setCategories(response.data.categories || []);
  };

  const fetchProducts = async (categoryId = "", searchText = "") => {
    setLoading(true);
    try {
      const response = await getProductsApi({
        ...(categoryId ? { categoryId } : {}),
        ...(searchText ? { search: searchText } : {})
      });
      setProducts(response.data.products || []);
    } catch (error) {
      showToast(error.message, "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const categoryNameMap = useMemo(
    () => Object.fromEntries(categories.map((item) => [item.id, item.name])),
    [categories]
  );

  const handleFilter = () => {
    fetchProducts(selectedCategory, search.trim());
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCartApi({ productId, quantity: 1 });
      showToast("Added to cart", "success");
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  return (
    <RoleDashboardShell title="Shop Products" subtitle="Select products by category and add to cart.">
      <CustomerNav />

      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body">
          <div className="row g-2">
            <div className="col-md-4">
              <select className="form-select" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Search product or shop"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
            <div className="col-md-2 d-grid">
              <button className="btn btn-success" onClick={handleFilter}>Filter</button>
            </div>
          </div>
        </div>
      </div>

      {loading ? <p>Loading products...</p> : null}

      <div className="row g-3">
        {products.map((product) => (
          <div className="col-md-6 col-xl-4" key={product.id}>
            <div className="card border-0 shadow-sm h-100">
              <img src={product.image} className="card-img-top" alt={product.name} style={{ height: 170, objectFit: "cover" }} />
              <div className="card-body d-grid">
                <h6 className="fw-bold mb-1">{product.name}</h6>
                <small className="text-secondary">{categoryNameMap[product.categoryId] || product.categoryId}</small>
                <small className="text-secondary">{product.shopName}</small>
                <p className="small text-muted mt-2 mb-2">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <strong>Rs {product.price}</strong>
                  <button className="btn btn-sm btn-success" onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </RoleDashboardShell>
  );
};

export default CustomerShopPage;
