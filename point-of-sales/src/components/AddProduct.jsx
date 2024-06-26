import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import useCategories from "../hooks/useCategories";
import { Link } from "react-router-dom";

const schema = yup
  .object({
    title: yup
      .string()
      .required("Nama produk wajib diisi")
      .min(2, "karakter minimal 2")
      .max(100, "karakter maksimal 100"),
    category_id: yup.string().required("Kategori wajib dipilih"),
    image: yup
      .string()
      .url("Masukkan URL yang valid")
      .required("URL gambar wajib diisi"),
    price: yup
      .number("Harga satuan harus angka")
      .transform((value, originalValue) =>
        originalValue.trim() === "" ? null : value
      )
      .typeError("Harga satuan harus angka")
      .positive("Harga harus lebih besar dari 0")
      .required("Harga satuan wajib diisi"),
  })
  .required();

const AddProductForm = () => {
  const { categories, isLoading, isError } = useCategories();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8080/pos/api/addproduct", data);
      Swal.fire({
        title: "Success!",
        text: "Produk berhasil ditambahkan",
        icon: "success",
      });
      reset();
    } catch (error) {
      console.log("Full error object:", error);
      let errorMessage = "Gagal menambahkan produk";

      // validasi error jika nama produknya udah ada
      if (
        error.response &&
        typeof error.response.data === "string" &&
        error.response.data.includes("Title sudah digunakan")
      ) {
        errorMessage = "Title sudah digunakan";
      }

      console.log("Error message:", errorMessage);

      if (errorMessage.includes("Title sudah digunakan")) {
        setError("title", {
          type: "manual",
          message: "Title sudah digunakan",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
        });
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading categories: {isError.message}</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Form Produk</h2>
        <button className="">
          <Link to="/produk" className=" bg-gray-200 rounded px-4 py-2 ">
            {"<"} Kembali
          </Link>
        </button>
      </div>
      <hr className="min-h-1 bg-black mb-8" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2">Nama Produk</label>
          <input
            type="text"
            {...register("title")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Kategori</label>
          <select
            {...register("category_id")}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Pilih Kategori</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-red-500 text-sm">{errors.category_id.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">URL Gambar</label>
          <input
            type="text"
            {...register("image")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-2">Harga Satuan</label>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Tambah Produk
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;