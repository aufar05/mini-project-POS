import useSWR from "swr";
import axios from "axios";

const getCategories = (url) => axios.get(url).then((res) => res.data);

const useCategoriesTable = () => {
  const { data, error } = useSWR(
    "http://localhost:8080/pos/api/listcategories/with-product-count",
    getCategories
  );

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useCategoriesTable;
