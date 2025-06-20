import React, { useState, useEffect } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react'
import ServiceSelectModal from './ServiceSelectModal'

const BookingDetailTable = ({
  formData,
  bookingDetails = [],
  onChange = () => {},
  tourServices = [],
}) => {
  const [serviceModalVisible, setServiceModalVisible] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [localBookingDetails, setLocalBookingDetails] = useState(bookingDetails || [])

  useEffect(() => {
    setLocalBookingDetails([])
  }, [formData.tourId])
  useEffect(() => {
    setLocalBookingDetails(bookingDetails)
  }, [bookingDetails])

  const handleAdd = () => {
    setEditingIndex(null)
    setServiceModalVisible(true)
  }

  const handleEdit = (index) => {
    setEditingIndex(index)
    setServiceModalVisible(true)
  }

  const handleDelete = (index) => {
    const updated = [...localBookingDetails]
    updated.splice(index, 1)
    setLocalBookingDetails(updated)
    onChange(updated)
  }

  const handleSave = (service) => {
    const updated = localBookingDetails
    if (editingIndex !== null) {
      updated[editingIndex] = service
    } else {
      updated.push(service)
    }
    setLocalBookingDetails(updated)
    onChange(updated)
    setServiceModalVisible(false)
  }

  return (
    <>
      <div className="d-flex justify-content-end mb-2">
        <CButton color="success" size="sm" onClick={handleAdd}>
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
          {localBookingDetails.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="6" className="text-center text-muted py-4">
                Không có chi tiết đặt tour để hiển thị.
              </CTableDataCell>
            </CTableRow>
          ) : (
            localBookingDetails.map((detail, index) => (
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
                  <CButton
                    color="warning"
                    size="sm"
                    onClick={() => handleEdit(index)}
                    className="me-2"
                  >
                    Sửa
                  </CButton>
                  <CButton
                    disabled={detail.itemType === 'Tour'}
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(index)}
                  >
                    Xóa
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))
          )}
        </CTableBody>
      </CTable>
      <ServiceSelectModal
        visible={serviceModalVisible}
        onClose={() => setServiceModalVisible(false)}
        onSave={handleSave}
        tourServices={tourServices}
        rowDataDetailTable={localBookingDetails}
        initialData={editingIndex !== null ? bookingDetails[editingIndex] : null}
      />
    </>
  )
}

export default BookingDetailTable
