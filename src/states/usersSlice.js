import { createSlice } from '@reduxjs/toolkit'
import { getAllUsers } from '../utils/API'

// Slicer
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: [],
    loading: true,
    error: { error: false, message: '' }
  },
  reducers: {
    setUsers: (state, action) => {
      state.value = action.payload
    },

    setUsersLoading: (state, action) => {
      state.loading = action.payload
    },
    setUsersError: (state, action) => {
      state.error = action.payload
    }
  }
})

// Async thunk
const asyncReceiveUsers = () => async (dispatch) => {
  dispatch(setUsersLoading(true))
  dispatch(setUsersError({ error: false, message: '' }))

  try {
    const res = await getAllUsers()
    dispatch(setUsers(res.data.users))
  } catch (error) {
    console.error(error)
    dispatch(setUsersError({ error: true, message: error.message }))
  } finally {
    dispatch(setUsersLoading(false))
  }
}

// Selector
const selectUsers = (state) => state.users

// Exports actions, async/selectors, reducer
export const { setUsers, setUsersLoading, setUsersError } = usersSlice.actions
export { selectUsers, asyncReceiveUsers }
export default usersSlice.reducer
