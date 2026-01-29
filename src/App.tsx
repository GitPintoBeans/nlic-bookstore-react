import { Route, Routes } from "react-router-dom";
import AppNavBar from "./components/AppNavBar";
import ProductList from "./pages/ProductList";
import ProductCreate from "./pages/ProductCreate";
import ProductDetails from "./pages/ProductDetails";
import ProductEdit from "./pages/ProductEdit";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <AppNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/new" element={<ProductCreate />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/:id/edit" element={<ProductEdit />} />
        <Route path="*" element={<div className="p-4">Not Found</div>} />
      </Routes>
    </>
  );
}