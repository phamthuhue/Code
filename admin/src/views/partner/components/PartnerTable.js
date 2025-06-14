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

const PartnerTable = ({
  currentPartners = [],
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
              Tên đối tác
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Địa chỉ
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Số điện thoại
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Loại đối tác
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Hành động
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {currentPartners.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="3" className="text-center text-muted py-4">
                Không có dữ liệu đối tác để hiển thị.
              </CTableDataCell>
            </CTableRow>
          ) : (
            currentPartners.map((type, index) => (
              <CTableRow key={index}>
                <CTableDataCell className="text-center">
                  <div className="text-body-secondary text-wrap">
                    {type.name}
                  </div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="text-wrap">
                    {type.address}
                  </div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="text-wrap">
                    {type.phone}
                  </div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="text-wrap">
                    {type.partnerTypeId.name}
                  </div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <CButton
                      color="warning"
                      size="sm"
                      variant="outline"
                      className="me-2"
                      onClick={() => handleEdit(type)}
                    >
                      Sửa
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteClick(type)}
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

export default PartnerTable