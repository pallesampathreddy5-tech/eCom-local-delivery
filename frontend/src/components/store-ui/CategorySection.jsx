const categories = ["Fruits", "Vegetables", "Dairy", "Beverages", "Snacks", "Household"];

const CategorySection = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Shop by Category</h2>
          <a href="#" className="text-success fw-semibold text-decoration-none">See all</a>
        </div>
        <div className="row g-3">
          {categories.map((cat) => (
            <div className="col-6 col-md-4 col-lg-2" key={cat}>
              <div className="category-chip rounded-4 p-3 text-center h-100">
                <p className="mb-0 fw-semibold">{cat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
