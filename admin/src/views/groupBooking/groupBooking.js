import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CToast, CToastBody, CToaster, CToastHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { useEffect, useRef, useState } from 'react'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import GroupBookingFormModal from './components/GroupBookingForm'
import GroupBookingTable from './components/GroupBookingTable'
import GroupBookingFilter from './components/GroupBookingFilter'

import {
  getGroupBookings,
  createGroupBooking,
  updateGroupBooking,
  deleteGroupBooking,
} from '../../services/Api/groupBooking'

import {
  getTours
} from '../../services/Api/tourService'

const GroupBooking = () => {
  const [toast, addToast] = useState()
  const toaster = useRef(null)

  const exampleToast = (message) => (
    <CToast>
      <CToastHeader closeButton>
        <strong className="me-auto">Thông báo</strong>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
    </CToast>
  )

  const [bookings, setBookings] = useState([])

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async (filterValues = filters) => {
    try {
      const res = await getGroupBookings()
      let data = res.data.data

      if (filterValues.customerName) {
        data = data.filter(b =>
          b.customerName?.toLowerCase().includes(filterValues.customerName.toLowerCase())
        )
      }

      if (filterValues.phone) {
        data = data.filter(b =>
          b.phone?.toLowerCase().includes(filterValues.phone.toLowerCase())
        )
      }

      if (filterValues.email) {
        data = data.filter(b =>
          b.email?.toLowerCase().includes(filterValues.email.toLowerCase())
        )
      }

      if (filterValues.tourId) {
        data = data.filter(b => b.tourId._id === filterValues.tourId)
      }

      setBookings(data)
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách yêu cầu đặt tour.'))
    }
  }

  const [tours, setTours] = useState([])

  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    try {
      const res = await getTours()
      setTours(res.data.data)
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách tour.'))
    }
  }

  // Lọc
  const [filters, setFilters] = useState({
    customerName: '',
    phone: '',
    email: '',
    tourId: ''
  })

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters)
    fetchBookings(updatedFilters)
  }

  // Form
  const [formModalVisible, setFormModalVisible] = useState(false)
  const [editingBooking, setEditingBooking] = useState(null)

  const openForm = (booking = null) => {
    setEditingBooking(booking)
    setFormModalVisible(true)
  }

  const closeForm = () => {
    setFormModalVisible(false)
    setEditingBooking(null)
  }

  const submitForm = async (formData) => {
    try {
      if (editingBooking) {
        const res = await updateGroupBooking(editingBooking._id, formData)
        setBookings(bookings.map(b => b._id === editingBooking._id ? res.data : b))
        addToast(exampleToast('Cập nhật yêu cầu thành công'))
      } else {
        const res = await createGroupBooking(formData)
        setBookings([...bookings, res.data])
        addToast(exampleToast('Tạo mới yêu cầu thành công'))
      }
      await fetchBookings()
      closeForm()
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Đã xảy ra lỗi khi lưu dữ liệu.'))
    }
  }

  // Xoá
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [bookingToDelete, setBookingToDelete] = useState(null)

  const handleDeleteClick = (booking) => {
    setBookingToDelete(booking)
    setDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteGroupBooking(bookingToDelete._id)
      setBookings(bookings.filter(b => b._id !== bookingToDelete._id))
      addToast(exampleToast('Xoá yêu cầu thành công'))
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể xoá yêu cầu.'))
    } finally {
      setDeleteModalVisible(false)
    }
  }

  // Phân trang
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(bookings.length / itemsPerPage)

  const currentRequests = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <CRow>
      <CCol xs>
        <GroupBookingFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          tours={tours}
        />
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol sm={6}><h4 className="mb-0">Yêu cầu đặt tour theo đoàn</h4></CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <GroupBookingTable
              currentRequests={currentRequests}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              handleEdit={openForm}
              handleDeleteClick={handleDeleteClick}
            />
          </CCardBody>
        </CCard>

        <GroupBookingFormModal
          visible={formModalVisible}
          onClose={closeForm}
          onSubmit={submitForm}
          initialData={editingBooking}
          tours={tours}
        />

        <DeleteConfirmModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={confirmDelete}
        />

        <CToaster ref={toaster} push={toast} placement="top-end" />
      </CCol>
    </CRow>
  )
}

export default GroupBooking