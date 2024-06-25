import useSWR from "swr";
import axios from "axios";

const getTransactionDetail = (url) => axios.get(url).then((res) => res.data);

const useTransactionDetail = (transaction_id) => {
  const { data, error } = useSWR(
    `http://localhost:8080/pos/api/listtransaksidetail/${transaction_id}`,
    getTransactionDetail
  );

  console.log("Transactions data:", data);
  console.log("Transactions error:", error);

  return {
    transactionDetail: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useTransactionDetail;
