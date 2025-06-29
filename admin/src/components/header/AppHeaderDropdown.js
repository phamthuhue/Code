import React from 'react'
import { Link } from 'react-router-dom'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilUser, cilPowerStandby, cilLoop } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar from './../../assets/images/avatars/10.png'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../store'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))
  const username = user?.username || 'Người dùng'

  const handleLogout = (event) => {
    event.preventDefault()
    // Xoá token và thông tin người dùng từ Redux store và localStorage
    dispatch(logout()) // Gọi action logout để reset trạng thái trong Redux

    // Xoá thông tin trong localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // Chuyển hướng người dùng về trang đăng nhập
    navigate('/login')
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar} size="md" />
        <span className="ms-2 fw-semibold d-none d-md-inline">{username}</span>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Tài khoản</CDropdownHeader>
        <CDropdownItem
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/edit-profile');
          }}
          style={{ cursor: 'pointer' }}
        >
          <CIcon icon={cilUser} className="me-2" />
          Thông tin cá nhân
        </CDropdownItem>
        <CDropdownItem
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/change-password');
          }}
          style={{ cursor: 'pointer' }}
        >
          <CIcon icon={cilUser} className="me-2" />
          Đổi mật khẩu
        </CDropdownItem>
        {/* <CDropdownItem onClick={() => navigate('/change-password')}>
          <CIcon icon={cilLoop} className="me-2" />
          Đổi mật khẩu
        </CDropdownItem> */}
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon icon={cilPowerStandby} className="me-2" />
          Đăng xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
