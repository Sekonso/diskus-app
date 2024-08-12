import { createSlice } from '@reduxjs/toolkit'
import {
  downvoteThread,
  getAllThreads,
  neutralizeVoteThread,
  upvoteThread,
  createThread
} from '../utils/API'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

// Slicer
const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    value: [],
    categories: [],
    loading: false,
    error: { error: false, message: '' }
  },
  reducers: {
    setThreads: (state, action) => {
      state.value = action.payload
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setThreadsLoading: (state, action) => {
      state.loading = action.payload
    },
    setThreadsError: (state, action) => {
      state.error = action.payload
    },
    setUpvoteThread: (state, action) => {
      const { threadId, userId } = action.payload
      const thread = state.value.find((thread) => thread.id === threadId)

      if (thread) {
        thread.downVotesBy = thread.downVotesBy.filter((vote) => vote !== userId)
        thread.upVotesBy.push(userId)
      }
    },
    setDownvoteThread: (state, action) => {
      const { threadId, userId } = action.payload
      const thread = state.value.find((thread) => thread.id === threadId)

      if (thread) {
        thread.upVotesBy = thread.upVotesBy.filter((vote) => vote !== userId)
        thread.downVotesBy.push(userId)
      }
    },
    setNeutralVoteThread: (state, action) => {
      const { threadId, userId } = action.payload
      const thread = state.value.find((thread) => thread.id === threadId)

      if (thread) {
        thread.upVotesBy = thread.upVotesBy.filter((vote) => vote !== userId)
        thread.downVotesBy = thread.downVotesBy.filter((vote) => vote !== userId)
      }
    }
  }
})

// Async thunk
const asyncCreateThread = (data, navigate) => async (dispatch) => {
  dispatch(setThreadsLoading(true))
  dispatch(setThreadsError({ error: false, message: '' }))

  try {
    const res = await createThread(data)
    navigate('/')
  } catch (error) {
    console.error(error)
    dispatch(setThreadsError({ error: true, message: error.message }))
  } finally {
    dispatch(setThreadsLoading(false))
  }
}

const asyncReceiveThreads = () => async (dispatch) => {
  dispatch(setThreadsLoading(true))
  dispatch(setThreadsError({ error: false, message: '' }))
  dispatch(showLoading())

  try {
    const res = await getAllThreads()
    const newCategories = await res.data.threads
      .map((thread) => thread.category)
      .filter((category, index, self) => self.indexOf(category) === index)

    dispatch(setThreads(res.data.threads))
    dispatch(setCategories(newCategories))
  } catch (error) {
    console.error(error)
    dispatch(setThreadsError({ error: true, message: error.message }))
  } finally {
    dispatch(setThreadsLoading(false))
    dispatch(hideLoading())
  }
}

const asyncUpvoteThread = (threadId, userId) => async (dispatch) => {
  try {
    dispatch(setUpvoteThread({ threadId, userId }))
    await upvoteThread(threadId)
  } catch (error) {
    console.error(error)
  }
}

const asyncDownvoteThread = (threadId, userId) => async (dispatch) => {
  try {
    dispatch(setDownvoteThread({ threadId, userId }))
    await downvoteThread(threadId)
  } catch (error) {
    console.error(error)
  }
}

const asyncNeutralVoteThread = (threadId, userId) => async (dispatch) => {
  try {
    dispatch(setNeutralVoteThread({ threadId, userId }))
    await neutralizeVoteThread(threadId)
  } catch (error) {
    console.error(error)
  }
}

// Selector
const selectThreads = (state) => state.threads

// Exports actions, async/selectors, reducer
export const {
  setThreads,
  setCategories,
  setThreadsLoading,
  setThreadsError,
  setUpvoteThread,
  setDownvoteThread,
  setNeutralVoteThread
} = threadsSlice.actions

export {
  selectThreads,
  asyncCreateThread,
  asyncReceiveThreads,
  asyncUpvoteThread,
  asyncDownvoteThread,
  asyncNeutralVoteThread
}

export default threadsSlice.reducer
