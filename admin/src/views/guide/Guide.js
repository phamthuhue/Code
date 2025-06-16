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
import GuideFormModal from './components/GuideForm.js'
import { getTours } from '../../services/Api/tourService.js'
import { createGuide, deleteGuide, getGuides, updateGuide } from '../../services/Api/guideService.js'
import GuideTable from './components/GuideTable.js'
import GuideFilter from './components/GuideFilter.js'

const Guide = () => {
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

  // Danh sách guides
  const [guides, setGuides] = useState([])
  useEffect(() => {
    fetchGuides()
  }, [])

  const fetchGuides = async (filterValues = filters) => {
    try {
      const res = await getGuides()
      let data = res.data.data

      if (filterValues.name) {
        data = data.filter(p =>
          p.name?.toLowerCase().includes(filterValues.name.toLowerCase())
        )
      }

      if (filterValues.phone) {
        data = data.filter(p =>
          p.phone?.toLowerCase().includes(filterValues.phone.toLowerCase())
        )
      }

      setGuides(data)
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách đối tác.'))
    }
  }

    // Xử lý bộ lọc
    const [filters, setFilters] = useState({
    name: '',
    phone: ''
    })

    const handleFilterChange = (updatedFilters) => {
        setFilters(updatedFilters)
        fetchGuides(updatedFilters)
    }

  // Thêm mới và cập nhật guide
  const openForm = (guide = null) => {
    setEditingGuide(guide)
    setFormModalVisible(true)
  }

  const closeForm = () => {
    setFormModalVisible(false)
    setEditingGuide(null)
  }

  const [formModalVisible, setFormModalVisible] = useState(false)
  const [editingGuide, setEditingGuide] = useState(null)

  const submitForm = async (formData) => {
    try {
      if (editingGuide) {
        // Cập nhật guide
        const updatedGuide = await updateGuide(editingGuide._id, formData)
        setGuides(guides.map((g) => (g._id === editingGuide._id ? updatedGuide.data : g)))
        addToast(exampleToast('Cập nhật hướng dẫn thành công'))
      } else {
        // Thêm mới guide
        const newGuide = await createGuide(formData)
        setGuides([...guides, newGuide.data])
        addToast(exampleToast('Thêm mới hướng dẫn thành công'))
      }
      await fetchGuides()
      closeForm()
    } catch (error) {
      console.error('Lỗi khi submit form:', error)
      addToast(exampleToast('Có lỗi xảy ra. Vui lòng thử lại.'))
    }
  }

  // Xử lý xóa
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [guideToDelete, setGuideToDelete] = useState(null)

  const handleDeleteClick = (guide) => {
    setGuideToDelete(guide)
    setDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteGuide(guideToDelete._id)
      setGuides(guides.filter((g) => g._id !== guideToDelete._id))
      addToast(exampleToast('Xóa hướng dẫn thành công'))
    } catch (error) {
      console.error('Lỗi khi xóa guide:', error)
      addToast(exampleToast('Xóa hướng dẫn thất bại'))
    } finally {
      setDeleteModalVisible(false)
      setGuideToDelete(null)
    }
  }

  // Phân trang
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(guides?.length / itemsPerPage)
  const currentGuides = guides?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <>
      <CRow>
        <CCol xs>
          <GuideFilter filters={filters} onFilterChange={handleFilterChange} />

          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol sm={5}>
                  <h4 className="card-title mb-0">Danh sách hướng dẫn</h4>
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
              <GuideTable
                currentGuides={currentGuides}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                handleEdit={openForm}
                handleDeleteClick={handleDeleteClick}
              />
            </CCardBody>
          </CCard>
          <GuideFormModal
            visible={formModalVisible}
            onClose={closeForm}
            onSubmit={submitForm}
            initialData={editingGuide}
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

export default Guide