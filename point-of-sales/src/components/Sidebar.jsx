const Sidebar = () => {
  return (
    <div className="h-screen w-56 bg-gray-800 text-white">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        FinalProjectPOS
      </div>
      <ul className="mt-4">
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Order</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Riwayat</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Produk</li>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">Kategori</li>
      </ul>
    </div>
  );
};

export default Sidebar;
