import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react'

const BookingDetailModal = ({ visible, onClose, bookingDetail }) => {
  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>Chi tiết Booking</CModalHeader>
      <CModalBody>
        {bookingDetail ? (
          <>
            <p><strong>Tên khách:</strong> {bookingDetail.customerName}</p>
            <p><strong>Ngày tạo:</strong> {bookingDetail.createdAt}</p>
            {/* Chi tiết các tour và booking detail */}
            <h6>Chi tiết tour:</h6>
            {bookingDetail.tours?.map((tour, idx) => (
              <div key={idx}>
                <p>- {tour.name} ({tour.date})</p>
              </div>
            ))}
            <h6>Chi tiết BookingDetail:</h6>
            {bookingDetail.bookingDetails?.map((detail, idx) => (
              <div key={idx}>
                <p>- {detail.serviceName} (Giá: {detail.price})</p>
              </div>
            ))}
          </>
        ) : (
          <p>Không có dữ liệu chi tiết.</p>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>Đóng</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default BookingDetailModal