import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategoriesApi } from "../../api/catalogApi";

const CategorySection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getCategoriesApi();
        setCategories(response.data.categories || []);
      } catch (error) {
        setCategories([]);
      }
    };

    load();
  }, []);

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Shop by Category</h2>
          <Link to="/categories" className="text-success fw-semibold text-decoration-none">View categories</Link>
        </div>

        <div className="row g-3">
          {categories.slice(0, 6).map((category) => (
            <div className="col-6 col-md-4 col-lg-2" key={category.id}>
              <Link to={`/shop?categoryId=${encodeURIComponent(category.id)}`} className="text-decoration-none">
                <div className="category-chip rounded-4 p-3 text-center h-100">
                  <p className="mb-0 fw-semibold text-dark">{category.name}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
