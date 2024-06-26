import useSWR from "swr";
import axios from "axios";

const getProducts = (url) => axios.get(url).then((res) => res.data);

const useProductTable = () => {
  const { data, error } = useSWR(
    "http://localhost:8080/pos/api/listproduct",
    getProducts
  );

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProductTable;
