import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CToast, CToastBody, CToaster, CToastHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { useEffect, useRef, useState } from 'react'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import PartnerTypeFormModal from './components/PartnerTypeForm'
import PartnerTypeTable from './components/PartnerTypeTable'
import {
  getPartnerTypes,
  createPartnerType,
  updatePartnerType,
  deletePartnerType,
} from '../../services/Api/partnerTypeService'
import PartnerTypeFilter from './components/PartnerTypeFilter'

const PartnerType = () => {
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

  const [partnerTypes, setPartnerTypes] = useState([])

  useEffect(() => {
    fetchPartnerTypes()
  }, [])

  const fetchPartnerTypes = async (filterValues = filters) => {
    try {
      const res = await getPartnerTypes()

      let data = res.data.data

      // Lọc trên client theo tên (nếu có nhập)
      if (filterValues.name) {
        data = data.filter((pt) =>
          pt.name.toLowerCase().includes(filterValues.name.toLowerCase())
        )
      }

      setPartnerTypes(data)
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách loại đối tác.'))
    }
  }

  const [filters, setFilters] = useState({
    name: '',
  })
  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters)
    fetchPartnerTypes(updatedFilters) // gọi lại với bộ lọc mới
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
        const res = await updatePartnerType(editingType._id, formData)
        setPartnerTypes(partnerTypes.map(pt => pt._id === editingType._id ? res.data : pt))
        addToast(exampleToast('Cập nhật loại đối tác thành công'))
      } else {
        const res = await createPartnerType(formData)
        setPartnerTypes([...partnerTypes, res.data])
        addToast(exampleToast('Thêm mới loại đối tác thành công'))
      }
      await fetchPartnerTypes()
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
      await deletePartnerType(typeToDelete._id)
      setPartnerTypes(partnerTypes.filter(pt => pt._id !== typeToDelete._id))
      addToast(exampleToast('Xóa loại đối tác thành công'))
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể xóa loại đối tác.'))
    } finally {
      setDeleteModalVisible(false)
    }
  }

  // Phân trang
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(partnerTypes.length / itemsPerPage)

  const currentPartnerTypes = partnerTypes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <CRow>
      <CCol xs>
        <PartnerTypeFilter filters={filters} onFilterChange={handleFilterChange} />
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol sm={6}><h4 className="mb-0">Danh sách loại đối tác</h4></CCol>
              <CCol sm={6} className="text-end">
                <CButton color="primary" onClick={() => openForm()}>
                  <CIcon icon={cilPlus} className="me-1" />
                  Thêm mới
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <PartnerTypeTable
              currentPartnerTypes={currentPartnerTypes}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              handleEdit={openForm}
              handleDeleteClick={handleDeleteClick}
            />
          </CCardBody>
        </CCard>

        <PartnerTypeFormModal
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

export default PartnerType