const Sidebar = () => {
  return (
    // menambah flex shrink agar ukuran sidebar relatif sama
    <div className="h-screen w-56 bg-gray-800 text-white flex-shrink-0">
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
