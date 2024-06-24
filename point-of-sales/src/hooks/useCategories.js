import useSWR from "swr";
import axios from "axios";

const getCategories = (url) => axios.get(url).then((res) => res.data);

const useCategories = () => {
  const { data, error } = useSWR(
    "http://localhost:8080/pos/api/listcategories",
    getCategories
  );

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useCategories;
