import { NavLink } from "react-router-dom";
import { FaClipboardList, FaHistory } from "react-icons/fa";
import { MdProductionQuantityLimits, MdCategory } from "react-icons/md";

const getClassName = ({ isActive }) =>
  `p-4 block cursor-pointer  ${
    isActive
      ? "bg-gray-700 border-l-[0.15rem] border-white  flex items-center    "
      : "hover:bg-gray-700 flex items-center"
  }`;

const Sidebar = () => {
  return (
    <div className="h-screen w-56 bg-gray-800  text-white flex-shrink-0">
      <div className="p-4 text-2xl font-bold border-b  border-gray-700  ">
        FinalProjectPOS
      </div>
      <ul className="mt-4">
        <li>
          <NavLink to="/" className={getClassName}>
            <FaClipboardList className="mr-2" /> Order
          </NavLink>
        </li>
        <li>
          <NavLink to="/history" className={getClassName}>
            <FaHistory className="mr-2" /> Riwayat
          </NavLink>
        </li>
        <li>
          <NavLink to="/produk" className={getClassName}>
            <MdProductionQuantityLimits className="mr-2" /> Produk
          </NavLink>
        </li>
        <li>
          <NavLink to="/kategori" className={getClassName}>
            <MdCategory className="mr-2" /> Kategori
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
