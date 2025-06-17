import {
  CButton, CCard, CCardBody, CCardHeader, CCol, CRow,
  CToast, CToastBody, CToaster, CToastHeader
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import { useEffect, useRef, useState } from 'react'

import DeleteConfirmModal from './components/DeleteConfirmModal'
import ReviewFormModal from './components/ReviewForm'
import ReviewTable from './components/ReviewTable'
import ReviewFilter from './components/ReviewFilter'

import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from '../../services/Api/reviewService'
import {getGuides} from '../../services/Api/guideService'
import {getTours} from '../../services/Api/tourService'

const Review = () => {
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

  const [reviews, setReviews] = useState([])
  const [tours, setTours] = useState([])
  const [guides, setGuides] = useState([])
  const fetchTours = async () => {
    try {
      const res = await getTours()
      let data = res.data.data
      setTours(data)
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách tour.'))
    }
  }
  const fetchGuides = async () => {
    try {
      const res = await getGuides()
      let data = res.data.data
      setGuides(data)
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách hướng dẫn viên.'))
    }
  }

  const [filters, setFilters] = useState({
    username: '',
    email: '',
    tourId: '',
    guideId: '',
  })

  const fetchReviews = async (filterValues = filters) => {
    try {
      const res = await getReviews()
      let data = res.data.data

      if (filterValues.username) {
        data = data.filter(r =>
          r.userId?.username?.toLowerCase().includes(filterValues.username.toLowerCase())
        )
      }

      if (filterValues.tourId) {
        data = data.filter(r =>
          r.tourId?._id?.toLowerCase().includes(filterValues.tourId.toLowerCase())
        )
      }

      if (filterValues.guideId) {
        data = data.filter(r =>
          r.guideId?._id?.toLowerCase().includes(filterValues.guideId.toLowerCase())
        )
      }

      setReviews(data)
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể tải danh sách đánh giá.'))
    }
  }

  useEffect(() => {
    fetchReviews()
    fetchGuides()
    fetchTours()
  }, [])

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters)
    fetchReviews(updatedFilters)
  }

  const [formModalVisible, setFormModalVisible] = useState(false)
  const [editingReview, setEditingReview] = useState(null)

  const openForm = (review = null) => {
    setEditingReview(review)
    setFormModalVisible(true)
  }

  const closeForm = () => {
    setFormModalVisible(false)
    setEditingReview(null)
  }

  const submitForm = async (formData) => {
    try {
      if (editingReview) {
        const res = await updateReview(editingReview._id, formData)
        setReviews(reviews.map(r => r._id === editingReview._id ? res.data : r))
        addToast(exampleToast('Cập nhật đánh giá thành công'))
      } else {
        const res = await createReview(formData)
        setReviews([...reviews, res.data])
        addToast(exampleToast('Thêm mới đánh giá thành công'))
      }
      await fetchReviews()
      closeForm()
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Đã xảy ra lỗi khi lưu dữ liệu.'))
    }
  }

  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [reviewToDelete, setReviewToDelete] = useState(null)

  const handleDeleteClick = (review) => {
    setReviewToDelete(review)
    setDeleteModalVisible(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteReview(reviewToDelete._id)
      setReviews(reviews.filter(r => r._id !== reviewToDelete._id))
      addToast(exampleToast('Xóa đánh giá thành công'))
    } catch (error) {
      console.error(error)
      addToast(exampleToast('Không thể xóa đánh giá.'))
    } finally {
      setDeleteModalVisible(false)
    }
  }

  // Phân trang
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(reviews.length / itemsPerPage)

  const currentReviews = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <CRow>
      <CCol xs>
        <ReviewFilter
          filters={filters}
          onFilterChange={handleFilterChange}
          tours={tours}
          guides={guides}
        />

        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol sm={6}>
                <h4 className="mb-0">Danh sách đánh giá</h4>
              </CCol>
            </CRow>
          </CCardHeader>

          <CCardBody>
            <ReviewTable
              currentReviews={currentReviews}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              handleEdit={openForm}
              handleDeleteClick={handleDeleteClick}
            />
          </CCardBody>
        </CCard>

        <ReviewFormModal
          visible={formModalVisible}
          onClose={closeForm}
          onSubmit={submitForm}
          initialData={editingReview}
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

export default Review