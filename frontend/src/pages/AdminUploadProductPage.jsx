import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/admin-ui/DashboardLayout";
import { useToast } from "../context/ToastContext";
import {
  commitExcelUploadApi,
  createAdminProductApi,
  downloadExcelTemplateApi,
  getAllShopsApi,
  previewExcelUploadApi
} from "../api/shopApi";
import { getCategoriesApi } from "../api/catalogApi";

const initialForm = { shopUserId: "", name: "", categoryId: "", description: "", image: "", price: "", stock: "" };

const AdminUploadProductPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [excelCategory, setExcelCategory] = useState("vegetables");
  const [excelShopUserId, setExcelShopUserId] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [excelPreview, setExcelPreview] = useState(null);

  const avatarText = user?.fullName?.split(" ").map((v) => v[0]).join("").slice(0, 2).toUpperCase() || "AD";

  const load = async () => {
    try {
      const [shopRes, catRes] = await Promise.all([getAllShopsApi(), getCategoriesApi()]);
      const approved = (shopRes.data.shops || []).filter((shop) => shop.approvalStatus === "APPROVED");
      setShops(approved);
      setCategories(catRes.data.categories || []);
      if (!excelShopUserId && approved.length > 0) setExcelShopUserId(approved[0].shopUserId);
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await createAdminProductApi({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock)
      });
      showToast("Product uploaded for selected shop", "success");
      setForm(initialForm);
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  const onPreviewExcel = async () => {
    if (!excelFile) {
      showToast("Please select excel file", "warning");
      return;
    }

    const data = new FormData();
    data.append("file", excelFile);
    data.append("category", excelCategory);
    data.append("shopUserId", excelShopUserId);

    try {
      const response = await previewExcelUploadApi(data);
      setExcelPreview(response.data);
      showToast("Excel preview generated", "success");
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  const onDownloadTemplate = async () => {
    try {
      const blob = await downloadExcelTemplateApi(excelCategory);
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `template-${excelCategory}.xlsx`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  const onCommitExcel = async () => {
    if (!excelFile) {
      showToast("Please select excel file", "warning");
      return;
    }

    const data = new FormData();
    data.append("file", excelFile);
    data.append("category", excelCategory);
    data.append("shopUserId", excelShopUserId);

    try {
      const response = await commitExcelUploadApi(data);
      showToast(`Excel upload success. Created ${response.data.createdCount} products`, "success");
      setExcelPreview(null);
      setExcelFile(null);
    } catch (error) {
      showToast(error.message, "danger");
    }
  };

  return (
    <div className="admin-root">
      <DashboardLayout roleLabel={user?.role || "ADMIN"} avatarText={avatarText} onLogout={handleLogout}>
        <h3 className="fw-bold mb-3">Upload Item on Behalf of Shop</h3>

        <div className="card border-0 shadow-sm mb-3">
          <div className="card-body">
            <h6 className="mb-3">Excel Upload Section</h6>
            <p className="text-secondary small mb-3">Download category-specific sample template, fill rows, preview and commit upload.</p>

            <div className="row g-2 mb-2">
              <div className="col-md-3 form-floating">
                <select id="ex-category" className="form-select" value={excelCategory} onChange={(e) => setExcelCategory(e.target.value)}>
                  <option value="vegetables">Vegetables Template</option>
                  <option value="fruits">Fruits Template</option>
                  <option value="generic">Generic Template</option>
                </select>
                <label htmlFor="ex-category">Template Category</label>
              </div>
              <div className="col-md-5 form-floating">
                <select id="ex-shop" className="form-select" value={excelShopUserId} onChange={(e) => setExcelShopUserId(e.target.value)}>
                  {shops.map((shop) => <option key={shop.id} value={shop.shopUserId}>{shop.shopName}</option>)}
                </select>
                <label htmlFor="ex-shop">Target Shop</label>
              </div>
              <div className="col-md-4 d-flex align-items-center">
                <button type="button" className="btn btn-outline-primary w-100" onClick={onDownloadTemplate}>
                  Download Sample Excel
                </button>
              </div>
            </div>

            <div className="row g-2 align-items-center">
              <div className="col-md-6">
                <input className="form-control" type="file" accept=".xlsx" onChange={(e) => setExcelFile(e.target.files?.[0] || null)} />
              </div>
              <div className="col-md-3 d-grid"><button className="btn btn-outline-secondary" type="button" onClick={onPreviewExcel}>Preview Upload</button></div>
              <div className="col-md-3 d-grid"><button className="btn btn-primary" type="button" onClick={onCommitExcel}>Commit Upload</button></div>
            </div>

            {excelPreview ? (
              <div className="mt-3 small">
                <p className="mb-1">Total: {excelPreview.totalRows} | Valid: {excelPreview.validRows} | Invalid: {excelPreview.invalidRows}</p>
                {excelPreview.errors.length > 0 ? (
                  <ul className="mb-0">
                    {excelPreview.errors.slice(0, 5).map((error, idx) => <li key={idx}>Row {error.row}: {error.errors.join(", ")}</li>)}
                  </ul>
                ) : <p className="mb-0 text-success">No validation errors.</p>}
              </div>
            ) : null}
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h6 className="mb-3">Single Item Upload</h6>
            <form className="row g-2" onSubmit={onSubmit}>
              <div className="col-md-4 form-floating">
                <select id="ap-shop" className="form-select" value={form.shopUserId} onChange={(e) => setForm((p) => ({ ...p, shopUserId: e.target.value }))} required>
                  <option value="">Select Approved Shop</option>
                  {shops.map((shop) => <option key={shop.id} value={shop.shopUserId}>{shop.shopName}</option>)}
                </select>
                <label htmlFor="ap-shop">Approved Shop</label>
              </div>
              <div className="col-md-4 form-floating"><input id="ap-name" className="form-control" placeholder="Product Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required /><label htmlFor="ap-name">Product Name</label></div>
              <div className="col-md-4 form-floating">
                <select id="ap-category" className="form-select" value={form.categoryId} onChange={(e) => setForm((p) => ({ ...p, categoryId: e.target.value }))} required>
                  <option value="">Select Category</option>
                  {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
                <label htmlFor="ap-category">Category</label>
              </div>
              <div className="col-md-3 form-floating"><input id="ap-price" className="form-control" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} required /><label htmlFor="ap-price">Price</label></div>
              <div className="col-md-3 form-floating"><input id="ap-stock" className="form-control" type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))} required /><label htmlFor="ap-stock">Stock</label></div>
              <div className="col-md-6 form-floating"><input id="ap-image" className="form-control" placeholder="Image URL" value={form.image} onChange={(e) => setForm((p) => ({ ...p, image: e.target.value }))} /><label htmlFor="ap-image">Image URL (optional)</label></div>
              <div className="col-12 form-floating"><input id="ap-desc" className="form-control" placeholder="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} /><label htmlFor="ap-desc">Description</label></div>
              <div className="col-12 d-grid"><button className="btn btn-primary">Upload Product</button></div>
            </form>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default AdminUploadProductPage;
