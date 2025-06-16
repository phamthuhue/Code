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

const InvoiceTable = ({
  currentInvoices = [],
  currentPage,
  totalPages,
  setCurrentPage,
  handleEdit,
  handleDeleteClick,
}) => {
  return (
    <>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Tên KH
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Email KH
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Khuyến mãi
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Tổng tiền
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Giảm giá
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Thực nhận/trả
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Trạng thái
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Hành động
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {currentInvoices.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="8" className="text-center text-muted py-4">
                Không có dữ liệu hóa đơn để hiển thị.
              </CTableDataCell>
            </CTableRow>
          ) : (
            currentInvoices.map((invoice, index) => (
              <CTableRow key={index}>
                <CTableDataCell className="text-center">
                  {invoice.userId?.username}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {invoice.userId?.email}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {invoice.promotionId?.name || 'Không áp dụng'}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {invoice.totalAmount?.toLocaleString()} đ
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {invoice.discountAmount?.toLocaleString()} đ
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {invoice.finalAmount?.toLocaleString()} đ
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {invoice.paymentStatus}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    {/* <CButton
                      color="warning"
                      size="sm"
                      variant="outline"
                      className="me-2"
                      onClick={() => handleEdit(invoice)}
                    >
                      Sửa
                    </CButton> */}
                    <CButton
                      color="danger"
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteClick(invoice)}
                    >
                      Xóa
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

export default InvoiceTable