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

const ServiceTable = ({
  currentData = [],
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
              Tên dịch vụ
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Mô tả
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Giá
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Đơn vị
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Đối tác
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Hành động
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {currentData.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="3" className="text-center text-muted py-4">
                Không có dữ liệu đối tác để hiển thị.
              </CTableDataCell>
            </CTableRow>
          ) : (
            currentData.map((data, index) => (
              <CTableRow key={index}>
                <CTableDataCell className="text-center">
                  <div className="text-body-secondary text-wrap">
                    {data.name}
                  </div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="text-wrap">
                    {data.description}
                  </div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="fw-semibold">
                    {(data.unitPrice ?? 0).toLocaleString()} VND
                  </div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="text-wrap">
                    {data.unit}
                  </div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="text-wrap">
                    {data.partnerId.name}
                  </div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <CButton
                      color="warning"
                      size="sm"
                      variant="outline"
                      className="me-2"
                      onClick={() => handleEdit(data)}
                    >
                      Sửa
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteClick(data)}
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

export default ServiceTable