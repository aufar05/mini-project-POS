import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import useTransactions from "../hooks/useTransactions";
import { Link } from "react-router-dom";
import { FormatRupiah } from "../utils/FormatRupiah";
import { FaSort } from "react-icons/fa";

const History = () => {
  const { transactions: data, isLoading, isError } = useTransactions();
  const [filterDate, setFilterDate] = useState("");

  const columns = useMemo(
    () => [
      {
        header: "Tanggal Transaksi",
        accessorKey: "transaction_date",
      },
      {
        header: "ID Transaksi",
        accessorKey: "id",
      },
      {
        header: "Total Harga",
        accessorKey: "total_amount",
        cell: (props) => FormatRupiah(props.getValue()),
      },
      {
        header: "Total Bayar",
        accessorKey: "total_pay",
        cell: (props) => FormatRupiah(props.getValue()),
      },
      {
        header: "Action",
        cell: (props) => (
          <Link
            className=" flex justify-center"
            to={`/history/detail-transaksi/${props.row.getValue("id")}`}
          >
            <button className="border-2 border-black bg-blue-600 text-white p-2 w-full">
              Detail Transaksi
            </button>
          </Link>
        ),
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((transaction) =>
      filterDate
        ? new Date(transaction.transaction_date).toISOString().split("T")[0] ===
          filterDate
        : true
    );
  }, [data, filterDate]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading transactions</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Riwayat Transaksi</h2>
        <div className="mb-4 flex items-center space-x-2">
          <label className="block text-sm font-medium mb-2">
            Filter bedasarkan tanggal :
          </label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      </div>
      <table className="min-w-full bg-white text-sm ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-1 border-b-2 border-black   text-left relative"
                >
                  <div className="flex items-center">
                    {header.column.getCanSort() && (
                      <FaSort
                        className="mr-2"
                        onClick={header.column.getToggleSortingHandler()}
                      />
                    )}
                    {header.column.columnDef.header}{" "}
                    <span className="absolute right-0 mr-4">
                      {{
                        asc: " 🔼 ",
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
                <td key={cell.id} className="px-4 py-2 ">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination mt-8">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-1 border"
        >
          {"<<"}
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-1 border"
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 py-1 border"
        >
          {">"}
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="px-2 py-1 border"
        >
          {">>"}
        </button>
        <span className="mx-2">
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="p-1 border"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default History;
