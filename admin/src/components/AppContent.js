import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import PrivateRoute from '../components/PrivateRoute' // Import PrivateRoute

const AppContent = () => {
  return (
    <div className="px-4">
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={
                    // Bọc mỗi route bằng PrivateRoute
                    <PrivateRoute>
                      <route.element />
                    </PrivateRoute>
                  }
                />
              )
            )
          })}
          {/* Route mặc định (ví dụ chuyển hướng về dashboard nếu không có route nào phù hợp) */}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default React.memo(AppContent)
