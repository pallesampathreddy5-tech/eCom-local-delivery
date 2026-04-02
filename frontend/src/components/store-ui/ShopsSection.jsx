import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicShopsApi } from "../../api/shopApi";

const ShopsSection = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await getPublicShopsApi();
        setShops(response.data.shops || []);
      } catch (error) {
        setShops([]);
      }
    };

    load();
  }, []);

  if (shops.length === 0) return null;

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <h2 className="fw-bold mb-4">Approved Local Shops</h2>
        <div className="row g-3">
          {shops.slice(0, 6).map((shop) => (
            <div key={shop.id} className="col-md-6 col-lg-4">
              <Link
                to={`/shop?shopUserId=${encodeURIComponent(shop.shopUserId)}&shopName=${encodeURIComponent(shop.shopName)}`}
                className="text-decoration-none"
              >
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="mb-1">{shop.shopName}</h5>
                    <p className="mb-1 text-secondary">{shop.category}</p>
                    <small className="text-secondary">{shop.address}</small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopsSection;
