import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CToast, CToastBody, CToaster, CToastHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { useEffect, useRef, useState } from 'react'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import PromotionFormModal from './components/PromotionForm'
import PromotionTable from './components/PromotionTable'
import {
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
} from '../../services/Api/promotionService'
import PromotionFilter from './components/PromotionFilter'

const Promotion = () => {
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

  const [promotions, setPromotions] = useState([])

  useEffect(() => {
    fetchPromotions()
  }, [])

  const fetchPromotions = async (filterValues = filters) => {
    try {
      const res = await getPromotions()

      let data = res.data.data

      // Lọc trên client theo tên (nếu có nhập)
      if (filterValues.name) {
        data = data.filter((pt) =>
          pt.name.toLowerCase().includes(filterValues.name.toLowerCase())
        )
      }

      if (filterValues.discountType) {
        data = data.filter((pt) =>
          pt.discountType.toLowerCase().includes(filterValues.discountType.toLowerCase())
        )
      }

      setPromotions(data)
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách khuyến mãi.'))
    }
  }

  const [filters, setFilters] = useState({
    name: '',
  })
  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters)
    fetchPromotions(updatedFilters) // gọi lại với bộ lọc mới
  }

  const [formModalVisible, setFormModalVisible] = useState(false)
  const [editingType, setEditingType] = useState(null)

  const openForm = (type = null) => {
    setEditingType(type)
    setFormModalVisible(true)
  }

  const closeForm = () => {
    setFormModalVisible(false)
    setEditingType(null)
  }

  const submitForm = async (formData) => {
    try {
      if (editingType) {
        const res = await updatePromotion(editingType._id, formData)
        setPromotions(promotions.map(pt => pt._id === editingType._id ? res.data : pt))
        addToast(exampleToast('Cập nhật khuyến mãi thành công'))
      } else {
        const res = await createPromotion(formData)
        setPromotions([...promotions, res.data])
        addToast(exampleToast('Thêm mới khuyến mãi thành công'))
      }
      await fetchPromotions()
      closeForm()
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Đã xảy ra lỗi khi lưu dữ liệu.'))
    }
  }

  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [typeToDelete, setTypeToDelete] = useState(null)

  const handleDeleteClick = (type) => {
    setTypeToDelete(type)
    setDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    try {
      await deletePromotion(typeToDelete._id)
      setPromotions(promotions.filter(pt => pt._id !== typeToDelete._id))
      addToast(exampleToast('Xóa khuyến mãi thành công'))
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể xóa khuyến mãi.'))
    } finally {
      setDeleteModalVisible(false)
    }
  }

  // Phân trang
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(promotions.length / itemsPerPage)

  const currentData = promotions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <CRow>
      <CCol xs>
        <PromotionFilter filters={filters} onFilterChange={handleFilterChange} />
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol sm={6}><h4 className="mb-0">Danh sách khuyến mãi</h4></CCol>
              <CCol sm={6} className="text-end">
                <CButton color="primary" onClick={() => openForm()}>
                  <CIcon icon={cilPlus} className="me-1" />
                  Thêm mới
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <PromotionTable
              currentPromotions={currentData}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              handleEdit={openForm}
              handleDeleteClick={handleDeleteClick}
            />
          </CCardBody>
        </CCard>

        <PromotionFormModal
          visible={formModalVisible}
          onClose={closeForm}
          onSubmit={submitForm}
          initialData={editingType}
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

export default Promotion