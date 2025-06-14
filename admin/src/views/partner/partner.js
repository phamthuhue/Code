import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CToast, CToastBody, CToaster, CToastHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { useEffect, useRef, useState } from 'react'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import PartnerFormModal from './components/PartnerForm'
import PartnerTable from './components/PartnerTable'
import PartnerFilter from './components/PartnerFilter'
import {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from '../../services/Api/partnerService'
import {
  getPartnerTypes,
} from '../../services/Api/partnerTypeService'

const Partner = () => {
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

  const [partners, setPartners] = useState([])

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async (filterValues = filters) => {
    try {
      const res = await getPartners()
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

      if (filterValues.type) {
        data = data.filter(p => p.partnerTypeId._id === filterValues.type)
      }

      setPartners(data)
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách đối tác.'))
    }
  }

  const [partnerTypes, setPartnerTypes] = useState([])
  
    useEffect(() => {
      fetchPartnerTypes()
    }, [])
  
    const fetchPartnerTypes = async () => {
      try {
        const res = await getPartnerTypes()
        setPartnerTypes(res.data.data)
      } catch (error) {
        console.error(error)
        addToast(exampleToast('Không thể tải danh sách loại đối tác.'))
      }
    }
    // Xử lý bộ lọc
  const [filters, setFilters] = useState({
    name: '',
    phone: '',
    type: ''
  })

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters)
    fetchPartners(updatedFilters)
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
        const res = await updatePartner(editingType._id, formData)
        setPartners(partners.map(pt => pt._id === editingType._id ? res.data : pt))
        addToast(exampleToast('Cập nhật đối tác thành công'))
      } else {
        const res = await createPartner(formData)
        setPartners([...partners, res.data])
        addToast(exampleToast('Thêm mới đối tác thành công'))
      }
      await fetchPartners()
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
      await deletePartner(typeToDelete._id)
      setPartners(partners.filter(pt => pt._id !== typeToDelete._id))
      addToast(exampleToast('Xóa đối tác thành công'))
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể xóa đối tác.'))
    } finally {
      setDeleteModalVisible(false)
    }
  }

  // Phân trang
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(partners.length / itemsPerPage)

  const currentPartners = partners.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <CRow>
      <CCol xs>
        <PartnerFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          partnerTypes={partnerTypes}
        />
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol sm={6}><h4 className="mb-0">Danh sách đối tác</h4></CCol>
              <CCol sm={6} className="text-end">
                <CButton color="primary" onClick={() => openForm()}>
                  <CIcon icon={cilPlus} className="me-1" />
                  Thêm mới
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <PartnerTable
              currentPartners={currentPartners}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              handleEdit={openForm}
              handleDeleteClick={handleDeleteClick}
            />
          </CCardBody>
        </CCard>

        <PartnerFormModal
          visible={formModalVisible}
          onClose={closeForm}
          onSubmit={submitForm}
          initialData={editingType}
          partnerTypes = {partnerTypes}
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

export default Partner