import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { Form, Input, Button } from "antd";

import { AuthContext } from "../context/AuthContext";
import { notify } from "@utils/notify";
import axiosInstance from "@utils/axiosInstance";

export const Login = () => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axiosInstance.post("/auth/login", values);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            notify(
                "success",
                "Đăng nhập thành công",
                "Chào mừng bạn đã quay lại!",
                2
            );
            navigate("/");
        } catch (err) {
            const errorMessage =
                err.response?.data?.message || "Đã có lỗi đăng nhập xảy ra";
            notify("error", "Đăng nhập thất bại", errorMessage, 2);
            dispatch({
                type: "LOGIN_FAILURE",
                payload: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full custom-height flex items-center justify-center text-white font-light bg-gradient-to-b from-lightGreen to-white">
            <div className="authContainer">
                <BiUserCircle className="h-14 w-auto" />
                <h2>Đăng nhập</h2>
                <p>
                    Bạn chưa có tài khoản?{" "}
                    <Link
                        to="/register"
                        className="text-white font-bold no-underline"
                    >
                        Đăng ký
                    </Link>
                </p>

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

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu!",
                            },
                        ]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu của bạn" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="w-full submitButton"
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
