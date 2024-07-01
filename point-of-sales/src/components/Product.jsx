import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { Link } from "react-router-dom";
import useProductTable from "../hooks/useProductTable";
import { FormatRupiah } from "../utils/FormatRupiah";
import Swal from "sweetalert2";
import axios from "axios";
import { mutate } from "swr";
import { FaSort } from "react-icons/fa";
import Loading from "../utils/Loading";

const Product = () => {
  const { products, isLoading, isError } = useProductTable();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID Produk",
      },
      {
        accessorKey: "title",
        header: "Nama Produk",
      },
      {
        accessorKey: "price",
        header: "Harga Satuan",
        cell: (info) => FormatRupiah(info.getValue()),
      },
      {
        accessorKey: "category_name",
        header: "Kategori",
      },
      {
        accessorKey: "actions",
        header: "Action",
        enableSorting: false,
        cell: (info) => (
          <div className="flex gap-2">
            <Link
              to={`/produk/${info.row.original.id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg text-sm transition duration-300 ease-in-out"
            >
              Detail
            </Link>
            <Link
              to={`/produk/edit/${info.row.original.id}`}
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

  const data = useMemo(() => products || [], [products]);

  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    initialState: {
      pagination: { pageIndex: 0, pageSize: 10 },
    },
  });

  const titleFilter = columnFilters.find((f) => f.id === "title")?.value || "";

  const onFilterChange = (id, value) => {
    setColumnFilters((prev) => [
      ...prev.filter((f) => f.id !== id),
      { id, value },
    ]);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: `Apakah Anda ingin menghapus Produk dengan id ${id}?`,
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
      await axios.delete(`http://localhost:8080/pos/api/deleteproduct/${id}`);
      mutate("http://localhost:8080/pos/api/listproduct");
      Swal.fire({
        title: "Deleted!",
        text: "Produk berhasil dihapus",
        icon: "success",
      });
    } catch (error) {
      console.error("Error deleting data:", error);

      if (
        error.response &&
        typeof error.response.data === "string" &&
        error.response.data.includes("Produk sudah ada di riwayat transaksi")
      ) {
        Swal.fire({
          title: "Gagal menghapus",
          text: "Produk tidak bisa dihapus karena sudah ada pada riwayat transaksi",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Gagal menghapus",
          text: "Gagal Menghapus produk ",
          icon: "error",
        });
      }
    }
  };

  if (isLoading)
    return (
      <div>
        {" "}
        <Loading />
      </div>
    );
  if (isError) return <div>Error loading products</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Daftar Produk</h2>
        <Link
          to="/produk/tambah-produk"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Tambah Produk
        </Link>
      </div>
      <div className="justify-start  mb-4">
        <input
          type="text"
          placeholder="Cari Produk"
          value={titleFilter}
          onChange={(e) => onFilterChange("title", e.target.value)}
          className="py-2 px-4 border rounded"
        />
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

export default Product;
