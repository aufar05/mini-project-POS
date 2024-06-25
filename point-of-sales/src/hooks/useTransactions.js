import useSWR from "swr";
import axios from "axios";

const getTransactions = (url) => axios.get(url).then((res) => res.data);

const useTransactions = () => {
  const { data, error } = useSWR(
    "http://localhost:8080/pos/api/listtransaksi",
    getTransactions
  );

  console.log("Transactions data:", data);
  console.log("Transactions error:", error);

  return {
    transactions: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useTransactions;
