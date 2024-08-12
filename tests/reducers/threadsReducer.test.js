// threadsSlice.test.js
import { describe, it, expect } from 'vitest'
import threadsReducer, {
  setCategories,
  setDownvoteThread,
  setNeutralVoteThread,
  setThreads,
  setThreadsError,
  setThreadsLoading,
  setUpvoteThread
} from '../../src/states/threadsSlice'

describe('Threads reducer', () => {
  const initialState = {
    value: [],
    categories: [],
    loading: false,
    error: { error: false, message: '' }
  }

  it('Should return the initial state when given by unknown action', () => {
    /* SCENARIO
        - Arrange an unknown action
        - Dispatch unknown action
        - Assert the state to be equal as the initial value
    */

    // Arrange
    const action = { type: 'unknown' }

    // Action
    const result = threadsReducer(initialState, action)

    // Assert
    expect(result).toEqual(initialState)
  })

  it('Should return new state when given by several set of actions', () => {
    /* SCENARIO
        - Arrange an new thread, categories, loading, and error data
        - Set expected result to have all the new datas
        - Arrange and dispatch actions with new datas as payload
        - Assert initial state to still persist
        - Assert result to equal as expected result
    */

    // Arrange
    const newThreads = [{ id: 1 }, { id: 2 }]
    const newCategories = ['cat1', 'cat2']
    const newLoading = true
    const newError = { error: true, message: 'Error test' }

    const expectedResult = {
      value: newThreads,
      categories: newCategories,
      loading: newLoading,
      error: newError
    }

    const actions = [
      setThreads(newThreads),
      setCategories(newCategories),
      setThreadsLoading(newLoading),
      setThreadsError(newError)
    ]

    // Action
    const result = actions.reduce((state, action) => threadsReducer(state, action), initialState)

    // Assert
    expect(initialState.value).toEqual([])
    expect(result).toEqual(expectedResult)
  })

  it('Should add userId to the upVotesBy and remove it from downVotesBy when a thread is upvoted', () => {
    /* SCENARIO
        - Arrange an userIdand store it to downVotesBy and upVotesBy of the new thread data
        - Arrange expected data to remove userId from both downVotesBy and upVotesBy
        - Arrange and dispatch actions with new datas as payload
        - Assert the result to equal as expected
    */

    // Arrange
    const userId = +new Date()
    const newThread = [{ id: 1, upVotesBy: [], downVotesBy: [userId] }]
    const expectedResult = [{ id: 1, upVotesBy: [userId], downVotesBy: [] }]

    const actions = [setThreads(newThread), setUpvoteThread({ threadId: newThread[0].id, userId })]

    // action
    const result = actions.reduce((state, action) => threadsReducer(state, action), initialState)

    // Assert
    expect(result.value).toEqual(expectedResult)
  })

  it('Should add userId to the downVotesBy and remove it from upVotesBy when a thread is downvoted', () => {
    /* SCENARIO
        - Arrange an userId and store it to upVotesBy of the new thread data
        - Arrange expected data to move userId from upVotesBy to downVotesBy
        - Arrange and dispatch actions with new datas as payload
        - Assert the result to equal as expected
    */

    // Arrange
    const userId = +new Date()
    const newThread = [{ id: 1, upVotesBy: [userId], downVotesBy: [] }]
    const expectedResult = [{ id: 1, upVotesBy: [], downVotesBy: [userId] }]

    const actions = [
      setThreads(newThread),
      setDownvoteThread({ threadId: newThread[0].id, userId })
    ]

    // action
    const result = actions.reduce((state, action) => threadsReducer(state, action), initialState)

    // Assert
    expect(result.value).toEqual(expectedResult)
  })

  it('Should remove userId from the votes when a thread vote is neutralized', () => {
    /* SCENARIO
        - Arrange an userId and store it to downVotesBy and upVotesBy of the new thread data
        - Arrange expected data to remove userId from both downVotesBy and upVotesBy
        - Arrange and dispatch actions with new datas as payload
        - Assert the result to equal as expected
    */

    // Arrange
    const userId = +new Date()
    const newThread = [{ id: 1, upVotesBy: [userId], downVotesBy: [userId] }]
    const expectedResult = [{ id: 1, upVotesBy: [], downVotesBy: [] }]

    const actions = [
      setThreads(newThread),
      setNeutralVoteThread({ threadId: newThread[0].id, userId })
    ]

    // action
    const result = actions.reduce((state, action) => threadsReducer(state, action), initialState)

    // Assert
    expect(result.value).toEqual(expectedResult)
  })
})
