import { Route, Routes } from "react-router-dom";
import OrdersPage from "./pages/OrdersPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import HistoryDetailPage from "./pages/HistoryDetailPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import AddProductPage from "./pages/AddProductPage.jsx";

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
    </Routes>
  );
}
export default App;
