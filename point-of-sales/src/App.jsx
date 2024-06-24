import { Route, Routes } from "react-router-dom";
import OrdersPage from "./pages/OrdersPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<OrdersPage />} />
      <Route path="/payment" element={<PaymentPage />} />
    </Routes>
  );
}
export default App;
