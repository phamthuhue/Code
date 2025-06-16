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
import ItineraryFormModal from './components/ItineraryForm'
import { getTours, getToursWithoutItinerary } from '../../services/Api/tourService'
import {
  createItinerary,
  deleteItinerary,
  getItineraries,
  updateItinerary,
  getItineraryByTour,
} from '../../services/Api/itineraryService'
import ItineraryTable from './components/ItineraryTable'
import ItineraryFilter from './components/ItineraryFilter'

const Itinerary = () => {
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

  // Danh sách itinerary
  const [filters, setFilters] = useState({
    name: '',
  })
  // Danh sách tour
  const [itineraries, setItineraries] = useState([])
  useEffect(() => {
    fetchItineraries(filters)
  }, [filters])

  const fetchItineraries = async (filterValues = {}) => {
    try {
      const res = await getItineraries()
      let data = res.data

      // Lọc theo tên tour
      if (filterValues.name) {
        data = data.filter(p =>
          p.tourId?.title?.toLowerCase().includes(filterValues.name.toLowerCase())
        )
      }

      setItineraries(data)
    } catch (error) {
      console.error('Lỗi khi tải danh sách lịch trình:', error)
    }
  }

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters)
    fetchItineraries(updatedFilters)
  }

  // Danh sách tour
  const [tours, setTours] = useState([])
  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    const res = await getToursWithoutItinerary()
    setTours(res.data)
  }

  // Thêm mới và cập nhật itinerary
  const openForm = (itinerary = null) => {
    setEditingItinerary(itinerary)
    setFormModalVisible(true)
  }

  const closeForm = () => {
    setFormModalVisible(false)
    setEditingItinerary(null)
  }

  const [formModalVisible, setFormModalVisible] = useState(false)
  const [editingItinerary, setEditingItinerary] = useState(null)

  const submitForm = async (formData) => {
    try {
      if (editingItinerary) {
        // Cập nhật itinerary
        const updatedItinerary = await updateItinerary(editingItinerary._id, formData)
        setItineraries(
          itineraries.map((i) => (i._id === editingItinerary._id ? updatedItinerary.data : i)),
        )
        addToast(exampleToast('Cập nhật lịch trình thành công'))
      } else {
        // Thêm mới itinerary
        const newItinerary = await createItinerary(formData)
        setItineraries([...itineraries, newItinerary.data])
        addToast(exampleToast('Thêm mới lịch trình thành công', 'success'))
      }
      await fetchItineraries()
      closeForm()
    } catch (error) {
      console.error('Lỗi khi submit form:', error)
      addToast(exampleToast('Có lỗi xảy ra. Vui lòng thử lại.'))
    }
  }

  // Xử lý xóa
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [itineraryToDelete, setItineraryToDelete] = useState(null)

  const handleDeleteClick = (itinerary) => {
    setItineraryToDelete(itinerary)
    setDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteItinerary(itineraryToDelete._id)
      setItineraries(itineraries.filter((i) => i._id !== itineraryToDelete._id))
      addToast(exampleToast('Xóa lịch trình thành công'))
    } catch (error) {
      console.error('Lỗi khi xóa itinerary:', error)
      addToast(exampleToast('Xóa lịch trình thất bại'))
    } finally {
      setDeleteModalVisible(false)
      setItineraryToDelete(null)
    }
  }

  // Phân trang
  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(itineraries?.length / itemsPerPage)
  const currentItineraries = itineraries?.slice(
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
          <ItineraryFilter filters={filters} onFilterChange={handleFilterChange} />

          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol sm={5}>
                  <h4 className="card-title mb-0">Danh sách lịch trình</h4>
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
              <ItineraryTable
                currentItineraries={currentItineraries}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                handleEdit={openForm}
                handleDeleteClick={handleDeleteClick}
              />
            </CCardBody>
          </CCard>
          <ItineraryFormModal
            visible={formModalVisible}
            onClose={closeForm}
            onSubmit={submitForm}
            initialData={editingItinerary}
            tours={tours}
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

export default Itinerary
