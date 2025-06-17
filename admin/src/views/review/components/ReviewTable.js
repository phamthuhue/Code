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

const ReviewTable = ({
  currentReviews = [],
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
            <CTableHeaderCell className="bg-body-tertiary text-center">Người dùng</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Tour</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Hướng dẫn viên</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Đánh giá tour</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Nhận xét tour</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Đánh giá hướng dẫn</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Nhận xét hướng dẫn</CTableHeaderCell>
            <CTableHeaderCell className="bg-body-tertiary text-center">Hành động</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {currentReviews.length === 0 ? (
            <CTableRow>
              <CTableDataCell colSpan="9" className="text-center text-muted py-4">
                Không có dữ liệu đánh giá để hiển thị.
              </CTableDataCell>
            </CTableRow>
          ) : (
            currentReviews.map((review, index) => (
              <CTableRow key={index}>
                <CTableDataCell className="text-center">
                  {review.userId?.fullname || review.userId?.username}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {review.tourId?.title}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {review.guideId?.name}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {review.ratingTour} ★
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {review.commentTour || '—'}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {review.ratingGuide} ★
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {review.commentGuide || '—'}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div className="d-flex align-items-center justify-content-center">
                    {/* <CButton
                      color="warning"
                      size="sm"
                      variant="outline"
                      className="me-2"
                      onClick={() => handleEdit(review)}
                    >
                      Sửa
                    </CButton> */}
                    <CButton
                      color="danger"
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteClick(review)}
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

export default ReviewTable