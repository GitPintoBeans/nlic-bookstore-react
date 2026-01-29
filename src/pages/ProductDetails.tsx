import { useEffect, useState } from "react";
import { Button, Container, Card, Image } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProduct, getProductById, type Product } from "../api/productsApi";

export default function ProductDetails() {
  const { id } = useParams();
  const productId = Number(id);
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setErr(null);

      if (Number.isNaN(productId)) {
        setErr("Invalid product id.");
        setLoading(false);
        return;
      }

      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (e: any) {
        setErr(e?.response?.data?.message || e?.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [productId]);

  async function handleDelete() {
    if (!product?.product_id) return;
    const ok = confirm(`Delete "${product.name}"?`);
    if (!ok) return;

    try {
      await deleteProduct(product.product_id);
      navigate("/products");
    } catch (e: any) {
      alert(e?.response?.data?.message || e?.message || "Delete failed.");
    }
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Product Details</h2>
        <Link to="/products" className="btn btn-secondary">
            Back
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {err && <div className="alert alert-danger">{err}</div>}

      {product && (
        <Card>
          <Card.Body>
            {product.image_url && (
                <div className="text-center mb-3">
                    <Image
                    src={product.image_url}
                    alt={product.name}
                    fluid
                    rounded
                    style={{ maxHeight: "300px", objectFit: "contain" }}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src =
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
                    }}
                    />
                </div>
                )}
            <Card.Title>{product.name}</Card.Title>
            <div><strong>ID:</strong> {product.product_id}</div>
            <div><strong>Category:</strong> {product.category ?? ""}</div>
            <div><strong>Price:</strong> {product.price ?? ""}</div>
            <div><strong>Quantity:</strong> {product.quantity ?? ""}</div>
            <div className="mt-2"><strong>Description:</strong> {product.description ?? ""}</div>
            <div className="mt-2"><strong>Scripture Theme:</strong> {product.scripture_theme ?? ""}</div>

            <div className="d-flex gap-2 mt-3">
                <Link to={`/products/${product.product_id}/edit`} className="btn btn-warning">
                    Edit
                </Link>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
