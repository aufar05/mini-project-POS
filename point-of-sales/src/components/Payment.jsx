import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearOrders } from "../store/reducers/ordersSlice";

import axios from "axios";
import OrderDetails from "./payment/OrderDetails";
import PaymentForm from "./payment/PaymentForm";

const Payment = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total = orders.total;

  const handleCompletePayment = async (amountPaid) => {
    const transactionDetails = orders.items.map((order) => ({
      product_id: order.id,
      quantity: order.quantity,
      sub_total: order.totalPrice,
    }));

    const transactionData = {
      total_amount: total,
      total_pay: amountPaid,
      transaction_details: transactionDetails,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/pos/api/addtransaction",
        transactionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Pembayaran selesai!");
        dispatch(clearOrders());
        navigate("/");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-3/4 p-4 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Rincian Pesanan</h2>
        <OrderDetails orders={orders} />
      </div>
      <PaymentForm total={total} onCompletePayment={handleCompletePayment} />
    </div>
  );
};

export default Payment;
