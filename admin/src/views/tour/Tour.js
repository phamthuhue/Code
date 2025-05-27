import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CImage,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilMap, cifVn } from '@coreui/icons'

import mockTours from './mockData'
import TourForm from './TourForm'
import { useEffect, useState } from 'react'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import TourFormModal from './TourForm'

const Tour = () => {
  // Thêm mới và cập nhật tour
  const [formModalVisible, setFormModalVisible] = useState(false)
  const [editingTour, setEditingTour] = useState(null)
  const handleAddNew = () => {
    setEditingTour(null)
    setFormModalVisible(true)
  }
  const handleEdit = (tour) => {
    setEditingTour(tour)
    setFormModalVisible(true)
  }
  const handleFormSubmit = (formData) => {
    console.log('formData: ', formData)
    if (editingTour) {
      // update
      setTours(tours.map((t) => (t.id === editingTour.id ? { ...t, ...formData } : t)))
    } else {
      // add
      setTours([...tours, { id: Date.now(), ...formData }])
    }
  }
  const handleClose = () => {
    setFormModalVisible(false)
    setEditingTour(null)
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
  const totalPages = Math.ceil(mockTours.length / itemsPerPage)
  console.log('totalPages: ', totalPages)
  const currentTours = mockTours.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Danh sách tour
                  </h4>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CButton color="primary" className="float-end" onClick={handleAddNew}>
                    <div className="small d-flex align-items-center">
                      <CIcon icon={cilPlus} />
                      <span className="ms-1">Thêm mới</span>
                    </div>
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell
                      className="bg-body-tertiary text-center"
                      style={{ width: '160px' }}
                    >
                      <CIcon icon={cilMap} />
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary text-center"
                      style={{ width: '200px' }}
                    >
                      Tên tour
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary text-center"
                      style={{ width: '150px' }}
                    >
                      Thành phố
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary text-center"
                      style={{ width: '140px' }}
                    >
                      Giờ khởi hành
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary text-center"
                      style={{ width: '140px' }}
                    >
                      Giờ kết thúc
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary text-center"
                      style={{ width: '130px' }}
                    >
                      Giá
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary text-center"
                      style={{ width: '250px', minWidth: '250px' }}
                    >
                      Mô tả
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="bg-body-tertiary text-center"
                      style={{ width: '160px' }}
                    >
                      Hành động
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentTours.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan="8" className="text-center text-muted py-4">
                        Không có dữ liệu tour để hiển thị.
                      </CTableDataCell>
                    </CTableRow>
                  ) : (
                    <>
                      {currentTours.map((tour, index) => (
                        <CTableRow key={index}>
                          <CTableDataCell className="text-center" style={{ maxHeight: '120px' }}>
                            <CImage rounded src={tour.photo} width={200} height={200} />
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="text-body-secondary text-nowrap">{tour.title}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div className="d-flex align-items-center justify-content-center">
                              <CIcon size="xl" icon={cifVn} title="Việt Nam" />
                              <span className="ms-2">{tour.city}</span>
                            </div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">{tour.startDate}</CTableDataCell>
                          <CTableDataCell className="text-center">{tour.endDate}</CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div className="fw-semibold">{tour.price.toLocaleString()} VND</div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="small text-body-secondary text-wrap">{tour.desc}</div>
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            <div className="d-flex align-items-center justify-content-center">
                              <CButton
                                color="warning"
                                size="sm"
                                variant="outline"
                                className="me-2"
                                onClick={() => handleEdit(tour)}
                              >
                                Sửa
                              </CButton>
                              <CButton
                                color="danger"
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteClick(tour)}
                              >
                                Xoá
                              </CButton>
                            </div>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </>
                  )}
                </CTableBody>
              </CTable>
              {totalPages > 0 && (
                <div className="d-flex justify-content-center mt-3">
                  <CPagination align="center">
                    <CPaginationItem
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      &laquo;
                    </CPaginationItem>

                    {[...Array(totalPages)].map((_, i) => (
                      <CPaginationItem
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </CPaginationItem>
                    ))}

                    <CPaginationItem
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      &raquo;
                    </CPaginationItem>
                  </CPagination>
                </div>
              )}
            </CCardBody>
          </CCard>
          <TourFormModal
            visible={formModalVisible}
            onClose={handleClose}
            onSubmit={handleFormSubmit}
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
