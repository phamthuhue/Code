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
import TourFormModal from './components/TourForm'

import { createTour, deleteTour, getTours, updateTour } from '../../services/Api/tourService'
import {getGuides} from '../../services/Api/guideService'
import TourTable from './components/TourTable'
import TourFilter from './components/TourFilter'

const Tour = () => {
  // Hiển thị thông báo
  const [toast, addToast] = useState()
  const toaster = useRef(null)
  const exampleToast = (message) => {
    return (
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
  }
  // Danh sách tour
  const [tours, setTours] = useState([])
  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    const res = await getTours()
    setTours(res.data.data)
  }

  // Danh sách guide
  const [guides, setGuides] = useState([])
  useEffect(() => {
    fetchGuides()
  }, [])

  const fetchGuides = async () => {
    const res = await getGuides()
    setGuides(res.data.data)
  }
  // Xử lý bộ lọc
  const [filters, setFilters] = useState({
    destination: '',
    departureDate: '',
    maxPrice: '',
  })

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters)
  }
  // Thêm mới và cập nhật tour
  const openForm = (tour = null) => {
    setEditingTour(tour)
    setFormModalVisible(true)
  }

  const closeForm = () => {
    setFormModalVisible(false)
    setEditingTour(null)
  }

  const [formModalVisible, setFormModalVisible] = useState(false)
  const [editingTour, setEditingTour] = useState(null)

  const submitForm = async (formData) => {
    try {
      if (editingTour) {
        console.log('editingTour: ', editingTour)
        // Cập nhật tour
        const updatedTour = await updateTour(editingTour._id, formData)
        setTours(tours.map((t) => (t._id === editingTour._id ? updatedTour.data : t)))
        addToast(exampleToast('Cập nhật tour thành công'))
      } else {
        // Thêm mới tour
        const newTour = await createTour(formData)
        setTours([...tours, newTour.data])
        addToast(exampleToast('Thêm mới tour thành công'))
      }
      closeForm()
    } catch (error) {
      console.error('Error submitting form:', error)
      addToast(exampleToast('Có lỗi xảy ra. Vui lòng thử lại.'))
    }
  }

  // Xử lý xóa
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [tourToDelete, setTourToDelete] = useState(null)
  const handleDeleteClick = (tour) => {
    setTourToDelete(tour)
    setDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteTour(tourToDelete._id) // Gọi API xóa tour theo ID
      setTours(tours.filter((t) => t._id !== tourToDelete._id)) // Cập nhật danh sách
      addToast(exampleToast('Xóa tour thành công'))
    } catch (error) {
      console.error('Lỗi khi xóa tour:', error)
      addToast(exampleToast('Xóa tour thất bại'))
    } finally {
      setDeleteModalVisible(false)
      setTourToDelete(null)
    }
  }

  // Cài đặt phân trang
  const itemsPerPage = 3
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(tours?.length / itemsPerPage)
  console.log('totalPages: ', totalPages)
  const currentTours = tours?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])
  return (
    <>
      <CRow>
        <CCol xs>
          <TourFilter filters={filters} onFilterChange={handleFilterChange} />

          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Danh sách tour
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
              <TourTable
                currentTours={currentTours}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                handleEdit={openForm}
                handleDeleteClick={handleDeleteClick}
              />
            </CCardBody>
          </CCard>
          <TourFormModal
            visible={formModalVisible}
            onClose={closeForm}
            onSubmit={submitForm}
            initialData={editingTour}
            guides={guides}
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

export default Tour
