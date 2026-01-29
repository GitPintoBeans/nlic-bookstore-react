import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { createProduct, type Product } from "../api/productsApi";

export default function ProductCreate() {
  const navigate = useNavigate();

  async function handleCreate(p: Product) {
    const created = await createProduct(p);
    navigate(`/products/${created.product_id}`);
  }

  return (
    <Container className="py-4">
      <h2 className="mb-3">Add Product</h2>
      <ProductForm onSubmit={handleCreate} submittingText="Creating..." />
    </Container>
  );
}