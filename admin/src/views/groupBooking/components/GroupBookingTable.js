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

const GroupBookingTable = ({
  currentRequests = [],
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
              Tên khách hàng
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Email
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              SĐT
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Số người
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Tour
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Yêu cầu đặc biệt
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
          {currentRequests.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="7" className="text-center text-muted py-4">
                Không có yêu cầu đặt tour để hiển thị.
              </CTableDataCell>
            </CTableRow>
          ) : (
            currentRequests.map((request, index) => (
              <CTableRow key={index}>
                <CTableDataCell className="text-center text-wrap">
                  {request.customerName}
                </CTableDataCell>
                <CTableDataCell className="text-center text-wrap">
                  {request.email}
                </CTableDataCell>
                <CTableDataCell className="text-center text-wrap">
                  {request.phone}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {request.numberOfPeople}
                </CTableDataCell>
                <CTableDataCell className="text-center text-wrap">
                  {request.tourId?.title || '---'}
                </CTableDataCell>
                <CTableDataCell className="text-center text-wrap">
                  {request.specialRequest || '---'}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {request.status}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <CButton
                      color="warning"
                      size="sm"
                      variant="outline"
                      className="me-2"
                      onClick={() => handleEdit(request)}
                    >
                      Sửa
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteClick(request)}
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

export default GroupBookingTable