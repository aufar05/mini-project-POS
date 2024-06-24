const FilterCategory = ({ categories, selectedCategory, onCategoryClick }) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pt-8">
      <button
        onClick={() => onCategoryClick(null)}
        className={`p-2 rounded ${
          selectedCategory === null ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Semua
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryClick(category.id)}
          className={`p-2 rounded ${
            selectedCategory === category.id
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default FilterCategory;
