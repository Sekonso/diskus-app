import { createSlice } from '@reduxjs/toolkit'
import { getLeaderboards } from '../utils/API'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

// Slicer
const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    value: [],
    loading: false,
    error: { error: false, message: '' }
  },
  reducers: {
    setLeaderboard: (state, action) => {
      state.value = action.payload
    },
    setLeaderboardLoading: (state, action) => {
      state.loading = action.payload
    },
    setLeaderboardError: (state, action) => {
      state.error = action.payload
    }
  }
})

// Async thunk
const asyncReceiveLeaderboards = () => async (dispatch) => {
  dispatch(setLeaderboardLoading(true))
  dispatch(setLeaderboardError({ error: false, message: '' }))
  dispatch(showLoading())

  try {
    const res = await getLeaderboards()

    dispatch(setLeaderboard(res.data.leaderboards))
  } catch (error) {
    console.error(error)
    dispatch(setLeaderboardError({ error: true, message: error.message }))
  } finally {
    dispatch(setLeaderboardLoading(false))
    dispatch(hideLoading())
  }
}

// Selector
const selectLeaderboards = (state) => state.leaderboard

export const { setLeaderboard, setLeaderboardLoading, setLeaderboardError } =
  leaderboardSlice.actions

export { asyncReceiveLeaderboards, selectLeaderboards }

export default leaderboardSlice.reducer
