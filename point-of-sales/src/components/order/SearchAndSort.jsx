import { useState, useEffect } from "react";
import { debounce } from "lodash";

const SearchAndSort = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
}) => {
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery);

  const debouncedSetSearchQuery = debounce(setSearchQuery, 1500);

  useEffect(() => {
    debouncedSetSearchQuery(tempSearchQuery);
    return () => {
      debouncedSetSearchQuery.cancel();
    };
  }, [tempSearchQuery, debouncedSetSearchQuery]);

  const onSearchChange = (e) => {
    setTempSearchQuery(e.target.value);
  };

  return (
    <div className="flex mb-4">
      <input
        type="text"
        placeholder="Cari Nama Produk"
        className="border p-2 mr-4 flex-grow"
        value={tempSearchQuery}
        onChange={onSearchChange}
      />
      <select
        className="border p-2"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="title_asc">Nama Produk A-Z</option>
        <option value="title_desc">Nama Produk Z-A</option>
        <option value="price_asc">Harga Terendah</option>
        <option value="price_desc">Harga Tertinggi</option>
      </select>
    </div>
  );
};

export default SearchAndSort;
