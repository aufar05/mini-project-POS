import useSWR from "swr";
import axios from "axios";

const getCategoryDetail = (url) => axios.get(url).then((res) => res.data);

const useCategoryDetail = (id) => {
  const { data, error } = useSWR(
    `http://localhost:8080/pos/api/listcategories/with-product-count/${id}`,
    getCategoryDetail
  );

  return {
    categoryDetail: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useCategoryDetail;
