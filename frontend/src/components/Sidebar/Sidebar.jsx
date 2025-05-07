import { FaRegListAlt, FaUsers, FaChartBar } from "react-icons/fa";

const Sidebar = () => (
  <aside className="bg-gray-800 text-white w-64 h-full p-4">
    <nav className="flex flex-col gap-4">
      <a href="#" className="flex items-center gap-2 hover:text-yellow-400">
        <FaRegListAlt /> Quản lý Tour
      </a>
      <a href="#" className="flex items-center gap-2 hover:text-yellow-400">
        <FaUsers /> Quản lý Đơn đặt
      </a>
      <a href="#" className="flex items-center gap-2 hover:text-yellow-400">
        <FaChartBar /> Thống kê
      </a>
    </nav>
  </aside>
);

export default Sidebar;
