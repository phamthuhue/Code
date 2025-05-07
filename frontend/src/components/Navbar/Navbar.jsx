import React from "react";

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <div>
          <button className="bg-blue-500 px-4 py-2 rounded">Đăng Xuất</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
