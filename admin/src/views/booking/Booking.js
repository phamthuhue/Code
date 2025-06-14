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
import {getTours} from '../../services/Api/tourService'
import { getBookingDetail } from '../../services/Api/bookingDetailService'
import { createBooking, deleteBooking, getBookings, updateBooking} from '../../services/Api/bookingService'
import BookingTable from './components/BookingTable'
import BookingFilter from './components/BookingFilter'

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

  // Danh sách booking
  const [bookings, setBookings] = useState([])
  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await getBookings()
      setBookings(res.data.data)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách booking:', error)
      addToast(exampleToast('Không thể tải danh sách booking'))
    }
  }

  // Bộ lọc
  const [filters, setFilters] = useState({
    name: '',
    createdAt: '',
    status: '',
  })

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters)
  }

  // Thêm & cập nhật booking

  // Tạo state lưu bookingDetails
  const [bookingDetails, setBookingDetails] = useState([])
  const [tours, setTours] = useState([])

  useEffect(() => {
  const fetchTours = async () => {
    try {
      const res = await getTours();
      setTours(res.data.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách tours:', error);
      addToast(exampleToast('Không thể lấy danh sách tour'));
    }
  };
  fetchTours();
  }, []);

  const openForm = async (booking = null) => {
    setEditingBooking(booking);
    setFormModalVisible(true);

    if (booking) {
      try {
        const res = await getBookingDetail(booking._id);
        setBookingDetails(res.data);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết booking:', error);
        addToast(exampleToast('Không thể lấy chi tiết booking'));
      }
    } else {
      setBookingDetails([]);
    }
  };

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
        setBookings(
          bookings.map((b) => (b._id === editingBooking._id ? updatedBooking.data : b)),
        )
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
          <BookingFilter filters={filters} onFilterChange={handleFilterChange} />
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
              />
            </CCardBody>
          </CCard>
          <BookingFormModal
            visible={formModalVisible}
            onClose={closeForm}
            onSubmit={submitForm}
            initialData={editingBooking}
            tours = {tours}
            bookingDetails={bookingDetails}
            setBookingDetails={setBookingDetails} 
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