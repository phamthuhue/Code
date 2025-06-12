import { formatDate } from '../../../utilis/formatDate'
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

const GuideTable = ({
  currentGuides = [],
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
              Tên hướng dẫn viên
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Số điện thoại
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Giới tính
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Ngày sinh
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Địa chỉ
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Hành động
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {currentGuides.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="5" className="text-center text-muted py-4">
                Không có dữ liệu hướng dẫn viên để hiển thị.
              </CTableDataCell>
            </CTableRow>
          ) : (
            currentGuides.map((guide, index) => (
              <CTableRow key={index}>
                <CTableDataCell className="text-center">
                  <div className="text-body-secondary text-wrap">
                    {guide.name}
                  </div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="text-center">
                    {guide.phone}
                  </div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="text-center">
                    {guide.gender}
                  </div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="text-center">
                    {formatDate(guide.dob)}
                  </div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="text-center">
                    {guide.address}
                  </div>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <CButton
                      color="warning"
                      size="sm"
                      variant="outline"
                      className="me-2"
                      onClick={() => handleEdit(guide)}
                    >
                      Sửa
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteClick(guide)}
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

export default GuideTable