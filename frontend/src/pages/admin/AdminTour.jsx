import React from "react";
// import Sidebar from "../components/Sidebar/Sidebar";
// import Navbar from "../components/Navbar";
import TourTable from "../../components/AdminComponent/TourTable";

export const AdminTour = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      <div className="flex-1 ml-64 p-6">
        {/* Navbar */}
        {/* <Navbar /> */}

        <div className="bg-white p-4 rounded shadow mt-6">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">
            Quản lý Tour Du Lịch
          </h2>
          <TourTable />
        </div>
      </div>
    </div>
  );
};
