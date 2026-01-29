import { useMemo, useState } from "react";
import { Button, Form } from "react-bootstrap";
import type { Product } from "../api/productsApi";

// Props for ProductForm component
type Props = {
  initial?: Product;
  onSubmit: (product: Product) => Promise<void>;
  submittingText?: string;
};

// Product form component for creating and editing products
export default function ProductForm({ initial, onSubmit, submittingText = "Saving..." }: Props) {
  const start = useMemo<Product>(() => ({
    name: initial?.name ?? "",
    category: initial?.category ?? "",
    price: initial?.price ?? null,
    quantity: initial?.quantity ?? null,
    description: initial?.description ?? "",
    scripture_theme: initial?.scripture_theme ?? "",
    image_url: initial?.image_url ?? "",
  }), [initial]);

  const [form, setForm] = useState<Product>(start);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update form field
  function setField<K extends keyof Product>(key: K, value: Product[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        ...form,
        category: form.category?.toString().trim() || null,
        description: form.description?.toString().trim() || null,
        scripture_theme: form.scripture_theme?.toString().trim() || null,
        image_url: form.image_url?.toString().trim() || null,
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  // Render the form
  return (
    <Form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}

      <Form.Group className="mb-3">
        <Form.Label>Name *</Form.Label>
        <Form.Control
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          placeholder="e.g., Study Bible"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Control
          value={form.category ?? ""}
          onChange={(e) => setField("category", e.target.value)}
          placeholder="e.g., Books, Apparel, Accessories"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          step="0.01"
          value={form.price ?? ""}
          onChange={(e) => setField("price", e.target.value === "" ? null : Number(e.target.value))}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="number"
          value={form.quantity ?? ""}
          onChange={(e) => setField("quantity", e.target.value === "" ? null : Number(e.target.value))}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={form.description ?? ""}
          onChange={(e) => setField("description", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Scripture Theme</Form.Label>
        <Form.Control
          value={form.scripture_theme ?? ""}
          onChange={(e) => setField("scripture_theme", e.target.value)}
          placeholder="e.g., Faith, Hope, Love"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Product Image URL</Form.Label>
        <Form.Control
            value={form.image_url ?? ""}
            onChange={(e) => setField("image_url", e.target.value)}
            placeholder="https://example.com/image.jpg"
        />
        <Form.Text className="text-muted">
            Paste a publicly accessible image URL
        </Form.Text>
        </Form.Group>

      <Button type="submit" disabled={saving}>
        {saving ? submittingText : "Save"}
      </Button>
    </Form>
  );
}