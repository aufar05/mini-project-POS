import { MdDelete } from "react-icons/md";
import { FormatRupiah } from "../../utils/FormatRupiah";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearOrders } from "../../store/reducers/ordersSlice";

const OrderList = ({
  orders,
  onRemoveProduct,
  onIncrementQuantity,
  onDecrementQuantity,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBayarClick = () => {
    navigate("/payment");
  };

  return orders.items.length > 0 ? (
    <div className="flex flex-col justify-between h-[90%] overflow-y-auto ">
      <div>
        {orders.items.map((order) => (
          <div
            key={order.id}
            className="flex justify-between items-center mb-4 p-2  bg-white shadow rounded"
          >
            <div className="flex flex-col mr-2 ">
              <h3 className="text-sm font-semibold">{order.title}</h3>
              <p className="text-sm">{FormatRupiah(order.totalPrice)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onDecrementQuantity(order.id)}
                className="bg-gray-200 p-2 rounded"
              >
                -
              </button>
              <span className="text-sm font-semibold">{order.quantity}</span>
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
                <MdDelete size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 bg-white ">
        <p className="text-xl font-bold">Total: {FormatRupiah(orders.total)}</p>
        <button
          onClick={handleBayarClick}
          className="w-full p-2 mt-2 bg-blue-500 text-white rounded"
        >
          Bayar
        </button>
        <button
          className="w-full p-2 mt-2 text-white bg-red-600 rounded"
          onClick={() => {
            dispatch(clearOrders());
          }}
        >
          Reset
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <dotlottie-player
        src="https://lottie.host/795e7a29-7fac-453b-a350-f54ac5231697/aXk0vj2poA.json"
        background="transparent"
        speed="1"
        loop
        autoplay
        className="w-64 h-64"
      ></dotlottie-player>
      <p className="text-center font-semibold mt-4">
        Belum Ada Produk yang di order
      </p>
    </div>
  );
};

export default OrderList;
