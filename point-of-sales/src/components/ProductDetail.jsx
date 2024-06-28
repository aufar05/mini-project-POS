import { Link, useParams } from "react-router-dom";
import { FormatRupiah } from "../utils/FormatRupiah";
import useProductDetail from "../hooks/useProductDetail";

const ProductDetail = () => {
  const { id } = useParams();
  const { productDetail, isLoading, isError } = useProductDetail(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error </div>;

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Detail Produk</h2>
        <button className="">
          <Link to="/produk" className=" bg-gray-200 rounded px-4 py-2 ">
            {"<"} Kembali
          </Link>
        </button>
      </div>
      <hr className="min-h-1 bg-black mb-8" />
      <div className="flex ">
        <table className=" bg-white  mb-4">
          <tbody>
            <tr>
              <td className="px-2 py-2 ">
                <strong>ID Produk</strong>
              </td>
              <td className="pl-8">:</td>
              <td className=" px-2 py-2 ">{productDetail.id}</td>
            </tr>
            <tr>
              <td className="px-2 py-2 w-40 ">
                <strong>Nama Produk</strong>
              </td>
              <td className="pl-8">:</td>
              <td className="px-2 py-2 ">{productDetail.title}</td>
            </tr>
            <tr>
              <td className="px-2 py-2 ">
                <strong>Harga Satuan</strong>
              </td>
              <td className="pl-8">:</td>
              <td className="px-2 py-2 ">
                {FormatRupiah(productDetail.price)}
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2 ">
                <strong>URL Gambar</strong>
              </td>
              <td className="pl-8">:</td>
              <td className="px-2 py-2 ">{productDetail.image}</td>
            </tr>
            <tr>
              <td className="px-2 py-2 ">
                <strong>ID Kategori</strong>
              </td>
              <td className="pl-8">:</td>
              <td className="px-2 py-2 ">{productDetail.category_id}</td>
            </tr>
            <tr>
              <td className="px-2 py-2 ">
                <strong>Nama Kategori</strong>
              </td>
              <td className="pl-8">:</td>
              <td className="px-2 py-2 ">{productDetail.category_name}</td>
            </tr>
          </tbody>
        </table>

        <img
          src={productDetail.image}
          alt={productDetail.title}
          className="aspect-square max-w-sm "
        />
      </div>
    </div>
  );
};

export default ProductDetail;
