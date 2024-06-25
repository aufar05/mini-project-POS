import { FormatRupiah } from "../../utils/FormatRupiah";

const OrderDetails = ({ orders }) => {
  return (
    <div className="flex flex-col gap-4">
      {orders.items.map((order) => (
        <div
          key={order.id}
          className="p-4 border rounded bg-white flex items-center"
        >
          <img
            src={order.image}
            alt={order.title}
            className="w-24 h-24 object-cover mr-4"
          />
          <div className="flex flex-row justify-between w-full">
            <div>
              <h3 className="text-sm font-semibold">{order.title}</h3>
              <p className="text-sm">{FormatRupiah(order.price)}</p>
            </div>

            <div className="flex space-x-4">
              <p className="text-sm">{order.quantity} X </p>
              <p className="text-sm font-bold">
                {FormatRupiah(order.totalPrice)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
