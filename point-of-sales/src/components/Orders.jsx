import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import {
  addProduct,
  decrementQuantity,
  incrementQuantity,
  removeProduct,
} from "../store/reducers/ordersSlice";
import ProductList from "./order/ProductList";
import FilterCategory from "./order/FilterCategory";
import OrderList from "./order/OrderList";
import SearchAndSort from "./order/SearchAndSort";

const Orders = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("title_asc");

  const { products, isLoading, isError } = useProducts(
    selectedCategory,
    searchQuery,
    sortOption
  );
  const {
    categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useCategories();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const handleCategoryClick = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleProductClick = (product) => {
    dispatch(addProduct(product));
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct({ id }));
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity({ id }));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity({ id }));
  };

  if (isError || isErrorCategories) return <div>Failed to load</div>;
  if (isLoading || isLoadingCategories) return <div>Loading...</div>;

  const selectedCategoryName =
    categories.find((category) => category.id === selectedCategory)?.name ||
    "tersebut";

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-3/4 p-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Product List</h2>
          <SearchAndSort
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>

        <ProductList
          products={products}
          onProductClick={handleProductClick}
          categoryName={selectedCategoryName}
        />
        <FilterCategory
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
        />
      </div>
      <div className="w-1/4 p-4 bg-white border-l-2">
        <h2 className="text-2xl font-bold mb-4">Order List</h2>
        <OrderList
          orders={orders}
          onRemoveProduct={handleRemoveProduct}
          onIncrementQuantity={handleIncrementQuantity}
          onDecrementQuantity={handleDecrementQuantity}
        />
      </div>
    </div>
  );
};

export default Orders;
