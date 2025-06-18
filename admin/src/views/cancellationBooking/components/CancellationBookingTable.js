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

const CancellationBookingTable = ({
  currentCancellations = [],
  currentPage,
  totalPages,
  setCurrentPage,
  handleEdit,
  handleDeleteClick,
  selectedCancellations = [],
  handleSelectCancellation,
  handleSelectAll,
  handleConfirmSelected,
  handleRejectSelected
}) => {
  const isAllSelected =
    currentCancellations.length > 0 &&
    currentCancellations.every((item) => selectedCancellations.includes(item._id))

  return (
    <>
      <div className="d-flex justify-content-end gap-2 my-2 ">
        <CButton
          color="danger"
          variant="outline"
          className="px-3"
          disabled={selectedCancellations.length === 0}
          onClick={() => handleRejectSelected(selectedCancellations)}
        >
          Từ chối
        </CButton>
        <CButton
          color="success"
          className="px-3"
          disabled={selectedCancellations.length === 0}
          onClick={() => handleConfirmSelected(selectedCancellations)}
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
            <CTableHeaderCell className="bg-body-tertiary text-center">Email khách</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Lý do huỷ</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Phương thức hoàn</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Trạng thái</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Thông tin hoàn tiền</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Ngày tạo</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Hành động</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {currentCancellations.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="8" className="text-center text-muted py-4">
                Không có dữ liệu hủy tour để hiển thị.
              </CTableDataCell>
            </CTableRow>
          ) : (
            currentCancellations.map((cancellation) => {
              const refundInfo =
                cancellation.refundMethod === 'Chuyển khoản'
                  ? `${cancellation.refundBankName || 'N/A'} - ${cancellation.refundAccountName || 'N/A'} (${cancellation.refundAccountNumber || 'N/A'})`
                  : `${cancellation.refundWalletProvider || 'N/A'} - ${cancellation.refundWalletPhone || 'N/A'}`

              return (
                <CTableRow key={cancellation._id}>
                  <CTableDataCell className="text-center">
                    <input
                      type="checkbox"
                      checked={selectedCancellations.includes(cancellation._id)}
                      onChange={() => handleSelectCancellation(cancellation._id)}
                    />
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {cancellation.userId?.email || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">{cancellation.cancelReason || '-'}</CTableDataCell>
                  <CTableDataCell className="text-center">{cancellation.refundMethod}</CTableDataCell>
                  <CTableDataCell className="text-center">{cancellation.status}</CTableDataCell>
                  <CTableDataCell className="text-center">{refundInfo}</CTableDataCell>
                  <CTableDataCell className="text-center">{formatDate(cancellation.createdAt)}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <div className="d-flex align-items-center justify-content-center">
                      <CButton
                        color="warning"
                        size="sm"
                        variant="outline"
                        className="me-2"
                        onClick={() => handleEdit(cancellation)}
                        disabled={cancellation.status === 'Đã hoàn'}
                      >
                        Sửa
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteClick(cancellation)}
                      >
                        Xoá
                      </CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              )
            })
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

export default CancellationBookingTable