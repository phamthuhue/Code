import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

const BookingDetailTable = ({
  bookingDetails = [],
}) => {
  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead className="text-nowrap">
        <CTableRow>
          <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '100px' }}>
            Loại
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '200px' }}>
            Mô tả
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '100px' }}>
            Số lượng
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '150px' }}>
            Đơn giá (VND)
          </CTableHeaderCell>
          <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '150px' }}>
            Thành tiền (VND)
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {bookingDetails.length === 0 ? (
          <CTableRow>
            <CTableDataCell colSpan="5" className="text-center text-muted py-4">
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
            </CTableRow>
          ))
        )}
      </CTableBody>
    </CTable>
  )
}

export default BookingDetailTable