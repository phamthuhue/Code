import React, { useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { AuthContext } from "../../context/AuthContext";

import axiosInstance from "@utils/axiosInstance";
import { notify } from "@utils/notify";
import { Button, Form, Input } from "antd";
import stylesRegister from "@resources/styles/Register.module.css";
export const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      await axiosInstance.post("/auth/register", credentials);
      dispatch({ type: "REGISTER_SUCCESS" });
      notify(
        "success",
        "Đăng ký thành công",
        "Chào mừng bạn đến với hệ thống!",
        2
      );
      navigate("/auth/login");
    } catch (err) {
      notify(
        "error",
        "Đăng ký thất bại",
        err.response?.data?.message ?? err.message,
        3
      );
    }
  };

  return (
    <div className="w-full custom-height flex items-center justify-center text-white font-light bg-gradient-to-b from-lightGreen to-white">
      <div className="authContainer">
        <div className={stylesRegister.titleForm}>
          <AiOutlineUserAdd className="h-14 w-auto" />
          <h2>Đăng ký</h2>
          <p>
            Bạn đã có tài khoản?{" "}
            <Link
              to="/auth/login"
              className="text-white font-bold no-underline"
            >
              Đăng nhập
            </Link>
          </p>
        </div>

        <Form
          onFinish={handleSubmit} // Hàm xử lý khi submit form
          initialValues={credentials} // Giá trị ban đầu của form
          layout="vertical" // Đặt layout của form
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên đăng nhập!",
              },
              {
                min: 4,
                message: "Tên đăng nhập phải có ít nhất 4 ký tự!",
              },
            ]}
            labelCol={{ span: 24 }} // Đảm bảo label không bị lệch
            wrapperCol={{ span: 24 }} // Căn chỉnh wrapper với label
          >
            <Input
              id="username"
              onChange={handleChange} // Cập nhật giá trị của username
              className="input-field"
              placeholder="Nhập tên đăng nhập của bạn" // Thêm placeholder
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              {
                type: "email",
                message: "Vui lòng nhập email hợp lệ!",
              },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input
              id="email"
              onChange={handleChange} // Cập nhật giá trị của email
              className="input-field"
              placeholder="Nhập email của bạn" // Thêm placeholder
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
              {
                min: 4,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password
              id="password"
              onChange={handleChange} // Cập nhật giá trị của password
              className="input-field"
              placeholder="Nhập mật khẩu của bạn" // Thêm placeholder
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="submitButton"
              block // Để button chiếm hết chiều rộng
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
