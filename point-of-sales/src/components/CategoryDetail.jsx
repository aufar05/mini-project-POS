import { Link, useParams } from "react-router-dom";
import useCategoryDetail from "../hooks/useCategoryDetail";

const CategoryDetail = () => {
  const { id } = useParams();
  const { categoryDetail, isLoading, isError } = useCategoryDetail(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error </div>;

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Detail Kategori</h2>
        <button className="">
          <Link to="/kategori" className=" bg-gray-200 rounded px-4 py-2 ">
            {"<"} Kembali
          </Link>
        </button>
      </div>
      <hr className="min-h-1 bg-black mb-8" />

      <table className=" bg-white  mb-4">
        <tbody>
          <tr>
            <td className="px-2 py-2 ">
              <strong>ID Kategori</strong>
            </td>
            <td className="pl-8">:</td>
            <td className=" px-2 py-2 ">{categoryDetail.id}</td>
          </tr>
          <tr>
            <td className="px-2 py-2 w-52 ">
              <strong>Nama Kategori</strong>
            </td>
            <td className="pl-8">:</td>
            <td className="px-2 py-2 ">{categoryDetail.name}</td>
          </tr>
          <tr>
            <td className="px-2 py-2 ">
              <strong>Jumlah Produk Terkait</strong>
            </td>
            <td className="pl-8">:</td>
            <td className="px-2 py-2 ">{categoryDetail.productCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CategoryDetail;
