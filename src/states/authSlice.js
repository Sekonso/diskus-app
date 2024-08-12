import { createSlice } from '@reduxjs/toolkit'
import { register, login, getUserMe } from '../utils/API'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    me: {},
    loading: false,
    error: { error: false, message: true }
  },
  reducers: {
    setAuthMe: (state, action) => {
      state.me = action.payload
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload
    },
    setAuthError: (state, action) => {
      state.error = action.payload
    },
    authLogout: (state) => {
      state.me = {}
      localStorage.removeItem('token')
    }
  }
})

// Async thunk
const asyncRegister = (data, navigate) => async (dispatch) => {
  dispatch(setAuthLoading(true))
  dispatch(setAuthError({ error: false, message: '' }))

  try {
    await register(data)
    navigate('/user/login')
  } catch (error) {
    console.error(error)
    dispatch(setAuthError({ error: true, message: error.message }))
  } finally {
    dispatch(setAuthLoading(false))
  }
}

const asyncLogin = (data, navigate) => async (dispatch) => {
  dispatch(setAuthLoading(true))
  dispatch(setAuthError({ error: false, message: '' }))

  try {
    const res = await login(data)
    localStorage.setItem('token', res.data.token)

    const resMe = await getUserMe()
    dispatch(setAuthMe(resMe.data.user))

    navigate('/user')
  } catch (error) {
    console.error(error)
    dispatch(setAuthError({ error: true, message: error.message }))
  } finally {
    dispatch(setAuthLoading(false))
  }
}

const asyncReceiveAuthMe = () => async (dispatch) => {
  dispatch(setAuthLoading(true))
  dispatch(setAuthError({ error: false, message: '' }))
  try {
    const res = await getUserMe()
    dispatch(setAuthMe(res.data.user))
  } catch (error) {
    console.error(error)
  } finally {
    dispatch(setAuthLoading(false))
  }
}

// Selector
const selectAuth = (state) => state.auth

// Exports actions, async/selectors, reducer
export const { setAuthMe, setAuthLoading, setAuthError, authLogout } = authSlice.actions
export { selectAuth, asyncLogin, asyncRegister, asyncReceiveAuthMe }
export default authSlice.reducer
