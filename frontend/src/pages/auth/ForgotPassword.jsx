import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidLock } from "react-icons/bi";
import { Form, Input, Button } from "antd";

import { notify } from "@utils/notify";
import axiosInstance from "@utils/axiosInstance";

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axiosInstance.post("/auth/forgot-password", values);
      //
      notify(
        "success",
        "Gửi liên kết thành công",
        "Chúng tôi đã gửi liên kết đặt lại mật khẩu đến email của bạn.",
        2
      );
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Đã có lỗi xảy ra";
      notify("error", "Gửi liên kết thất bại ", errorMessage, 2);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full custom-height flex items-center justify-center text-white font-light bg-gradient-to-b from-lightGreen to-white">
      <div className="authContainer max-w-[40%]">
        <BiSolidLock className="h-14 w-auto" />
        <h2>Quên mật khẩu</h2>
        <p>Bạn gặp sự cố khi đăng nhập?</p>

        <div className="max-w-[50%] mx-auto">
          <p>
            Nhập email người dùng của bạn và chúng tôi sẽ gửi cho bạn một liên
            kết để truy cập lại vào tài khoản.
          </p>
        </div>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email của bạn" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full submitButton"
            >
              Gửi liên kết
            </Button>
            <p>
              <Link
                to="/auth/login"
                className="text-white font-bold no-underline hover:underline hover:text-blue-300"
              >
                Trở lại đăng nhập
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
