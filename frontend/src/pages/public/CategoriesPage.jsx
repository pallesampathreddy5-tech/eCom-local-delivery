import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/store-ui/Header";
import Footer from "../../components/store-ui/Footer";
import { getCategoriesApi } from "../../api/catalogApi";
import { useToast } from "../../context/ToastContext";

const CategoriesPage = () => {
  const { showToast } = useToast();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategoriesApi();
        setCategories(response.data.categories || []);
      } catch (error) {
        showToast(error.message, "danger");
      }
    };

    fetchCategories();
  }, [showToast]);

  return (
    <div className="storefront-shell">
      <Header />
      <main className="container py-5">
        <h1 className="fw-bold mb-2">Categories</h1>
        <p className="text-secondary mb-4">Explore what you can order from nearby stores.</p>
        <div className="row g-3">
          {categories.map((category) => (
            <div key={category.id} className="col-md-4 col-lg-3">
              <Link to={`/shop?categoryId=${encodeURIComponent(category.id)}`} className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                  <h5 className="mb-1">{category.name}</h5>
                  <p className="text-secondary small mb-0">Fresh local selection and rapid delivery support.</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
