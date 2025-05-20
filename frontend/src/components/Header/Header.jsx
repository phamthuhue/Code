import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaRegBell, FaRegPaperPlane, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { Modal } from "antd";
export const Header = () => {
    const [open, setOpen] = useState(false);
    const [logo, setLogo] = useState(false);
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);

    const handleOpen = () => {
        setOpen(!open);
        setLogo(!logo);
    };

    const logout = () => {
        Modal.confirm({
            title: "Xác nhận đăng xuất",
            content: "Bạn có chắc muốn đăng xuất không?",
            okText: "Đồng ý",
            okType: "primary",
            okButtonProps: {
                className: "bg-blue-700  text-white font-semibold",
            },
            cancelText: "Hủy",
            centered: true,
            onOk() {
                dispatch({ type: "LOGOUT" });
                navigate("/");
            },
        });
    };

    return (
        <div className="relative">
            <div className="flex justify-between items-center h-20 px-4">
                <div className={logo ? "hidden" : "flex cursor-pointer"}>
                    <FaRegPaperPlane className="text-xl mt-1 mr-1" />
                    <h4>VIETNAMTOURS</h4>
                </div>

                <ul className="hidden md:flex mt-3 navList">
                    <li>
                        <NavLink to={"/"} className="nav">
                            Trang chủ
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/tours"} className="nav">
                            Danh sách Tour
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/group-tour-request-form"} className="nav">
                            Đặt tour theo Đoàn
                        </NavLink>
                    </li>
                    {user && (
                        <li>
                            <NavLink to={"/history"} className="nav">
                                Lịch sử đặt tour
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className="hidden md:flex">
                    {user ? (
                        <div className="flex items-center">
                            <FaRegBell size={25} className="mr-2" />
                            <FaUserCircle size={30} className="mr-2" />
                            <button className="buttonWhite" onClick={logout}>
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <div className="flex">
                            <button
                                onClick={() => navigate("/login")}
                                className="mr-2 buttonWhite"
                            >
                                Đăng nhập
                            </button>
                            <button
                                onClick={() => navigate("/register")}
                                className="buttonBlue"
                            >
                                Đăng ký
                            </button>
                        </div>
                    )}
                </div>

                <div
                    onClick={handleOpen}
                    className="md:hidden z-20 cursor-pointer"
                >
                    {open ? (
                        <AiOutlineClose
                            size={20}
                            className="absolute right-6 top-6"
                        />
                    ) : (
                        <AiOutlineMenu size={20} />
                    )}
                </div>
            </div>
        </div>
    );
};
