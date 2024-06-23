//Data dummy
const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 150 },
  { id: 3, name: "Product 3", price: 200 },
];

const Orders = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-3/4 p-4">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded cursor-pointer bg-white hover:bg-blue-100"
            >
              <h3 className="text-xl">{product.name}</h3>
              <p>Rp. {product.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/4 p-4 bg-white border-l-2">
        <h2 className="text-2xl font-bold mb-4">Order List</h2>

        <div className="mt-4">
          <p className="text-xl font-bold">Total: Rp. </p>
          <button className="w-full p-2 mt-2 bg-blue-500 text-white rounded">
            Bayar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
