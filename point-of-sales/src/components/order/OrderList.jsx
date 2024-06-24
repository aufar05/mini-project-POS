import { MdDelete } from "react-icons/md";
import { FormatRupiah } from "../../utils/FormatRupiah";

const OrderList = ({
  orders,
  onRemoveProduct,
  onIncrementQuantity,
  onDecrementQuantity,
}) => {
  return orders.items.length > 0 ? (
    <div className="space-y-4">
      {orders.items.map((order) => (
        <div key={order.id} className="flex justify-between items-center">
          <div>
            <h3 className="text-sm max-w-40 font-semibold">{order.title}</h3>
            <p className="text-sm">Quantity: {order.quantity}</p>
            <p className="text-sm">{FormatRupiah(order.totalPrice)}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onDecrementQuantity(order.id)}
              className="bg-gray-200 p-2 rounded"
            >
              -
            </button>
            <button
              onClick={() => onIncrementQuantity(order.id)}
              className="bg-gray-200 p-2 rounded"
            >
              +
            </button>
            <button
              onClick={() => onRemoveProduct(order.id)}
              className="text-red-500"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4">
        <p className="text-xl font-bold">Total: {FormatRupiah(orders.total)}</p>
        <button className="w-full p-2 mt-2 bg-blue-500 text-white rounded">
          Bayar
        </button>
      </div>
    </div>
  ) : (
    <div>
      <dotlottie-player
        src="https://lottie.host/795e7a29-7fac-453b-a350-f54ac5231697/aXk0vj2poA.json"
        background="transparent"
        speed="1"
        loop
        autoplay
      ></dotlottie-player>{" "}
      <p className="text-center font-semibold">
        Belum Ada Produk yang di order
      </p>
    </div>
  );
};

export default OrderList;
