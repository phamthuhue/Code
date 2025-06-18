import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CPagination,
  CPaginationItem,
} from '@coreui/react'

const UserTable = ({
  users = [],
  currentPage,
  totalPages,
  setCurrentPage,
  handleEdit,
  handleDeleteClick,
}) => {
  const getReadableRoleName = (role) => {
    const roleNames = {
      user: 'Người dùng',
      staff: 'Nhân viên',
      admin: 'Quản trị viên',
    }

    return roleNames[role] || role // Trả về tên dễ đọc nếu có, nếu không trả về role gốc
  }
  return (
    <>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Tên đăng nhập
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Email</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Số điện thoại
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Địa chỉ</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Giới tính</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Ngày sinh</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Vai trò</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Hành động</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {users.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="8" className="text-center text-muted py-4">
                Không có người dùng nào để hiển thị.
              </CTableDataCell>
            </CTableRow>
          ) : (
            users.map((user, index) => (
              <CTableRow key={index}>
                <CTableDataCell className="text-center">{user.username}</CTableDataCell>
                <CTableDataCell className="text-center">{user.email}</CTableDataCell>
                <CTableDataCell className="text-center">{user.phone}</CTableDataCell>
                <CTableDataCell className="text-center">{user.address}</CTableDataCell>
                <CTableDataCell className="text-center">{user.gender}</CTableDataCell>
                <CTableDataCell className="text-center">{user.yearob}</CTableDataCell>
                <CTableDataCell className="text-center">
                  {getReadableRoleName(user.role?.name) || 'Không xác định'}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <CButton
                      color="warning"
                      size="sm"
                      variant="outline"
                      className="me-2"
                      onClick={() => handleEdit(user)}
                    >
                      Sửa
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteClick(user)}
                    >
                      Xoá
                    </CButton>
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))
          )}
        </CTableBody>
      </CTable>

      {totalPages > 0 && (
        <div className="d-flex justify-content-center mt-3">
          <CPagination align="center">
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &laquo;
            </CPaginationItem>

            {[...Array(totalPages)].map((_, i) => (
              <CPaginationItem
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </CPaginationItem>
            ))}

            <CPaginationItem
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &raquo;
            </CPaginationItem>
          </CPagination>
        </div>
      )}
    </>
  )
}

export default UserTable
