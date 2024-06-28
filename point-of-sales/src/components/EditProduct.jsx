import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import useCategories from "../hooks/useCategories";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import useProductDetail from "../hooks/useProductDetail";

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
        typeof originalValue === "string" && originalValue.trim() === ""
          ? null
          : value
      )
      .typeError("Harga satuan harus angka")
      .positive("Harga harus lebih besar dari 0")
      .required("Harga satuan wajib diisi"),
  })
  .required();

const EditProductForm = () => {
  const {
    categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();
  const { id } = useParams();
  const navigate = useNavigate();

  const { productDetail, isError } = useProductDetail(id);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (productDetail) {
      reset(productDetail);
    }
  }, [productDetail, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `http://localhost:8080/pos/api/updateproduct/${id}`,
        data
      );
      Swal.fire({
        title: "Success!",
        text: "Produk berhasil diperbarui",
        icon: "success",
      });
      navigate("/produk");
    } catch (error) {
      console.log("Full error object:", error);
      let errorMessage = "Gagal memperbarui produk";

      // validasi error jika nama produknya sudah ada
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

  if (isCategoriesLoading) {
    return <div>Loading...</div>;
  }

  if (isCategoriesError) {
    return <div>Error loading categories: {isCategoriesError.message}</div>;
  }

  if (!productDetail) {
    return <div>Loading product...</div>;
  }

  if (isError) {
    return <div>Error loading product: {isError.message}</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Edit Produk</h2>
        <button className="">
          <Link to="/produk" className="bg-gray-200 rounded px-4 py-2">
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
          Perbarui Produk
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
