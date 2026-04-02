import Header from "../components/store-ui/Header";
import HeroSection from "../components/store-ui/HeroSection";
import CategorySection from "../components/store-ui/CategorySection";
import PopularSection from "../components/store-ui/PopularSection";
import PartnersSection from "../components/store-ui/PartnersSection";
import ShopsSection from "../components/store-ui/ShopsSection";
import Footer from "../components/store-ui/Footer";

const StorefrontPage = () => {
  return (
    <div className="storefront-shell">
      <Header />
      <HeroSection />
      <ShopsSection />
      <CategorySection />
      <PopularSection />
      <PartnersSection />
      <Footer />
    </div>
  );
};

export default StorefrontPage;
