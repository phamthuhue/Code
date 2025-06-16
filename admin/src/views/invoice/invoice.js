import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CToast, CToastBody, CToaster, CToastHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { useEffect, useRef, useState } from 'react'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import InvoiceFormModal from './components/InvoiceForm'
import InvoiceTable from './components/InvoiceTable'
import InvoiceFilter from './components/InvoiceFilter'

import {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from '../../services/Api/invoiceService'
import {
  getPromotions,
} from '../../services/Api/promotionService'

const Invoice = () => {
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

  const [invoices, setInvoices] = useState([])
  const [promotions, setPromotions] = useState([])
  const fetchPromotions = async () => {
    try {
      const res = await getPromotions()
      let data = res.data.data
      setPromotions(data)
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách khuyến mãi.'))
    }
  }

  useEffect(() => {
    fetchInvoices()
    fetchPromotions()
  }, [])

  const [filters, setFilters] = useState({
    name: '',
    promotionId: '',
    status: ''
  })

  const fetchInvoices = async (filterValues = filters) => {
    try {
      const res = await getInvoices()
      let data = res.data

      if (filterValues.name) {
        data = data.filter(inv =>
          inv.userId?.username?.toLowerCase().includes(filterValues.name.toLowerCase())
        )
      }

      if (filterValues.promotionId) {
        if (filterValues.promotionId === 'Null') {
          // Lọc các bản ghi không có khuyến mãi
          data = data.filter(inv => !inv.promotionId);
        } else {
          // Lọc theo id khuyến mãi cụ thể
          data = data.filter(inv =>
            inv.promotionId?._id?.toLowerCase().includes(filterValues.promotionId.toLowerCase())
          );
        }
      }

      if (filterValues.status) {
        data = data.filter(inv =>
          inv.paymentStatus?.toLowerCase() === filterValues.status.toLowerCase()
        )
      }

      setInvoices(data)
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách hóa đơn.'))
    }
  }

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters)
    fetchInvoices(updatedFilters)
  }

  const [formModalVisible, setFormModalVisible] = useState(false)
  const [editingInvoice, setEditingInvoice] = useState(null)

  const openForm = (invoice = null) => {
    setEditingInvoice(invoice)
    setFormModalVisible(true)
  }

  const closeForm = () => {
    setFormModalVisible(false)
    setEditingInvoice(null)
  }

  const submitForm = async (formData) => {
    try {
      if (editingInvoice) {
        const res = await updateInvoice(editingInvoice._id, formData)
        setInvoices(invoices.map(inv => inv._id === editingInvoice._id ? res.data : inv))
        addToast(exampleToast('Cập nhật hóa đơn thành công'))
      } else {
        const res = await createInvoice(formData)
        setInvoices([...invoices, res.data])
        addToast(exampleToast('Thêm mới hóa đơn thành công'))
      }
      await fetchInvoices()
      closeForm()
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Đã xảy ra lỗi khi lưu dữ liệu.'))
    }
  }

  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [invoiceToDelete, setInvoiceToDelete] = useState(null)

  const handleDeleteClick = (invoice) => {
    setInvoiceToDelete(invoice)
    setDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteInvoice(invoiceToDelete._id)
      setInvoices(invoices.filter(inv => inv._id !== invoiceToDelete._id))
      addToast(exampleToast('Xóa hóa đơn thành công'))
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể xóa hóa đơn.'))
    } finally {
      setDeleteModalVisible(false)
    }
  }

  // Phân trang
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(invoices.length / itemsPerPage)

  const currentInvoices = invoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <CRow>
      <CCol xs>
        <InvoiceFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          promotions={promotions}
        />
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol sm={6}><h4 className="mb-0">Danh sách hóa đơn</h4></CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <InvoiceTable
              currentInvoices={currentInvoices}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              handleEdit={openForm}
              handleDeleteClick={handleDeleteClick}
            />
          </CCardBody>
        </CCard>

        <InvoiceFormModal
          visible={formModalVisible}
          onClose={closeForm}
          onSubmit={submitForm}
          initialData={editingInvoice}
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

export default Invoice