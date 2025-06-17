import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react'

const BookingDetailTable = ({ bookingDetails = [], onEdit, onDelete, onAdd }) => {
  return (
    <>
      <div className="d-flex justify-content-end mb-2">
        <CButton color="success" size="sm" onClick={onAdd}>
          Thêm dịch vụ
        </CButton>
      </div>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary text-center">Loại</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Mô tả</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Số lượng</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Đơn giá (VND)
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Thành tiền (VND)
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Thao tác</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {bookingDetails.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="6" className="text-center text-muted py-4">
                Không có chi tiết đặt tour để hiển thị.
              </CTableDataCell>
            </CTableRow>
          ) : (
            bookingDetails.map((detail, index) => (
              <CTableRow key={index}>
                <CTableDataCell className="text-center">{detail.itemType}</CTableDataCell>
                <CTableDataCell className="text-center">{detail.description}</CTableDataCell>
                <CTableDataCell className="text-center">{detail.quantity}</CTableDataCell>
                <CTableDataCell className="text-center">
                  {detail.unitPrice?.toLocaleString()}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {detail.totalPrice?.toLocaleString()}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton color="warning" size="sm" onClick={() => onEdit(index)} className="me-2">
                    Sửa
                  </CButton>
                  <CButton
                    disabled={detail.itemType === 'Tour'}
                    color="danger"
                    size="sm"
                    onClick={() => onDelete(index)}
                  >
                    Xóa
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))
          )}
        </CTableBody>
      </CTable>
    </>
  )
}

export default BookingDetailTable
