import { useState, useEffect } from "react";

const SearchAndSort = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(localSearchQuery);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [localSearchQuery, setSearchQuery]);

  const onSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  return (
    <div className="flex mb-4">
      <input
        type="text"
        placeholder="Cari Nama Produk"
        className="border p-2 mr-4 flex-grow"
        value={localSearchQuery}
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
