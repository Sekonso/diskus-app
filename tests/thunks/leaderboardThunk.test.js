import { describe, it, expect, vi } from 'vitest'
import { getLeaderboards } from '../../src/utils/API'
import {
  asyncReceiveLeaderboards,
  setLeaderboard,
  setLeaderboardLoading,
  setLeaderboardError
} from '../../src/states/leaderboardSlice'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

vi.mock('../../src/utils/API', () => ({
  getLeaderboards: vi.fn()
}))

console.error = vi.fn()

describe('Leaderboard async thunk', () => {
  const fakeSuccessRes = {
    status: 'success',
    message: 'ok',
    data: {
      leaderboards: [
        {
          user: {
            id: 'users-1',
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://generated-image-url.jpg'
          },
          score: 10
        },
        {
          user: {
            id: 'users-2',
            name: 'Jane Doe',
            email: 'jane@example.com',
            avatar: 'https://generated-image-url.jpg'
          },
          score: 5
        }
      ]
    }
  }

  const fakeFailRes = new Error('Error test')

  it('Should dispatch correct set of actions when data fetching is successful', async () => {
    /* SCENARIO
        - Mock the resolved API call and dispatch
        - Call the async thunk
        - Assert dispatch actions to set loading as true, show the loading, and error as false
        - Assert dispatch actions to set leaderboard state by data from API call
        - Assert dispatch actions to set loading as false, and hide the loading after thunk is done
    */

    // Arrange
    getLeaderboards.mockResolvedValue(fakeSuccessRes)
    const dispatch = vi.fn()

    // Action
    await asyncReceiveLeaderboards()(dispatch)

    // Assert
    expect(dispatch).toHaveBeenNthCalledWith(1, setLeaderboardLoading(true))
    expect(dispatch).toHaveBeenNthCalledWith(2, setLeaderboardError({ error: false, message: '' }))
    expect(dispatch).toHaveBeenNthCalledWith(3, showLoading())
    expect(dispatch).toHaveBeenNthCalledWith(4, setLeaderboard(fakeSuccessRes.data.leaderboards))
    expect(dispatch).toHaveBeenNthCalledWith(5, setLeaderboardLoading(false))
    expect(dispatch).toHaveBeenNthCalledWith(6, hideLoading())
  })

  it('Should dispatch correct set of actions when data fetching is failed', async () => {
    // Arrange
    getLeaderboards.mockRejectedValue(fakeFailRes)
    const dispatch = vi.fn()

    // Action
    await asyncReceiveLeaderboards()(dispatch)

    // Assert
    expect(dispatch).toHaveBeenNthCalledWith(1, setLeaderboardLoading(true))
    expect(dispatch).toHaveBeenNthCalledWith(2, setLeaderboardError({ error: false, message: '' }))
    expect(dispatch).toHaveBeenNthCalledWith(3, showLoading())
    expect(dispatch).toHaveBeenNthCalledWith(
      4,
      setLeaderboardError({ error: true, message: fakeFailRes.message })
    )
    expect(dispatch).toHaveBeenNthCalledWith(5, setLeaderboardLoading(false))
    expect(dispatch).toHaveBeenNthCalledWith(6, hideLoading())
  })
})
