import { it, expect, describe } from 'vitest'
import threadDetailReducer, {
  setThread,
  setThreadError,
  setThreadLoading,
  setUpvoteThread,
  setDownvoteThread,
  setNeutralVoteThread,
  setComments,
  setNewComment,
  setUpvoteComment,
  setDownvoteComment,
  setNeutralVoteComment
} from '../../src/states/threadDetailSlice'

describe('Thread detail reducer', () => {
  const initialState = {
    value: {},
    comments: [],
    loading: false,
    error: { error: false, message: '' }
  }

  // THREAD DETAIL
  it('Should return the initial state when given by unknown action', () => {
    // Arrange
    const action = { type: 'unknown' }

    // Action
    const result = threadDetailReducer(initialState, action)

    // Assert
    expect(result).toEqual(initialState)
  })

  it('Should return new state when given by several set actions', () => {
    // Arrange
    const newThread = {
      id: 'thread-1',
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          upVotesBy: [],
          downVotesBy: []
        }
      ]
    }
    const newLoading = true
    const newError = { error: true, message: 'Error test' }

    const expectedResult = {
      value: newThread,
      comments: newThread.comments,
      loading: newLoading,
      error: newError
    }

    const actions = [
      setThread(newThread),
      setComments(newThread.comments),
      setThreadLoading(newLoading),
      setThreadError(newError)
    ]

    // Action
    const result = actions.reduce(
      (state, action) => threadDetailReducer(state, action),
      initialState
    )

    // Assert
    expect(initialState.value).toEqual({})
    expect(result).toEqual(expectedResult)
  })

  it('Should add userId to the upVotesBy and remove it from downVotesBy when the thread is upvoted', () => {
    // Arrange
    const userId = +new Date()
    const newThread = {
      id: 'thread-1',
      upVotesBy: [],
      downVotesBy: [userId]
    }
    const expectedResult = { ...newThread, upVotesBy: [userId], downVotesBy: [] }

    const actions = [setThread(newThread), setUpvoteThread({ userId })]

    // action
    const result = actions.reduce(
      (state, action) => threadDetailReducer(state, action),
      initialState
    )

    // Assert
    expect(result.value).toEqual(expectedResult)
  })

  it('Should add userId to the downVotesBy and remove it from upVotesBy when the thread is downvoted', () => {
    // Arrange
    const userId = +new Date()
    const newThread = {
      id: 'thread-1',
      upVotesBy: [userId],
      downVotesBy: []
    }
    const expectedResult = { ...newThread, upVotesBy: [], downVotesBy: [userId] }

    const actions = [setThread(newThread), setDownvoteThread({ userId })]

    // action
    const result = actions.reduce(
      (state, action) => threadDetailReducer(state, action),
      initialState
    )

    // Assert
    expect(result.value).toEqual(expectedResult)
  })

  it('Should remove userId from the votes when the thread vote is neutralized', () => {
    // Arrange
    const userId = +new Date()
    const newThread = {
      id: 'thread-1',
      upVotesBy: [userId],
      downVotesBy: [userId]
    }
    const expectedResult = { ...newThread, upVotesBy: [], downVotesBy: [] }

    const actions = [setThread(newThread), setNeutralVoteThread({ userId })]

    // action
    const result = actions.reduce(
      (state, action) => threadDetailReducer(state, action),
      initialState
    )

    // Assert
    expect(result.value).toEqual(expectedResult)
  })

  // COMMENTS
  it('Should unshift the new comment to the comment list after adding comments', () => {
    // Arrange
    const newComments = [
      {
        id: 'comment-1',
        upVotesBy: [],
        downVotesBy: []
      }
    ]

    const newComment = {
      id: 'comment-2',
      upVotesBy: [],
      downVotesBy: []
    }

    const expectedResult = [newComment, ...newComments]

    const actions = [setComments(newComments), setNewComment(newComment)]

    // Action
    const result = actions.reduce(
      (state, action) => threadDetailReducer(state, action),
      initialState
    )

    // Assert
    expect(result.comments).toEqual(expectedResult)
  })

  it('Should add userId to the upVotesBy and remove it from downVotesBy when a comment is upvoted', () => {
    // Arrange
    const userId = +new Date()
    const newComment = [
      {
        id: 'comment-1',
        upVotesBy: [],
        downVotesBy: [userId]
      }
    ]
    const expectedResult = [
      {
        id: 'comment-1',
        upVotesBy: [userId],
        downVotesBy: []
      }
    ]

    const actions = [
      setComments(newComment),
      setUpvoteComment({ commentId: newComment[0].id, userId })
    ]

    // action
    const result = actions.reduce(
      (state, action) => threadDetailReducer(state, action),
      initialState
    )

    // Assert
    expect(result.comments).toEqual(expectedResult)
  })

  it('Should add userId to the downVotesBy and remove it from upVotesBy when a comment is downvoted', () => {
    // Arrange
    const userId = +new Date()
    const newComment = [
      {
        id: 'comment-1',
        upVotesBy: [userId],
        downVotesBy: []
      }
    ]
    const expectedResult = [
      {
        id: 'comment-1',
        upVotesBy: [],
        downVotesBy: [userId]
      }
    ]

    const actions = [
      setComments(newComment),
      setDownvoteComment({ commentId: newComment[0].id, userId })
    ]

    // action
    const result = actions.reduce(
      (state, action) => threadDetailReducer(state, action),
      initialState
    )

    // Assert
    expect(result.comments).toEqual(expectedResult)
  })

  it('Should remove userId from the votes when the commment votes is neutralized', () => {
    // Arrange
    const userId = +new Date()
    const newComment = [
      {
        id: 'comment-1',
        upVotesBy: [userId],
        downVotesBy: [userId]
      }
    ]
    const expectedResult = [
      {
        id: 'comment-1',
        upVotesBy: [],
        downVotesBy: []
      }
    ]

    const actions = [
      setComments(newComment),
      setNeutralVoteComment({ commentId: newComment[0].id, userId })
    ]

    // action
    const result = actions.reduce(
      (state, action) => threadDetailReducer(state, action),
      initialState
    )

    // Assert
    expect(result.comments).toEqual(expectedResult)
  })
})
