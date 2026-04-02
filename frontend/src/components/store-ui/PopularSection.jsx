const products = [
  { name: "Organic Banana", shop: "Green Mart", price: "Rs 48" },
  { name: "Cold Pressed Juice", shop: "Juice Hub", price: "Rs 120" },
  { name: "Whole Wheat Bread", shop: "Bake Corner", price: "Rs 55" },
  { name: "Premium Rice 5kg", shop: "Daily Needs", price: "Rs 499" }
];

const PopularSection = () => {
  return (
    <section className="py-5 popular-bg">
      <div className="container">
        <h2 className="fw-bold mb-4">Popular Products & Shops</h2>
        <div className="row g-3">
          {products.map((item) => (
            <div className="col-md-6 col-lg-3" key={item.name}>
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{item.name}</h5>
                  <p className="text-secondary mb-2">{item.shop}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>{item.price}</strong>
                    <button className="btn btn-sm btn-success rounded-pill px-3">Add</button>
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
