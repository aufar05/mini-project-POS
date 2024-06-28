import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import * as yup from "yup";

const schema = yup
  .object({
    name: yup
      .string()
      .required("Nama produk wajib diisi")
      .min(2, "karakter minimal 2")
      .max(100, "karakter maksimal 100"),
  })
  .required();

const AddCategoryForm = () => {
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
      await axios.post("http://localhost:8080/pos/api/addcategory", data);
      Swal.fire({
        title: "Success!",
        text: "Kategori berhasil ditambahkan",
        icon: "success",
      });
      reset();
    } catch (error) {
      console.log("Full error object:", error);
      let errorMessage = "Gagal menambahkan kategori";

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
          Tambah Kategori
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
