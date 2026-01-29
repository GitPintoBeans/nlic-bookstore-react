import axios from "axios";

export type Product = {
  product_id?: number;
  name: string;
  category?: string | null;
  price?: number | null;
  quantity?: number | null;
  description?: string | null;
  scripture_theme?: string | null;
  image_url?: string | null;
  created_at?: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function getAllProducts() {
  const res = await axios.get<Product[]>(`${API_BASE}/products`);
  return res.data;
}

export async function getProductById(productId: number) {
  const res = await axios.get<Product>(`${API_BASE}/products/${productId}`);
  return res.data;
}

export async function createProduct(payload: Product) {
  const res = await axios.post<Product>(`${API_BASE}/products`, payload);
  return res.data;
}

export async function updateProduct(productId: number, payload: Product) {
  const res = await axios.put<Product>(`${API_BASE}/products/${productId}`, payload);
  return res.data;
}

export async function deleteProduct(productId: number) {
  await axios.delete(`${API_BASE}/products/${productId}`); // 204 No Content
}