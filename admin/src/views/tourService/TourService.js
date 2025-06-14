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

import DeleteConfirmModal from './components/DeleteConfirmModal.js'
import TourServiceForm from './components/TourServiceForm.js'
import TourServiceFilter from './components/TourServiceFilter.js'
import TourServiceTable from './components/TourServiceTable.js'

import {
  getTourServices,
  getServicesByTourId,
  createTourService,
  deleteTourService,
  updateTourService,
} from '../../services/Api/serviceOfTour.js'

import {
  getServices
} from '../../services/Api/service.js'

import {getToursWithoutService} from '../../services/Api/tourService.js'

const TourService = () => {
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
        <div className="fw-bold me-auto"></div>
        <small></small>
      </CToastHeader>
      <CToastBody>{message}</CToastBody>
    </CToast>
  )

  const [tourServices, setTourServices] = useState([])
  const [services, setServices] = useState([])
  const [tours, setTours] = useState([])
  const [filters, setFilters] = useState({
    name: '',
  })

  useEffect(() => {
    fetchTourServices(filters)
  }, [filters])
  
  const fetchTourServices = async (filterValues = {}) => {
    try {
      const res = await getTourServices()
      let data = res.data

      // Lọc theo tên tour
      if (filterValues.name) {
        data = data.filter(p =>
          p.tourId?.title?.toLowerCase().includes(filterValues.name.toLowerCase())
        )
      }

      setTourServices(data)
    } catch (error) {
      console.error('Lỗi khi tải danh sách lịch trình:', error)
    }
  }

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters)
    fetchTourServices(updatedFilters)
  }

  useEffect(() => {
    fetchServices()
  }, [])
  const fetchServices = async () => {
    const res = await getServices()
    setServices(res.data)
  }

  useEffect(() => {
    fetchTours()
  }, [])
  const fetchTours = async () => {
    const res = await getToursWithoutService()
    setTours(res.data)
  }

  const openForm = (tourService = null) => {
    setEditingTourService(tourService)
    setFormModalVisible(true)
  }

  const closeForm = () => {
    setFormModalVisible(false)
    setEditingTourService(null)
  }

  const [formModalVisible, setFormModalVisible] = useState(false)
  const [editingTourService, setEditingTourService] = useState(null)

  const submitForm = async (formData) => {
    try {
      if (editingTourService) {
        const updated = await updateTourService(editingTourService._id, formData)
        setTourServices((prev) =>
          prev.map((item) => (item._id === editingTourService._id ? updated.data : item)),
        )
        addToast(exampleToast('Cập nhật dịch vụ tour thành công'))
      } else {
        const created = await createTourService(formData)
        setTourServices((prev) => [...prev, created.data])
        addToast(exampleToast('Thêm dịch vụ tour thành công'))
      }
      await fetchTourServices()
      closeForm()
    } catch (error) {
      console.error('Lỗi submit form:', error)
      addToast(exampleToast('Có lỗi xảy ra. Vui lòng thử lại.'))
    }
  }

  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [tourServiceToDelete, setTourServiceToDelete] = useState(null)

  const handleDeleteClick = (tourService) => {
    setTourServiceToDelete(tourService)
    setDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteTourService(tourServiceToDelete._id)
      setTourServices((prev) => prev.filter((item) => item._id !== tourServiceToDelete._id))
      addToast(exampleToast('Xóa dịch vụ tour thành công'))
    } catch (error) {
      console.error('Lỗi xóa dịch vụ tour:', error)
      addToast(exampleToast('Xóa thất bại'))
    } finally {
      setDeleteModalVisible(false)
      setTourServiceToDelete(null)
    }
  }

  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(tourServices.length / itemsPerPage)
  const currentTourServices = tourServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <CRow>
      <CCol xs>
        <TourServiceFilter filters={filters} onFilterChange={handleFilterChange} />

        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol sm={5}>
                <h4 className="card-title mb-0">Danh sách dịch vụ tour</h4>
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
            <TourServiceTable
              currentServices={currentTourServices}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              handleEdit={openForm}
              handleDeleteClick={handleDeleteClick}
            />
          </CCardBody>
        </CCard>

        <TourServiceForm
          visible={formModalVisible}
          onClose={closeForm}
          onSubmit={submitForm}
          initialData={editingTourService}
          serviceOptions = {services}
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
  )
}

export default TourService