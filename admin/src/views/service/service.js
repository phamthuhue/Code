import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CToast, CToastBody, CToaster, CToastHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { useEffect, useRef, useState } from 'react'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import ServiceFormModal from './components/ServiceForm'
import ServiceTable from './components/ServiceTable'
import ServiceFilter from './components/ServiceFilter'
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from '../../services/Api/service'
import {
  getPartners,
} from '../../services/Api/partnerService'

const Service = () => {
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

  const [services, setServices] = useState([])

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async (filterValues = filters) => {
    try {
      const res = await getServices()
      let data = res.data

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

      if (filterValues.partnerId) {
        data = data.filter(p => p.partnerId._id === filterValues.partnerId)
      }

      setServices(data)
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách đối tác.'))
    }
  }

    const [partners, setPartners] = useState([])
  
    useEffect(() => {
      fetchPartners()
    }, [])
  
    const fetchPartners = async () => {
      try {
        const res = await getPartners()
        setPartners(res.data.data)
      } catch (error) {
        console.error(error)
        addToast(exampleToast('Không thể tải danh sách đối tác.'))
      }
    }
    // Xử lý bộ lọc
    const [filters, setFilters] = useState({
    name: '',
    partnerId: ''
    })

    const handleFilterChange = (updatedFilters) => {
        setFilters(updatedFilters)
        fetchServices(updatedFilters)
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
        const res = await updateService(editingType._id, formData)
        setServices(services.map(pt => pt._id === editingType._id ? res.data : pt))
        addToast(exampleToast('Cập nhật dịch vụ thành công'))
      } else {
        const res = await createService(formData)
        setServices([...services, res.data])
        addToast(exampleToast('Thêm mới dịch vụ thành công'))
      }
      await fetchServices()
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
      await deleteService(typeToDelete._id)
      setServices(services.filter(pt => pt._id !== typeToDelete._id))
      addToast(exampleToast('Xóa dịch vụ thành công'))
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể xóa dịch vụ.'))
    } finally {
      setDeleteModalVisible(false)
    }
  }

  // Phân trang
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil((services?.length || 0) / itemsPerPage)

  const currentData = services.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <CRow>
      <CCol xs>
        <ServiceFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          partners={partners}
        />
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol sm={6}><h4 className="mb-0">Danh sách dịch vụ</h4></CCol>
              <CCol sm={6} className="text-end">
                <CButton color="primary" onClick={() => openForm()}>
                  <CIcon icon={cilPlus} className="me-1" />
                  Thêm mới
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <ServiceTable
              currentData={currentData}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              handleEdit={openForm}
              handleDeleteClick={handleDeleteClick}
            />
          </CCardBody>
        </CCard>

        <ServiceFormModal
          visible={formModalVisible}
          onClose={closeForm}
          onSubmit={submitForm}
          initialData={editingType}
          partners = {partners}
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

export default Service