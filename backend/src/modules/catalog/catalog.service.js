import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const catalogPath = path.resolve(__dirname, "../../data/catalog.json");
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf-8"));

export const getCategories = () => catalog.categories;

export const getProducts = ({ categoryId, search }) => {
  let items = catalog.products;

  if (categoryId) {
    items = items.filter((product) => product.categoryId === categoryId);
  }

  if (search) {
    const key = search.toLowerCase();
    items = items.filter(
      (product) =>
        product.name.toLowerCase().includes(key) ||
        product.description.toLowerCase().includes(key) ||
        product.shopName.toLowerCase().includes(key)
    );
  }

  return items;
};

export const getProductById = (id) => catalog.products.find((product) => product.id === id);
