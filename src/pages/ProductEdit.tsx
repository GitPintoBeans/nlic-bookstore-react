import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { getProductById, updateProduct, type Product } from "../api/productsApi";

export default function ProductEdit() {
  const { id } = useParams();
  const productId = Number(id);
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setErr(null);

      if (Number.isNaN(productId)) {
        setErr("Invalid product id.");
        return;
      }

      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (e: any) {
        setErr(e?.response?.data?.message || e?.message || "Failed to load product.");
      }
    }
    load();
  }, [productId]);

  async function handleUpdate(p: Product) {
    const updated = await updateProduct(productId, p);
    navigate(`/products/${updated.product_id}`);
  }

  return (
    <Container className="py-4">
      <h2 className="mb-3">Edit Product</h2>
      {err && <div className="alert alert-danger">{err}</div>}
      {!product && !err && <p>Loading...</p>}
      {product && <ProductForm initial={product} onSubmit={handleUpdate} submittingText="Updating..." />}
    </Container>
  );
}