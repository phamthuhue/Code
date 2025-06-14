import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CImage,
  CButton,
  CPagination,
  CPaginationItem,
} from '@coreui/react'
import { cilMap } from '@coreui/icons'
import { cifVn } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { formatDate } from '../../../utilis/formatDate'
const TourTable = ({
  currentTours = [],
  currentPage,
  totalPages,
  setCurrentPage,
  handleEdit,
  handleDeleteClick,
}) => {
  const backendUrl = import.meta.env.VITE_END_POINT_BACKEND_URL

  return (
    <>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead className="text-nowrap">
          <CTableRow>
            <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '200px' }}>
              Tên tour
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '150px' }}>
              Thành phố
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '140px' }}>
              Ngày khởi hành
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '140px' }}>
              Ngày kết thúc
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '130px' }}>
              Giá
            </CTableHeaderCell>
            <CTableHeaderCell
              className="bg-body-tertiary text-center"
              style={{ width: '250px', minWidth: '250px' }}
            >
              Mô tả
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center" style={{ width: '160px' }}>
              Hành động
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentTours.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="8" className="text-center text-muted py-4">
                Không có dữ liệu tour để hiển thị.
              </CTableDataCell>
            </CTableRow>
          ) : (
            currentTours.map((tour, index) => (
              <CTableRow key={index}>
                <CTableDataCell>
                  <div className="text-body-secondary text-nowrap">{tour.title}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <CIcon size="xl" icon={cifVn} title="Việt Nam" />
                    <span className="ms-2">{tour.city}</span>
                  </div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {formatDate(tour.startDate)}
                </CTableDataCell>
                <CTableDataCell className="text-center">{formatDate(tour.endDate)}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <div className="fw-semibold">{tour.price.toLocaleString()} VND</div>
                </CTableDataCell>
                <CTableDataCell>
                  <div className="small text-body-secondary text-wrap">{tour.desc}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <CButton
                      color="warning"
                      size="sm"
                      variant="outline"
                      className="me-2"
                      onClick={() => handleEdit(tour)}
                    >
                      Sửa
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteClick(tour)}
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

export default TourTable
