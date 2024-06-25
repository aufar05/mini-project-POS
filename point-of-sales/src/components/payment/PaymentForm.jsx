import { useState } from "react";
import { FormatRupiah } from "../../utils/FormatRupiah";

const PaymentForm = ({ total, onCompletePayment }) => {
  const [amountPaid, setAmountPaid] = useState(0);
  const change = amountPaid - total;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCompletePayment(amountPaid);
  };

  return (
    <div className="w-1/4 p-4 bg-white border-l-2">
      <h2 className="text-2xl font-bold mb-4">Pembayaran</h2>
      <p className="text-xl font-bold">Total: {FormatRupiah(total)}</p>
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block text-sm font-medium">Jumlah Bayar:</label>
        <input
          type="number"
          value={amountPaid}
          onChange={(e) => setAmountPaid(Number(e.target.value))}
          className="w-full p-2 mt-2 border rounded"
          required
        />
        <div className="mt-4">
          <p className="text-xl font-bold">
            Kembalian: {FormatRupiah(change >= 0 ? change : 0)}
          </p>
        </div>
        <button
          type="submit"
          className={`w-full p-2 mt-2 ${
            amountPaid >= total
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          } rounded`}
          disabled={amountPaid < total}
        >
          Selesaikan
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
