import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { FaRegPaperPlane } from "react-icons/fa";

export const PaymentLayout = () => {
  return (
    <>
      {/* Header đơn giản: chỉ logo giữa */}

      <div className="flex items-center justify-center h-20 ">
        <div className={"flex cursor-pointer"}>
          <FaRegPaperPlane className="text-xl mt-1 mr-1" />
          <h4>VIETNAMTOURS</h4>
        </div>
      </div>

      {/* Nội dung chính căn giữa */}
      <main className="min-h-[69vh] flex justify-center items-center ">
        <div className="w-full max-w-xl">
          <Outlet />
        </div>
      </main>

      {/* Footer giữ nguyên */}
      <Footer />
    </>
  );
};
