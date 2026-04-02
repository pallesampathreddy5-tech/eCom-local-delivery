import { useEffect, useState } from "react";
import { createShopProductApi, getMyShopProductsApi } from "../../api/shopApi";
import { getCategoriesApi } from "../../api/catalogApi";
import RoleDashboardShell from "./RoleDashboardShell";
import { useToast } from "../../context/ToastContext";

const initialForm = { name: "", categoryId: "", description: "", image: "", price: "", stock: "" };

const ShopManageProductsPage = () => {
  const { showToast } = useToast();
  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [saving, setSaving] = useState(false);

  const loadData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([getCategoriesApi(), getMyShopProductsApi()]);
      setCategories(catRes.data.categories || []);
      setProducts(prodRes.data.products || []);
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      await createShopProductApi({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      });
      showToast("Product uploaded", "success");
      setForm(initialForm);
      loadData();
    } catch (error) {
      showToast(error.message, "danger");
    } finally {
      setSaving(false);
    }
  };

  return (
    <RoleDashboardShell title="Manage Products" subtitle="Upload products for your shop.">
      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body">
          <form className="row g-2" onSubmit={onSubmit}>
            <div className="col-md-4 form-floating"><input id="sp-name" className="form-control" placeholder="Product Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required /><label htmlFor="sp-name">Product Name</label></div>
            <div className="col-md-3 form-floating">
              <select id="sp-category" className="form-select" value={form.categoryId} onChange={(e) => setForm((p) => ({ ...p, categoryId: e.target.value }))} required>
                <option value="">Select Category</option>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
              <label htmlFor="sp-category">Category</label>
            </div>
            <div className="col-md-2 form-floating"><input id="sp-price" className="form-control" placeholder="Price" type="number" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} required /><label htmlFor="sp-price">Price</label></div>
            <div className="col-md-2 form-floating"><input id="sp-stock" className="form-control" placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))} required /><label htmlFor="sp-stock">Stock</label></div>
            <div className="col-md-1 d-grid"><button className="btn btn-success" disabled={saving}>{saving ? "..." : "Add"}</button></div>
            <div className="col-12 form-floating"><input id="sp-desc" className="form-control" placeholder="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} /><label htmlFor="sp-desc">Description</label></div>
            <div className="col-12 form-floating"><input id="sp-image" className="form-control" placeholder="Image URL" value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} /><label htmlFor="sp-image">Image URL (optional)</label></div>
          </form>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h6 className="mb-3">Uploaded Products</h6>
          {products.length === 0 ? <p className="mb-0">No products yet.</p> : null}
          {products.map((product) => (
            <div key={product._id} className="d-flex justify-content-between border-bottom py-2">
              <span>{product.name}</span>
              <span>Rs {product.price} | Stock {product.stock}</span>
            </div>
          ))}
        </div>
      </div>
    </RoleDashboardShell>
  );
};

export default ShopManageProductsPage;
