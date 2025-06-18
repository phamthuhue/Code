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
import AccountForm from './components/AccountForm'
import AccountTable from './components/AccountTable'
import AccountFilter from './components/AccountFilter'

import { getUsers, createUser, updateUser, deleteUser } from '../../services/Api/accountService'

const User = () => {
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

  const [users, setUsers] = useState([])

  const [filters, setFilters] = useState({
    username: '',
    email: '',
    gender: '',
  })

  const fetchUsers = async (filterValues = filters) => {
    try {
      const res = await getUsers(filterValues)
      setUsers(res.data.data || [])
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách người dùng.'))
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters)
    fetchUsers(updatedFilters)
  }

  const [formModalVisible, setFormModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  const openForm = (user = null) => {
    setEditingUser(user)
    setFormModalVisible(true)
  }

  const closeForm = () => {
    setEditingUser(null)
    setFormModalVisible(false)
  }

  const submitForm = async (formData) => {
    try {
      if (editingUser) {
        const res = await updateUser(editingUser._id, formData)
        setUsers(users.map((u) => (u._id === editingUser._id ? res.data : u)))
        addToast(exampleToast('Cập nhật người dùng thành công'))
      } else {
        const res = await createUser(formData)
        setUsers([...users, res.data])
        addToast(exampleToast('Thêm mới người dùng thành công'))
      }
      await fetchUsers()
      closeForm()
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Đã xảy ra lỗi khi lưu dữ liệu.'))
    }
  }

  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  const handleDeleteClick = (user) => {
    setUserToDelete(user)
    setDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteUser(userToDelete._id)
      setUsers(users.filter((u) => u._id !== userToDelete._id))
      addToast(exampleToast('Xóa người dùng thành công'))
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể xóa người dùng.'))
    } finally {
      setDeleteModalVisible(false)
    }
  }

  // Phân trang
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(users.length / itemsPerPage)
  const currentData = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <CRow>
      <CCol xs>
        <AccountFilter filters={filters} onFilterChange={handleFilterChange} />
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol sm={6}>
                <h4 className="mb-0">Danh sách người dùng</h4>
              </CCol>
              <CCol sm={6} className="text-end">
                <CButton color="primary" onClick={() => openForm()}>
                  <CIcon icon={cilPlus} className="me-1" />
                  Thêm mới
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <AccountTable
              users={currentData}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              handleEdit={openForm}
              handleDeleteClick={handleDeleteClick}
            />
          </CCardBody>
        </CCard>

        <AccountForm
          visible={formModalVisible}
          onClose={closeForm}
          onSubmit={submitForm}
          initialData={editingUser}
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

export default User
