import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import mockTours from './mockData'
import { useEffect, useState } from 'react'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import TourFormModal from './TourForm'

import { createTour, getTours, updateTour } from '../../services/Api/tourService'
import TourTable from './components/TourTable'
import TourFilter from './components/TourFilter'

const Tour = () => {
  // Danh sách tour
  const [tours, setTours] = useState([])
  useEffect(() => {
    fetchTours()
  }, [])

  const fetchTours = async () => {
    const res = await getTours()
    setTours(res.data.data)
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
    console.log('tour: ', tour)
    setEditingTour(tour)
    setFormModalVisible(true)
  }

  const closeForm = () => {
    setFormModalVisible(false)
    setEditingTour(null)
  }

  const [formModalVisible, setFormModalVisible] = useState(false)
  const [editingTour, setEditingTour] = useState(null)

  const submitForm = (formData) => {
    const updated = editingTour ? updateTour(editingTour._id, formData) : createTour(formData)
    setTours(updated)
    closeForm()
  }

  // Xử lý xóa
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [tourToDelete, setTourToDelete] = useState(null)
  const handleDeleteClick = (tour) => {
    setTourToDelete(tour)
    setDeleteModalVisible(true)
  }

  const confirmDelete = () => {
    setTours(tours.filter((t) => t.id !== tourToDelete.id))
    setDeleteModalVisible(false)
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
          />
          <DeleteConfirmModal
            visible={deleteModalVisible}
            onClose={() => setDeleteModalVisible(false)}
            onConfirm={confirmDelete}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default Tour
