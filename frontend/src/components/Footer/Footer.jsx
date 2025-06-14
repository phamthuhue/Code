import axiosInstance from "@utils/axiosInstance";
import React from "react";

import { BsFacebook, BsInstagram } from "react-icons/bs";
import { FaRegPaperPlane } from "react-icons/fa";

export const Footer = () => {
  const handlePayment = async () => {
    try {
      const response = await axiosInstance.post("payment/create-payment", {
        amount: 52000, // Số tiền thanh toán, có thể thay đổi tùy theo tour
        orderInfo: "Thanh toán tour du lịch",
        bookingId: "123456", //
      });

      const { paymentUrl } = response.data;
      console.log("paymentUrl: ", paymentUrl);
      if (paymentUrl) {
        // 🔁 Redirect sang VNPAY
        // ✅ Mở tab mới thay vì redirect hiện tại
        window.open(paymentUrl, "_blank");
      }
    } catch (error) {
      console.error("Lỗi khi tạo payment:", error);
    }
  };
  return (
    <footer className="bottom-0 pt-10 pb-2 px-5 bg-darkGreen text-white text-sm font-light">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-3 lg:place-items-center">
        <div className="my-6 lg:mb-2 max-w-[300px]">
          <div className="flex items-center gap-2 mb-3 text-2xl">
            <FaRegPaperPlane />
            <h4>VietnamTours</h4>
          </div>
          <p className="text-gray">
            Khám phá vẻ đẹp Việt <br></br>Trải nghiệm không giới hạn!
          </p>
          <div className="socialIcons">
            <BsFacebook />
            <BsInstagram />
          </div>
        </div>
        <div className="mb-6 lg:mb-2 footerLinks">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="mb-6 lg:mb-2 footerLinks">
          <h6>Khám phá</h6>
          <div>Trang chủ</div>
          <div>Giới thiệu</div>
          <div>Danh sách Tour</div>
        </div>
        <div className="mb-6 lg:mb-2">
          <h6>Liên hệ</h6>
          <div>+000 00000000</div>
          <div>VietNamTours@email.com</div>
          <div>Hà Nội, Việt Nam</div>
          {/* <button
            onClick={handlePayment}
            className="submitButton rounded-full px-8"
          >
            Đặt ngay
          </button> */}
        </div>
      </div>
    </footer>
  );
};
