// threadsSlice.test.js
import { describe, it, expect, vi } from 'vitest'
import { getAllThreads } from '../../src/utils/API'
import threadsReducer, {
  setCategories,
  setDownvoteThread,
  setNeutralVoteThread,
  setThreads,
  setThreadsError,
  setThreadsLoading,
  setUpvoteThread,
  asyncReceiveThreads
} from '../../src/states/threadsSlice'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

vi.mock('../../src/utils/API', () => ({
  getAllThreads: vi.fn()
}))

console.error = vi.fn()

describe('Threads async thunk', () => {
  const fakeThreadsResponse = {
    status: 'success',
    message: 'ok',
    data: {
      threads: [
        {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0
        },
        {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0
        }
      ]
    }
  }

  it('Should dispatch correct set of actions data fetching is successful', async () => {
    // Arrange
    getAllThreads.mockResolvedValue(fakeThreadsResponse)
    const dispatch = vi.fn()

    // Action
    await asyncReceiveThreads()(dispatch)

    // Assert
    expect(dispatch).toHaveBeenCalledWith(setThreadsLoading(true))
    expect(dispatch).toHaveBeenCalledWith(setThreadsError({ error: false, message: '' }))
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(setThreads(fakeThreadsResponse.data.threads))
    expect(dispatch).toHaveBeenCalledWith(
      setCategories([fakeThreadsResponse.data.threads[0].category])
    )
    expect(dispatch).toHaveBeenCalledWith(setThreadsLoading(false))
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
