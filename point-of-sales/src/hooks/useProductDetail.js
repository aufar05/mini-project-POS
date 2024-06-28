import useSWR from "swr";
import axios from "axios";

const getProductDetail = (url) => axios.get(url).then((res) => res.data);

const useProductDetail = (product_id) => {
  const { data, error } = useSWR(
    `http://localhost:8080/pos/api/detailproduct/${product_id}`,
    getProductDetail
  );

  console.log("produk detail data:", data);
  console.log("produk detail error:", error);

  return {
    productDetail: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useProductDetail;
