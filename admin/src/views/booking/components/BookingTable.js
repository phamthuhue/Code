import React from 'react'
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
import { formatDate } from '../../../utilis/formatDate'

const BookingTable = ({
  currentBookings = [],
  currentPage,
  totalPages,
  setCurrentPage,
  handleEdit,
  handleGetDetail,
  handleDeleteClick,
}) => {
  return (
    <>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '80px' }}>
              Tên Tour
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '180px' }}>
              Tên khách hàng
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '140px' }}>
              Số điện thoại
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '140px' }}>
              Ngày đặt
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '140px' }}>
              Trạng thái
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '160px' }}>
              Tổng giá (VND)
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '160px' }}>
              Hành động
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentBookings.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="9" className="text-center text-muted py-4">
                Không có dữ liệu đặt tour để hiển thị.
              </CTableDataCell>
            </CTableRow>
          ) : (
            currentBookings.map((booking, index) => (
              <CTableRow key={index}>
                <CTableDataCell className="text-center">{booking.tourId?.title || 'Chưa có dữ liệu'}</CTableDataCell>
                <CTableDataCell>{booking.name}</CTableDataCell>
                <CTableDataCell className="text-center">{booking.phone}</CTableDataCell>
                <CTableDataCell className="text-center">
                  {formatDate(booking.createdAt)}
                </CTableDataCell>
                <CTableDataCell className="text-center">{booking.status}</CTableDataCell>
                <CTableDataCell className="text-center">
                  {booking.totalPrice?.toLocaleString()} VND
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <CButton
                      color="info"
                      size="sm"
                      variant="outline"
                      className="me-2"
                      onClick={() => handleGetDetail(booking)}
                    >
                      Chi tiết
                    </CButton>
                    <CButton
                      color="warning"
                      size="sm"
                      variant="outline"
                      className="me-2"
                      onClick={() => handleEdit(booking)}
                    >
                      Sửa
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteClick(booking)}
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

export default BookingTable