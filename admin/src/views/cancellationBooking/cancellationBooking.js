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
import CancellationBookingFormModal from './components/CancellationBookingForm'
import {
  createCancellationBooking,
  deleteCancellationBooking,
  getCancellationBookings,
  updateCancellationBooking,
  confirmMultipleCancellationBookings,
  rejectMultipleCancellationBookings
} from '../../services/Api/cancellationBookingService'
import CancellationBookingTable from './components/CancellationBookingTable'
import CancellationBookingFilter from './components/CancellationBookingFilter'

const CancellationBooking = () => {
  const [toast, addToast] = useState()
  const toaster = useRef(null)
  const exampleToast = (message) => (
    <CToast>
      <CToastHeader closeButton>
        <svg className="rounded me-2" width="20" height="20">
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <div className="fw-bold me-auto"> </div>
        <small> </small>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
    </CToast>
  )

  const [selectedCancellationBookings, setSelectedCancellationBookings] = useState([])

  const handleSelectCancellationBooking = (id) => {
    setSelectedCancellationBookings((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((i) => i !== id)
        : [...prevSelected, id],
    )
  }

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      const allIds = currentCancellationBookings.map((c) => c._id)
      setSelectedCancellationBookings(allIds)
    } else {
      setSelectedCancellationBookings([])
    }
  }

  const handleConfirmSelected = async () => {
    if (selectedCancellationBookings.length === 0) {
      addToast(exampleToast('Vui lòng chọn ít nhất 1 bản ghi để xác nhận'))
      return
    }

    try {
      await confirmMultipleCancellationBookings(selectedCancellationBookings)
      addToast(exampleToast('Xác nhận các phiếu hủy thành công'))
      setSelectedCancellationBookings([])
      fetchCancellationBookings()
    } catch (error) {
      console.error('Lỗi xác nhận:', error)
      addToast(exampleToast('Lỗi khi xác nhận phiếu hủy'))
    }
  }

  const handleRejectSelected  = async () => {
    if (selectedCancellationBookings.length === 0) {
      addToast(exampleToast('Vui lòng chọn ít nhất 1 bản ghi để xác nhận'))
      return
    }

    try {
      await rejectMultipleCancellationBookings(selectedCancellationBookings)
      addToast(exampleToast('Từ chối các phiếu hủy thành công'))
      setSelectedCancellationBookings([])
      fetchCancellationBookings()
    } catch (error) {
      console.error('Lỗi từ chối:', error)
      addToast(exampleToast('Lỗi khi từ chối phiếu hủy'))
    }
  }

  const [filters, setFilters] = useState({
    username: '',
    refundMethod: '',
    status: '',
  })

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters)
    fetchCancellationBookings(updatedFilters)
  }

  const [cancellationBookings, setCancellationBookings] = useState([])

  const fetchCancellationBookings = async () => {
    try {
      const res = await getCancellationBookings()
      let data = res?.data?.data || []

      if (filters.refundMethod) {
        data = data.filter((c) => c.refundMethod.toLowerCase().includes(filters.refundMethod.toLowerCase()))
      }

      if (filters.email) {
        data = data.filter((c) => c.userId.email.toLowerCase().includes(filters.email.toLowerCase()))
      }

      if (filters.status) {
        data = data.filter((c) => c.status.toLowerCase().includes(filters.status.toLowerCase()))
      }

      setCancellationBookings(data)
    } catch (error) {
      console.error('Lỗi khi lấy danh sách phiếu yêu cầu hủy:', error)
      addToast(exampleToast('Không thể lấy danh sách phiếu yêu cầu hủy'))
    }
  }

  useEffect(() => {
    fetchCancellationBookings()
  }, [filters])

  const openForm = (cancellationBooking = null) => {
    setEditingCancellationBooking(cancellationBooking)
    setFormModalVisible(true)
  }

  const closeForm = () => {
    setFormModalVisible(false)
    setEditingCancellationBooking(null)
  }

  const [formModalVisible, setFormModalVisible] = useState(false)
  const [editingCancellationBooking, setEditingCancellationBooking] = useState(null)

  const submitForm = async (formData) => {
    try {
      if (editingCancellationBooking) {
        const updated = await updateCancellationBooking(editingCancellationBooking._id, formData)
        console.log('data sửa', updated.data)
        setCancellationBookings(cancellationBookings.map((c) =>
          c._id === editingCancellationBooking._id ? updated.data : c
        ))
        addToast(exampleToast('Cập nhật phiếu hủy thành công'))
      } else {
        const created = await createCancellationBooking(formData)
        setCancellationBookings([...cancellationBookings, created.data])
        addToast(exampleToast('Thêm mới phiếu hủy thành công'))
      }
      await fetchCancellationBookings()
      closeForm()
    } catch (error) {
      console.error('Lỗi khi gửi form:', error)
      addToast(exampleToast('Có lỗi xảy ra. Vui lòng thử lại.'))
    }
  }

  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [cancellationBookingToDelete, setCancellationBookingToDelete] = useState(null)

  const handleDeleteClick = (cancellationBooking) => {
    setCancellationBookingToDelete(cancellationBooking)
    setDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteCancellationBooking(cancellationBookingToDelete._id)
      setCancellationBookings(cancellationBookings.filter((c) => c._id !== cancellationBookingToDelete._id))
      addToast(exampleToast('Xóa phiếu yêu cầu hủy thành công'))
    } catch (error) {
      console.error('Lỗi khi xóa phiếu yêu cầu hủy:', error)
      addToast(exampleToast('Xóa phiếu yêu cầu hủy thất bại'))
    } finally {
      setDeleteModalVisible(false)
      setCancellationBookingToDelete(null)
    }
  }

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(cancellationBookings.length / itemsPerPage)
  const currentCancellationBookings = cancellationBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <CRow>
      <CCol xs>
        <CancellationBookingFilter filters={filters} onFilterChange={handleFilterChange} />
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol sm={5}>
                <h4 className="card-title mb-0">Danh sách phiếu yêu cầu hủy</h4>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CancellationBookingTable
              currentCancellations={currentCancellationBookings}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              handleEdit={openForm}
              handleDeleteClick={handleDeleteClick}
              selectedCancellations={selectedCancellationBookings}
              handleSelectCancellation={handleSelectCancellationBooking}
              handleSelectAll={handleSelectAll}
              handleConfirmSelected={handleConfirmSelected}
              handleRejectSelected={handleRejectSelected}
            />
          </CCardBody>
        </CCard>
        <CancellationBookingFormModal
          visible={formModalVisible}
          onClose={closeForm}
          onSubmit={submitForm}
          initialData={editingCancellationBooking}
        />
        <DeleteConfirmModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onConfirm={confirmDelete}
        />
        <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
      </CCol>
    </CRow>
  )
}

export default CancellationBooking