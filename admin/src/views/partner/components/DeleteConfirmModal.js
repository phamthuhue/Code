import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react'

const DeleteConfirmModal = ({ visible, onClose, onConfirm }) => {
  return (
    <CModal
      alignment="center"
      visible={visible}
      onClose={onClose}
      backdrop="static"
      size="md" // Có thể dùng lg nếu muốn to hơn
    >
      <CModalHeader>Bạn có chắc chắn?</CModalHeader>
      <CModalBody>
        <p>Bạn có chắc chắn muốn xoá đối tác này? Hành động này không thể hoàn tác.</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          ❌ Hủy
        </CButton>
        <CButton color="danger" onClick={onConfirm}>
          ✅ Xác nhận xoá
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default DeleteConfirmModal