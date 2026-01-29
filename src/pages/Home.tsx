import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ScrollLogoBackground from "../components/ScrollLogoBackground";
import logo from "../assets/nlic-logo.png";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Background logo (appears AFTER scroll) */}
      <ScrollLogoBackground src={logo} />

      {/* HERO SECTION */}
      <div
        style={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity 300ms ease",
          opacity: scrolled ? 0 : 1,
          position: "relative",
          zIndex: 2,
        }}
      >
        <img
          src={logo}
          alt="New Life in Christ Ministries"
          style={{
            width: "480px",
            maxWidth: "90vw",
          }}
        />
      </div>

      {/* MAIN CONTENT */}
      <div style={{ position: "relative", zIndex: 3 }}>
        <Container className="pb-5">
          <Card className="p-4 shadow-sm">
            <h1 className="mb-3">Welcome to NLIC Bookstore</h1>
            <p className="mb-4">
              Manage bookstore products from one place. Use the navigation bar to view,
              add, edit, and delete products.
            </p>

            <div className="d-flex gap-2">
              <Link to="/products" className="btn btn-primary">
                View Products
              </Link>
              <Link to="/products/new" className="btn btn-outline-secondary">
                Add a Product
              </Link>
            </div>
          </Card>

          {/* spacer so scroll animation feels intentional */}
          <div style={{ height: 500 }} />
        </Container>
      </div>
    </div>
  );
}