import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import useTransactionDetail from "../hooks/useTransactionDetail";
import { FormatRupiah } from "../utils/FormatRupiah";
import { FaSort } from "react-icons/fa";
import Loading from "../utils/Loading";

const HistoryDetail = () => {
  const { id } = useParams();
  const { transactionDetail, isLoading, isError } = useTransactionDetail(id);

  const columns = useMemo(
    () => [
      {
        accessorKey: "product_id",
        header: "ID Produk",
      },
      {
        accessorKey: "product_name",
        header: "Nama Produk",
      },
      {
        accessorKey: "product_price",
        header: "Harga Satuan",
        cell: (info) => FormatRupiah(info.getValue()),
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "sub_total",
        header: "Sub Total",
        cell: (info) => FormatRupiah(info.getValue()),
      },
    ],
    []
  );

  const data = useMemo(() => transactionDetail || [], [transactionDetail]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize: 5 },
    },
  });

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (isError) return <div>Error loading transaction details</div>;

  const firstDetail = transactionDetail && transactionDetail[0];

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Detail Transaksi</h2>
        <button className="">
          <Link to="/history" className=" bg-gray-200 rounded px-4 py-2 ">
            {"<"} Kembali
          </Link>
        </button>
      </div>
      <hr className="min-h-1 bg-black mb-8" />
      {firstDetail && (
        <table className=" bg-white  mb-4">
          <tbody>
            <tr>
              <td className="px-2 py-2 ">
                <strong>ID Transaksi</strong>
              </td>
              <td className="pl-8">:</td>
              <td className=" px-2 py-2 ">{firstDetail?.transaction_id}</td>
            </tr>
            <tr>
              <td className="px-2 py-2 ">
                <strong>Tanggal Transaksi</strong>
              </td>
              <td className="pl-8">:</td>
              <td className="px-2 py-2 ">{firstDetail?.transaction_date}</td>
            </tr>
            <tr>
              <td className="px-2 py-2 ">
                <strong>Total Harga</strong>
              </td>
              <td className="pl-8">:</td>
              <td className="px-2 py-2 ">
                {FormatRupiah(firstDetail?.total_amount)}
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2 ">
                <strong>Total Bayar</strong>
              </td>
              <td className="pl-8">:</td>
              <td className="px-2 py-2 ">
                {FormatRupiah(firstDetail?.total_pay)}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {transactionDetail && (
        <>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
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
        </>
      )}
    </div>
  );
};

export default HistoryDetail;
