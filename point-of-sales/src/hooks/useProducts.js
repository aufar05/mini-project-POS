import useSWR from "swr";
import axios from "axios";

const getProducts = (url) => axios.get(url).then((res) => res.data);

const useProducts = (categoryId) => {
  const endpoint = categoryId
    ? `http://localhost:8080/pos/api/listproduct?category_id=${categoryId}`
    : "http://localhost:8080/pos/api/listproduct";

  // Tambahkan console.log untuk debugging
  console.log("Fetching from endpoint:", endpoint);

  const { data, error } = useSWR(endpoint, getProducts);

  console.log("Fetched data:", data);
  console.log("Fetch error:", error);

  return {
    products: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProducts;
