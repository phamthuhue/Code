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
  selectedBookings = [],
  handleSelectBooking,
  handleSelectAll,
  handleConfirmSelected,
}) => {
  const isAllSelected =
    currentBookings.length > 0 &&
    currentBookings.every((booking) => selectedBookings.includes(booking._id))

  return (
    <>
      <div className="d-flex justify-content-end my-1">
        <CButton
          color="success"
          className="px-2"
          disabled={selectedBookings.length === 0}
          onClick={() => handleConfirmSelected(selectedBookings)}
        >
          Xác nhận
        </CButton>
      </div>

      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '40px' }}>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Tên Tour</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Tên khách hàng</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Số điện thoại</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Ngày đặt</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Khuyến mãi</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Giảm giá (VND)</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Tổng giá (VND)</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Trạng thái</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Hành động</CTableHeaderCell>
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
            currentBookings.map((booking) => (
              <CTableRow key={booking._id}>
                <CTableDataCell className="text-center">
                  <input
                    type="checkbox"
                    checked={selectedBookings.includes(booking._id)}
                    onChange={() => handleSelectBooking(booking._id)}
                  />
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {booking.tourId?.title || 'Chưa có dữ liệu'}
                </CTableDataCell>
                <CTableDataCell className="text-center">{booking.name}</CTableDataCell>
                <CTableDataCell className="text-center">{booking.phone}</CTableDataCell>
                <CTableDataCell className="text-center">{formatDate(booking.createdAt)}</CTableDataCell>
                <CTableDataCell className="text-center">{booking.promotionId?.name || 'Không áp dụng'}</CTableDataCell>
                <CTableDataCell className="text-center">{booking.discountAmount?.toLocaleString()} VND</CTableDataCell>
                <CTableDataCell className="text-center">
                  {booking.totalPrice?.toLocaleString()} VND
                </CTableDataCell>
                <CTableDataCell className="text-center">{booking.status}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <div className="d-flex align-items-center justify-content-center">
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