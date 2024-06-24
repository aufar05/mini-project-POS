import { useState, useCallback } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import { FormatRupiah } from "../utils/FormatRupiah";
import {
  addProduct,
  decrementQuantity,
  incrementQuantity,
  removeProduct,
} from "../store/reducers/ordersSlice";

const Orders = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { products, isLoading, isError } = useProducts(selectedCategory);
  const {
    categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useCategories();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const handleCategoryClick = useCallback((categoryId) => {
    console.log("Category clicked:", categoryId);
    setSelectedCategory(categoryId);
  }, []);

  const handleProductClick = (product) => {
    dispatch(addProduct(product));
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct({ id }));
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity({ id }));
  };

  if (isError || isErrorCategories) return <div>Failed to load</div>;
  if (isLoading || isLoadingCategories) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>

        <div className="grid grid-rows-2 grid-cols-4 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group p-4 border rounded cursor-pointer bg-white hover:bg-blue-100 flex flex-col items-center"
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="aspect-square transition-opacity duration-300 group-hover:opacity-75"
              />
              <h3 className="text-sm font-semibold text-center">
                {product.title}
              </h3>
              <p className="text-center">{FormatRupiah(product.price)}</p>
            </div>
          ))}
        </div>
        <div className="flex space-x-2 overflow-x-auto pt-8">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`p-2 rounded ${
              selectedCategory === null
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Semua
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`p-2 rounded ${
                selectedCategory === category.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="w-1/4 p-4 bg-white border-l-2">
        <h2 className="text-2xl font-bold mb-4">Order List</h2>
        {orders.items.length > 0 ? (
          <div className="space-y-4">
            {orders.items.map((order) => (
              <div key={order.id} className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm max-w-40 font-semibold">
                    {order.title}
                  </h3>
                  <p className="text-sm">Quantity: {order.quantity}</p>
                  <p className="text-sm">{FormatRupiah(order.totalPrice)}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDecrementQuantity(order.id)}
                    className="bg-gray-200 p-2 rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleIncrementQuantity(order.id)}
                    className="bg-gray-200 p-2 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveProduct(order.id)}
                    className="text-red-500  "
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <p className="text-xl font-bold">
                Total: {FormatRupiah(orders.total)}
              </p>
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
        )}
      </div>
    </div>
  );
};

export default Orders;
