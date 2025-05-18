import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiSolidMedal } from "react-icons/bi";
import { Form, Input, Button } from "antd";

import { notify } from "@utils/notify";
import axiosInstance from "@utils/axiosInstance";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axiosInstance.post(`/auth/reset-password/${token}`, {
        password: values.password,
      });
      notify(
        "success",
        "Thành công",
        "Bạn đã đặt lại mật khẩu thành công. Hãy đăng nhập lại.",
        2
      );
      navigate("/auth/login");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Đã có lỗi xảy ra";
      notify("error", "Lỗi", errorMsg, 2);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full custom-height flex items-center justify-center text-white font-light bg-gradient-to-b from-lightGreen to-white">
      <div className="authContainer max-w-[40%]">
        <BiSolidMedal className="h-14 w-auto" />
        <h2>Đặt lại mật khẩu</h2>
        <p>Nhập mật khẩu mới cho tài khoản của bạn</p>

        <Form
          name="reset-password"
          layout="vertical"
          onFinish={onFinish}
          requiredMark="optional"
        >
          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới!",
              },
              {
                min: 4,
                message: "Mật khẩu phải có ít nhất 4 ký tự!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Nhập mật khẩu mới" />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận lại mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Xác nhận lại mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full submitButton"
            >
              Đặt lại mật khẩu
            </Button>
            <p className="mt-2">
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
