import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CToast,
  CToastBody,
  CToaster,
  CToastHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { useEffect, useRef, useState } from 'react'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import BookingFormModal from './components/BookingForm'
import CancellationBookingForm from './components/CancellationBookingForm'
import { getTours } from '../../services/Api/tourService'
import { getUsersByUserRole } from '../../services/Api/accountService'
import { getBookingDetail } from '../../services/Api/bookingDetailService'
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
  confirmMultipleBookings,
} from '../../services/Api/bookingService'
import {createCancellationBooking} from '../../services/Api/cancellationBookingService'
import BookingTable from './components/BookingTable'
import BookingFilter from './components/BookingFilter'
import { getPromotions } from '../../services/Api/promotionService'
import { getServicesByTourId } from '../../services/Api/serviceOfTour'

const Booking = () => {
  // Thông báo
  const [toast, addToast] = useState()
  const toaster = useRef(null)
  const exampleToast = (message) => (
    <CToast>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <div className="fw-bold me-auto"> </div>
        <small> </small>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
    </CToast>
  )
  const [selectedBookings, setSelectedBookings] = useState([])

  const handleSelectBooking = (bookingId) => {
    setSelectedBookings((prevSelected) =>
      prevSelected.includes(bookingId)
        ? prevSelected.filter((id) => id !== bookingId)
        : [...prevSelected, bookingId],
    )
  }

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      const allIds = currentBookings.map((b) => b._id)
      setSelectedBookings(allIds)
    } else {
      setSelectedBookings([])
    }
  }
  const handleConfirmSelected = async () => {
    if (selectedBookings.length === 0) {
      addToast(exampleToast('Vui lòng chọn ít nhất 1 booking để xác nhận'))
      return
    }

    try {
      const bookingIds = selectedBookings // Vì đã là mảng ID
      await confirmMultipleBookings(bookingIds)
      addToast(exampleToast('Xác nhận các booking thành công'))
      setSelectedBookings([])
      fetchBookings()
    } catch (error) {
      console.error('Lỗi xác nhận:', error)
      addToast(exampleToast('Lỗi khi xác nhận booking'))
    }
  }

  // Bộ lọc
  const [filters, setFilters] = useState({
    name: '',
    phone: '',
    status: '',
    tourId: '',
  })

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters)
  }

  // Lấy các danh sách
  const [bookings, setBookings] = useState([])
  const [bookingDetails, setBookingDetails] = useState([])
  const [tours, setTours] = useState([])
  const [users, setUsers] = useState([])
  const [promotions, setPromotions] = useState([])
  const [tourServices, setTourServices] = useState([])

  const fetchPromotions = async () => {
    try {
      const res = await getPromotions()
      let data = res.data.data
      setPromotions(data)
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách khuyến mãi.'))
    }
  }

  const fetchUsers = async () => {
    try {
      const res = await getUsersByUserRole()
      let data = res.data.data
      setUsers(data)
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách khách hàng.'))
    }
  }

  const fetchTours = async () => {
    try {
      const res = await getTours()
      let data = res.data.data
      setTours(data)
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách tour.'))
    }
  }

  const fetchBookings = async () => {
    try {
      const res = await getBookings()
      let data = res.data.data

      // Apply filters
      if (filters.name) {
        data = data.filter((inv) => inv.name.toLowerCase().includes(filters.name.toLowerCase()))
      }

      if (filters.phone) {
        data = data.filter((inv) => inv.phone.toLowerCase().includes(filters.phone.toLowerCase()))
      }

      if (filters.tourId) {
        data = data.filter(inv => inv.tourId._id.toLowerCase().includes(filters.tourId.toLowerCase()));
      }

      if (filters.promotionId) {
        if (filters.promotionId === 'Null') {
          data = data.filter((inv) => !inv.promotionId)
        } else {
          data = data.filter((inv) =>
            inv.promotionId?._id?.toLowerCase().includes(filters.promotionId.toLowerCase()),
          )
        }
      }

      if (filters.status) {
        data = data.filter((inv) => inv.status.toLowerCase() === filters.status.toLowerCase())
      }

      setBookings(data)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phiếu đặt:', error)
      addToast(exampleToast('Không thể lấy danh sách phiếu đặt'))
    }
  }

  // Gọi trong useEffect
  useEffect(() => {
    fetchBookings()
  }, [filters])

  useEffect(() => {
    fetchPromotions()
    fetchTours()
    fetchUsers()
  }, [])

  // Nút hủy đặt hiện cancellationbookingForm
  const [showCancelForm, setShowCancelForm] = useState(false)
  const [bookingToCancel, setBookingToCancel] = useState(null)

  const handleCancelClick = (booking) => {
    setBookingToCancel(booking)
    setShowCancelForm(true)
  }

  const handleSaveCancellation = async (cancellationData) => {
    try {
      await createCancellationBooking(cancellationData)
      addToast(exampleToast("Đã lưu yêu cầu hủy!"))
      setShowCancelForm(false)
      fetchBookings()  // reload list nếu cần
    } catch (err) {
      console.error(err)
      const msg = err?.response?.data?.message || "Lỗi khi lưu yêu cầu hủy"
      addToast(exampleToast(msg))
    }
  }

  // Mở bookingForm
  const openForm = async (booking = null) => {
    setEditingBooking(booking)
    setFormModalVisible(true)

    if (booking) {
      try {
        const res = await getBookingDetail(booking._id)
        const ServiceRes = await getServicesByTourId(booking.tourId._id)
        setBookingDetails(res.data)
        setTourServices(ServiceRes.data.services)
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết dịch vụ:', error)
        addToast(exampleToast('Không thể lấy chi tiết dịch vụ'))
      }
    } else {
      setBookingDetails([])
      setTourServices([])
    }
  }

  const closeForm = () => {
    setFormModalVisible(false)
    setEditingBooking(null)
  }

  const [formModalVisible, setFormModalVisible] = useState(false)
  const [editingBooking, setEditingBooking] = useState(null)

  const submitForm = async (formData) => {
    try {
      if (editingBooking) {
        const updatedBooking = await updateBooking(editingBooking._id, formData)
        setBookings(bookings.map((b) => (b._id === editingBooking._id ? updatedBooking.data : b)))
        addToast(exampleToast('Cập nhật booking thành công'))
      } else {
        const newBooking = await createBooking(formData)
        setBookings([...bookings, newBooking.data])
        addToast(exampleToast('Thêm mới booking thành công'))
      }
      closeForm()
    } catch (error) {
      console.error('Lỗi khi gửi form:', error)
      addToast(exampleToast('Có lỗi xảy ra. Vui lòng thử lại.'))
    }
  }

  // Xử lý xóa
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [bookingToDelete, setBookingToDelete] = useState(null)

  const handleDeleteClick = (booking) => {
    setBookingToDelete(booking)
    setDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteBooking(bookingToDelete._id)
      setBookings(bookings.filter((b) => b._id !== bookingToDelete._id))
      addToast(exampleToast('Xóa booking thành công'))
    } catch (error) {
      console.error('Lỗi khi xóa booking:', error)
      addToast(exampleToast('Xóa booking thất bại'))
    } finally {
      setDeleteModalVisible(false)
      setBookingToDelete(null)
    }
  }

  // Phân trang
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(bookings?.length / itemsPerPage)
  const currentBookings = bookings?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <>
      <CRow>
        <CCol xs>
          <BookingFilter filters={filters} onFilterChange={handleFilterChange} promotions={promotions} tours={tours}/>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Danh sách booking
                  </h4>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CButton color="primary" className="float-end" onClick={() => openForm()}>
                    <div className="small d-flex align-items-center">
                      <CIcon icon={cilPlus} />
                      <span className="ms-1">Thêm mới</span>
                    </div>
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <BookingTable
                currentBookings={currentBookings}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                handleEdit={openForm}
                handleGetDetail={openForm}
                handleDeleteClick={handleDeleteClick}
                selectedBookings={selectedBookings}
                handleSelectBooking={handleSelectBooking}
                handleSelectAll={handleSelectAll}
                handleConfirmSelected={handleConfirmSelected}
                handleCancelClick={handleCancelClick}
              />
              {showCancelForm && (
                <CancellationBookingForm
                  booking={bookingToCancel}
                  onSave={handleSaveCancellation}
                  onClose={() => setShowCancelForm(false)}
                />
              )}
            </CCardBody>
          </CCard>
          <BookingFormModal
            visible={formModalVisible}
            onClose={closeForm}
            onSubmit={submitForm}
            initialData={editingBooking}
            tours={tours}
            bookingDetails={bookingDetails}
            setBookingDetails={setBookingDetails}
            promotions={promotions}
            tourServices={tourServices}
            users={users}
          />
          <DeleteConfirmModal
            visible={deleteModalVisible}
            onClose={() => setDeleteModalVisible(false)}
            onConfirm={confirmDelete}
          />
          <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
        </CCol>
      </CRow>
    </>
  )
}

export default Booking