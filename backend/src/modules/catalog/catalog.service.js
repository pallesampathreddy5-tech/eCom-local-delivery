import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Product } from "../../models/Product.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const catalogPath = path.resolve(__dirname, "../../data/catalog.json");
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf-8"));

const mapDbProduct = (product) => ({
  id: product._id.toString(),
  name: product.name,
  categoryId: product.categoryId,
  shopName: product.shopName,
  price: product.price,
  stock: product.stock,
  description: product.description || "",
  image: product.image,
  source: "DB"
});

export const getCategories = async () => {
  const dbCategories = await Product.distinct("categoryId", { isActive: true });
  const staticMap = Object.fromEntries(catalog.categories.map((entry) => [entry.id, entry]));

  for (const categoryId of dbCategories) {
    if (!staticMap[categoryId]) {
      staticMap[categoryId] = { id: categoryId, name: categoryId };
    }
  }

  return Object.values(staticMap);
};

export const getProducts = async ({ categoryId, search, shopUserId }) => {
  const dbProducts = await Product.find({ isActive: true }).lean();
  let items = [...catalog.products, ...dbProducts.map(mapDbProduct)];

  if (shopUserId) {
    items = items.filter((product) => product.shopUserId === shopUserId);
  }

  if (categoryId) {
    items = items.filter((product) => product.categoryId === categoryId);
  }

  if (search) {
    const key = search.toLowerCase();
    items = items.filter(
      (product) =>
        product.name.toLowerCase().includes(key) ||
        (product.description || "").toLowerCase().includes(key) ||
        product.shopName.toLowerCase().includes(key)
    );
  }

  return items;
};

export const getProductById = async (id) => {
  const staticProduct = catalog.products.find((product) => product.id === id);
  if (staticProduct) return staticProduct;

  const dbProduct = await Product.findById(id).lean();
  return dbProduct ? mapDbProduct(dbProduct) : null;
};
