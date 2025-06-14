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

const TourServiceTable = ({
  currentServices = [],
  currentPage,
  totalPages,
  setCurrentPage,
  handleEdit,
  handleDeleteClick,
}) => {
  return (
    <>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary text-center">Tên tour</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Danh sách dịch vụ</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Ngày tạo</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Ngày cập nhật</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Hành động</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {currentServices.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="3" className="text-center text-muted py-4">
                Không có dữ liệu dịch vụ để hiển thị.
              </CTableDataCell>
            </CTableRow>
          ) : (
            currentServices.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell className="text-center align-middle">
                  {item.tourId?.title || 'Không tìm thấy tour'}
                </CTableDataCell>
                <CTableDataCell>
                  <ul className="mb-0 ps-3">
                    {item.services.map((service, idx) => (
                      <li key={service._id || idx} className="mb-2">
                        <strong>{service.note}</strong><br />
                        Số chỗ: {service.numberOfPeopl}<br />
                        Giá: {service.servicePrice.toLocaleString()} VNĐ
                      </li>
                    ))}
                  </ul>
                </CTableDataCell>
                <CTableDataCell className="text-center align-middle">
                  {formatDate(item.createdAt)}
                </CTableDataCell>
                <CTableDataCell className="text-center align-middle">
                  {formatDate(item.updatedAt)}
                </CTableDataCell>
                <CTableDataCell className="text-center align-middle">
                  <CButton
                    color="warning"
                    size="sm"
                    variant="outline"
                    className="me-2"
                    onClick={() => handleEdit(item)}
                  >
                    Sửa
                  </CButton>
                  <CButton
                    color="danger"
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteClick(item)}
                  >
                    Xoá
                  </CButton>
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

export default TourServiceTable