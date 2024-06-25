import axios from "axios";
import useSWR from "swr";

const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const useProducts = (category_id, searchQuery, sortOption) => {
  let url = `http://localhost:8080/pos/api/listproduct`;

  // nambahin id kategori jika ada
  if (category_id) {
    url += `?category_id=${category_id}`;
  }

  // nambahin searchQuery jika ada
  if (searchQuery) {
    url += `${category_id ? "&" : "?"}title=${searchQuery}`;
  }

  // nentuin sort_by dan sort_order berdasarkan sortOption
  const [sortBy, sortOrder] = sortOption.split("_");
  url += `${
    searchQuery || category_id ? "&" : "?"
  }sort_by=${sortBy}&sort_order=${sortOrder}`;

  const { data: products, error } = useSWR(url, fetcher);

  return {
    products: products || [],
    isLoading: !products && !error,
    isError: error,
  };
};

export default useProducts;
