import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaRegPaperPlane, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { Modal } from "antd";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [logo, setLogo] = useState(false);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <NavLink to={"/group-tour-request"} className="nav">
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
            <div className="flex items-center relative" ref={dropdownRef}>
              <div
                className="flex justify-between items-center mr-2 cursor-pointer p-2 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-md border border-gray-300 hover:border-blue-500"
                onClick={handleToggleDropdown}
              >
                <FaUserCircle
                  size={30}
                  className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
                />
                <span className="font-semibold text-gray-800 ml-2 text-lg">
                  {user.info.username}
                </span>
              </div>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border rounded shadow p-2 w-40 z-50">
                  <button
                    onClick={() => navigate("/auth/change-password")}
                    className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded"
                  >
                    Đổi mật khẩu
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left hover:bg-gray-100 px-2 py-1 rounded"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex">
              <button
                onClick={() => navigate("/auth/login")}
                className="mr-2 buttonWhite"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => navigate("/auth/register")}
                className="buttonBlue"
              >
                Đăng ký
              </button>
            </div>
          )}
        </div>

        <div onClick={handleOpen} className="md:hidden z-20 cursor-pointer">
          {open ? (
            <AiOutlineClose size={20} className="absolute right-6 top-6" />
          ) : (
            <AiOutlineMenu size={20} />
          )}
        </div>
      </div>
    </div>
  );
};
