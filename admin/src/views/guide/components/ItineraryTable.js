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
import { cilList } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { formatDate } from '../../../utilis/formatDate'

const ItineraryTable = ({
  currentItineraries = [],
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
              Tên tour
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Chi tiết lịch trình
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Ghi chú
            </CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">
              Hành động
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {currentItineraries.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="6" className="text-center text-muted py-4">
                Không có dữ liệu lịch trình để hiển thị.
              </CTableDataCell>
            </CTableRow>
          ) : (
            currentItineraries.map((itinerary, index) => (
              <CTableRow key={index}>
                <CTableDataCell className="text-center">
                  <div className="text-body-secondary text-wrap">
                    {itinerary.tourId?.title}
                  </div>
                </CTableDataCell>

                <CTableDataCell>
                  <ul className="mb-0">
                    {itinerary.details.map((detail, idx) => (
                      <li key={idx}>
                        <strong>{detail.time}</strong>: {detail.description}
                      </li>
                    ))}
                  </ul>
                </CTableDataCell>

                <CTableDataCell>
                  <ul className="mb-0">
                    {itinerary.notes && itinerary.notes.length > 0 ? (
                      itinerary.notes.map((note, idx) => <li key={idx}>{note}</li>)
                    ) : (
                      <span className="text-muted">Không có ghi chú</span>
                    )}
                  </ul>
                </CTableDataCell>

                <CTableDataCell className="text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    <CButton
                      color="warning"
                      size="sm"
                      variant="outline"
                      className="me-2"
                      onClick={() => handleEdit(itinerary)}
                    >
                      Sửa
                    </CButton>
                    <CButton
                      color="danger"
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteClick(itinerary)}
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

export default ItineraryTable