// src/pages/NotFound.js
import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn tìm kiếm không tồn tại."
        extra={
          <Button type="default">
            <Link to="/home" className=" no-underline">
              Quay về trang chủ
            </Link>
          </Button>
        }
      />
    </div>
  );
};
