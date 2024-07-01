const Sort = ({ sortOption, setSortOption }) => {
  return (
    <div className="flex mb-4">
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

export default Sort;
