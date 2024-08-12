import { createSelector } from '@reduxjs/toolkit'
import { selectThreads } from './threadsSlice'
import { selectUsers } from './usersSlice'

const selectThreadsWithUsernames = createSelector(
  [selectThreads, selectUsers],
  (threads, users) => {
    if (threads.loading || users.loading) { return { loading: true, error: { error: false, message: '' }, value: [] } }
    if (threads.error.error || users.error.error) {
      return {
        loading: false,
        error: { error: true, message: threads.error.message || users.error.message },
        value: []
      }
    }

    const combinedThreads = threads.value.map((thread) => {
      const user = users.value.find((user) => user.id === thread.ownerId)

      return {
        ...thread,
        ownerName: user ? user.name : 'anonim'
      }
    })

    return { loading: false, error: false, value: combinedThreads }
  }
)

export { selectThreadsWithUsernames }
