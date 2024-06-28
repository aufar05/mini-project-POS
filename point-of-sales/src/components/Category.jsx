import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "axios";
import { mutate } from "swr";
import { FaSort } from "react-icons/fa";
import useCategoriesTable from "../hooks/useCategoriesTable";

const Category = () => {
  const {
    categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategoriesTable();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID Kategori",
      },
      {
        accessorKey: "name",
        header: "Nama Kategori",
      },
      {
        accessorKey: "productCount",
        header: "Jumlah Produk Terkait",
      },
      {
        accessorKey: "actions",
        header: "Action",
        enableSorting: false,
        cell: (info) => (
          <div className="flex gap-2">
            <Link
              to={`/kategori/${info.row.original.id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg text-sm transition duration-300 ease-in-out"
            >
              Detail
            </Link>
            <Link
              to={`/kategori/edit/${info.row.original.id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-lg text-sm transition duration-300 ease-in-out"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(info.row.original.id)}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-lg text-sm transition duration-300 ease-in-out"
            >
              Hapus
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const data = useMemo(() => categories || [], [categories]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize: 10 },
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: `Apakah Anda ingin menghapus Kategori dengan id ${id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(id);
      }
    });
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/pos/api/deletecategory/${id}`);
      mutate("http://localhost:8080/pos/api/listcategories/with-product-count");
      Swal.fire({
        title: "Deleted!",
        text: "Kategori berhasil dihapus",
        icon: "success",
      });
    } catch (error) {
      console.error("Error deleting data:", error);
      if (
        error.response &&
        typeof error.response.data === "string" &&
        error.response.data.includes(
          "Kategori sudah memiliki produk yang terkait"
        )
      ) {
        Swal.fire({
          title: "Gagal menghapus",
          text: "Kategori tidak bisa dihapus karena sudah ada produk yang terkait",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Gagal menghapus",
          text: "Gagal Menghapus kategori ",
          icon: "error",
        });
      }
    }
  };

  if (isCategoriesLoading) return <div>Loading...</div>;
  if (isCategoriesError) return <div>Error loading categories</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Daftar Kategori</h2>
        <Link
          to="/kategori/tambah-kategori"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Tambah Kategori
        </Link>
      </div>
      <table className="min-w-full bg-white border">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 border text-left relative"
                >
                  <div className="flex items-center">
                    {header.column.getCanSort() && (
                      <FaSort
                        className="mr-2 cursor-pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      />
                    )}
                    {header.column.columnDef.header}
                    <span className="absolute right-0 mr-4">
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex mt-4 justify-between">
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <div>
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 ml-2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
