import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";
import useCategoryDetail from "../hooks/useCategoryDetail";

const schema = yup
  .object({
    name: yup
      .string()
      .required("Nama produk wajib diisi")
      .min(2, "karakter minimal 2")
      .max(100, "karakter maksimal 100"),
  })
  .required();

const EditCategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categoryDetail, isError } = useCategoryDetail(id);
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
    if (categoryDetail) {
      reset(categoryDetail);
    }
  }, [categoryDetail, reset]);

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `http://localhost:8080/pos/api/updatecategory/${id}`,
        data
      );
      Swal.fire({
        title: "Success!",
        text: "Kategori berhasil diperbarui",
        icon: "success",
      });
      navigate("/kategori");
    } catch (error) {
      console.log("Full error object:", error);
      let errorMessage = "Gagal memperbarui kategori";

      // validasi error jika nama kategori sudah ada
      if (
        error.response &&
        typeof error.response.data === "string" &&
        error.response.data.includes("Nama kategori sudah digunakan")
      ) {
        errorMessage = "Nama kategori sudah digunakan";
      }

      console.log("Error message:", errorMessage);

      if (errorMessage.includes("Nama kategori sudah digunakan")) {
        setError("name", {
          type: "manual",
          message: "Nama kategori sudah digunakan",
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

  if (!categoryDetail) {
    return <div>Loading category...</div>;
  }

  if (isError) {
    return <div>Error loading product: {isError.message}</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Form Kategori</h2>
        <button className="">
          <Link to="/kategori" className=" bg-gray-200 rounded px-4 py-2 ">
            {"<"} Kembali
          </Link>
        </button>
      </div>
      <hr className="min-h-1 bg-black mb-8" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2">Nama Kategori</label>
          <input
            type="text"
            {...register("name")}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Perbarui Kategori
        </button>
      </form>
    </div>
  );
};

export default EditCategoryForm;
