// routes/AdminRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import { AdminTour } from "pages/admin/AdminTour";
import { AdminUser } from "pages/admin/AdminUser";
export const AdminRoutes = () => (
  // Các route admin bên dưới đều được bảo vệ bởi RequireAdmin nghĩa là role của user phải là admin mới có thể truy cập
  // Luôn bắt đầu bằng /admin
  // Ví dụ /admin/tours
  <>
    <Route path="tours" element={<AdminTour />} />
    <Route path="users" element={<AdminUser />} />
  </>
);
