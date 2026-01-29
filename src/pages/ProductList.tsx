import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, getAllProducts, type Product } from "../api/productsApi";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (e: any) {
      setErr(e?.response?.data?.message || e?.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(p: Product) {
    if (!p.product_id) return;
    const ok = confirm(`Delete "${p.name}"?`);
    if (!ok) return;

    try {
      await deleteProduct(p.product_id);
      setProducts(prev => prev.filter(x => x.product_id !== p.product_id));
    } catch (e: any) {
      alert(e?.response?.data?.message || e?.message || "Delete failed.");
    }
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Products</h2>
        <Link to="/products/new" className="btn btn-primary">
            Add Product
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {err && <div className="alert alert-danger">{err}</div>}

      {!loading && !err && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Qty</th>
              <th style={{ width: 260 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.product_id}>
                <td>{p.product_id}</td>
                <td>{p.name}</td>
                <td>{p.category ?? ""}</td>
                <td>{p.price ?? ""}</td>
                <td>{p.quantity ?? ""}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => navigate(`/products/${p.product_id}`)}>
                      Details
                    </Button>
                    <Button size="sm" variant="warning" onClick={() => navigate(`/products/${p.product_id}/edit`)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleDelete(p)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center">No products found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}