import { FormatRupiah } from "../../utils/FormatRupiah";

const ProductList = ({ products, onProductClick, categoryName }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[78%] mt-4">
        <div className="h-1/2 w-full flex items-center justify-center">
          <dotlottie-player
            src="https://lottie.host/7479226a-bd37-4be7-8bae-2812e9a16dbe/aeqjMiR8eF.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></dotlottie-player>
        </div>
        <p className="text-lg font-semibold">
          {`Produk dalam kategori ${categoryName} masih belum ada.`}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-2 grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="group p-4 border rounded cursor-pointer bg-white hover:bg-blue-100 flex flex-col items-center"
          onClick={() => onProductClick(product)}
        >
          <img
            src={product.image}
            alt={product.title}
            className="aspect-square transition-opacity duration-300 group-hover:opacity-75"
          />
          <h3 className="text-sm font-semibold text-center">{product.title}</h3>
          <p className="text-center">{FormatRupiah(product.price)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
