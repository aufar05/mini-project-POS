import { useState } from "react";
import { FaSearch } from "react-icons/fa";
const Search = ({ searchQuery, setSearchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const onSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(localSearchQuery);
  };

  return (
    <div className="flex mb-4">
      <input
        type="text"
        placeholder="Cari Nama Produk"
        className="border p-2  flex-grow"
        value={localSearchQuery}
        onChange={onSearchChange}
      />
      <button
        className="border p-2 bg-blue-500 text-white"
        onClick={handleSearch}
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;

// const Search = ({ searchQuery, setSearchQuery }) => {
//   const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setSearchQuery(localSearchQuery);
//     }, 1500);

//     return () => clearTimeout(timeoutId);
//   }, [localSearchQuery, setSearchQuery]);

//   const onSearchChange = (e) => {
//     const value = e.target.value;
//     setLocalSearchQuery(value);
//     // setSearchQuery(value);
//   };

//   return (
//     <div className="flex mb-4">
//       <input
//         type="text"
//         placeholder="Cari Nama Produk"
//         className="border p-2  flex-grow"
//         value={localSearchQuery}
//         onChange={onSearchChange}
//       />
//     </div>
//   );
// };

// export default Search;
