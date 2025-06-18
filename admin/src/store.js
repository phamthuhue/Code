// src/redux/store.js
import { legacy_createStore as createStore } from 'redux'

// Khởi tạo trạng thái mặc định
const initialState = {
  sidebarShow: true,
  theme: 'light',
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
}

// Reducer xử lý việc thay đổi trạng thái
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'setUser':
      return { ...state, user: rest.user, token: rest.token }
    case 'setLoading':
      return { ...state, loading: rest.loading }
    case 'setError':
      return { ...state, error: rest.error }
    case 'logout':
      return { ...state, user: null, token: null, loading: false, error: null }
    default:
      return state
  }
}

// Tạo Redux store
const store = createStore(changeState)

// Xuất các action cho Redux
export const setUser = (userData) => ({ type: 'setUser', ...userData })
export const setLoading = (loading) => ({ type: 'setLoading', loading })
export const setError = (error) => ({ type: 'setError', error })
export const logout = () => ({ type: 'logout' })

export default store
