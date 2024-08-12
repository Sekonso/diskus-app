import { createSlice } from '@reduxjs/toolkit'
import {
  getThread,
  upvoteThread,
  downvoteThread,
  neutralizeVoteThread,
  upvoteComment,
  downvoteComment,
  neutralizeVoteComment,
  createComment
} from '../utils/API'
import { hideLoading, showLoading } from 'react-redux-loading-bar'

// Slicer
const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: {
    value: {},
    comments: [],
    loading: false,
    error: { error: false, message: '' }
  },
  reducers: {
    setThread: (state, action) => {
      state.value = action.payload
    },
    setThreadLoading: (state, action) => {
      state.loading = action.payload
    },
    setThreadError: (state, action) => {
      state.error = action.payload
    },
    setUpvoteThread: (state, action) => {
      const { userId } = action.payload
      state.value.downVotesBy = state.value.downVotesBy.filter((vote) => vote !== userId)
      state.value.upVotesBy.push(userId)
    },
    setDownvoteThread: (state, action) => {
      const { userId } = action.payload
      state.value.upVotesBy = state.value.upVotesBy.filter((vote) => vote !== userId)
      state.value.downVotesBy.push(userId)
    },
    setNeutralVoteThread: (state, action) => {
      const { userId } = action.payload
      state.value.upVotesBy = state.value.upVotesBy.filter((vote) => vote !== userId)
      state.value.downVotesBy = state.value.downVotesBy.filter((vote) => vote !== userId)
    },
    setComments: (state, action) => {
      state.comments = action.payload
    },
    setNewComment: (state, action) => {
      state.comments.unshift(action.payload)
    },
    setUpvoteComment: (state, action) => {
      const { commentId, userId } = action.payload
      const updatedComment = state.comments.find((comment) => comment.id === commentId)

      if (updatedComment) {
        updatedComment.downVotesBy = updatedComment.downVotesBy.filter((vote) => vote !== userId)
        updatedComment.upVotesBy.push(userId)
      }
    },
    setDownvoteComment: (state, action) => {
      const { commentId, userId } = action.payload
      const updatedComment = state.comments.find((comment) => comment.id === commentId)

      if (updatedComment) {
        updatedComment.upVotesBy = updatedComment.upVotesBy.filter((vote) => vote !== userId)
        updatedComment.downVotesBy.push(userId)
      }
    },
    setNeutralVoteComment: (state, action) => {
      const { commentId, userId } = action.payload
      const updatedComment = state.comments.find((comment) => comment.id === commentId)

      if (updatedComment) {
        updatedComment.downVotesBy = updatedComment.downVotesBy.filter((vote) => vote !== userId)
        updatedComment.upVotesBy = updatedComment.upVotesBy.filter((vote) => vote !== userId)
      }
    }
  }
})

// Async thunk
const asyncReceiveThread = (id) => async (dispatch) => {
  dispatch(setThreadLoading(true))
  dispatch(setThreadError({ error: false, message: '' }))
  dispatch(showLoading())

  try {
    const res = await getThread(id)

    dispatch(setThread(res.data.detailThread))
    dispatch(setComments(res.data.detailThread.comments))
  } catch (error) {
    console.error(error)
    dispatch(setThreadError({ error: true, message: error.message }))
  } finally {
    dispatch(setThreadLoading(false))
    dispatch(hideLoading())
  }
}

const asyncUpvoteThread = (threadId, userId) => async (dispatch) => {
  try {
    dispatch(setUpvoteThread({ userId }))
    await upvoteThread(threadId)
  } catch (error) {
    console.error(error)
  }
}

const asyncDownvoteThread = (threadId, userId) => async (dispatch) => {
  try {
    dispatch(setDownvoteThread({ userId }))
    await downvoteThread(threadId)
  } catch (error) {
    console.error(error)
  }
}

const asyncNeutralVoteThread = (threadId, userId) => async (dispatch) => {
  try {
    dispatch(setNeutralVoteThread({ userId }))
    await neutralizeVoteThread(threadId)
  } catch (error) {
    console.error(error)
  }
}

const asyncCreateComment =
  ({ threadId, content, me }) =>
    async (dispatch) => {
      try {
        const newComment = {
          id: `comment-${+new Date()}`,
          content,
          createdAt: new Date().toISOString(),
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: me.id,
            name: me.name,
            email: me.email,
            avatar: me.avatar
          }
        }
        dispatch(setNewComment(newComment))

        await createComment(threadId, content)
      } catch (error) {
        console.error(error)
        window.alert(error.message)
      }
    }

const asyncUpvoteComment = (threadId, commentId, userId) => async (dispatch) => {
  try {
    dispatch(setUpvoteComment({ commentId, userId }))
    await upvoteComment(threadId, commentId)
  } catch (error) {
    console.error(error)
  }
}

const asyncDownvoteComment = (threadId, commentId, userId) => async (dispatch) => {
  try {
    dispatch(setDownvoteComment({ commentId, userId }))
    await downvoteComment(threadId, commentId)
  } catch (error) {
    console.error(error)
  }
}

const asyncNeutralVoteComment = (threadId, commentId, userId) => async (dispatch) => {
  try {
    dispatch(setNeutralVoteComment({ commentId, userId }))
    await neutralizeVoteComment(threadId, commentId)
  } catch (error) {
    console.error(error)
  }
}

// Selector
const selectThreadDetail = (state) => state.threadDetail

// Exports actions, async/selectors, reducer
export const {
  setThread,
  setThreadLoading,
  setThreadError,
  setUpvoteThread,
  setDownvoteThread,
  setNeutralVoteThread,
  setComments,
  setNewComment,
  setUpvoteComment,
  setDownvoteComment,
  setNeutralVoteComment
} = threadDetailSlice.actions

export {
  selectThreadDetail,
  asyncReceiveThread,
  asyncUpvoteThread,
  asyncDownvoteThread,
  asyncNeutralVoteThread,
  asyncCreateComment,
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncNeutralVoteComment
}

export default threadDetailSlice.reducer
