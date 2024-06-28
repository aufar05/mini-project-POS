import { Route, Routes } from "react-router-dom";
import OrdersPage from "./pages/OrdersPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import HistoryDetailPage from "./pages/HistoryDetailPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import AddProductPage from "./pages/AddProductPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import ProductEditPage from "./pages/ProductEditPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import AddCategoryPage from "./pages/AddCategoryPage.jsx";
import CategoryDetailPage from "./pages/CategoryDetailPage.jsx";
import CategoryEditPage from "./pages/CategoryEditPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrdersPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route
        path="/history/detail-transaksi/:id"
        element={<HistoryDetailPage />}
      />
      <Route path="/produk" element={<ProductPage />} />
      <Route path="/produk/tambah-produk" element={<AddProductPage />} />
      <Route path="/produk/:id" element={<ProductDetailPage />} />
      <Route path="/produk/edit/:id" element={<ProductEditPage />} />

      <Route path="/kategori" element={<CategoryPage />} />
      <Route path="/kategori/tambah-kategori" element={<AddCategoryPage />} />
      <Route path="/kategori/:id" element={<CategoryDetailPage />} />
      <Route path="/kategori/edit/:id" element={<CategoryEditPage />} />
    </Routes>
  );
}
export default App;
