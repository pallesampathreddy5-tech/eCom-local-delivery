import Header from "../../components/store-ui/Header";
import Footer from "../../components/store-ui/Footer";

const StorefrontPage = ({ children }) => {
  return (
    <div className="storefront-shell">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default StorefrontPage;
