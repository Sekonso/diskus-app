import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { asyncReceiveThreads } from '../states/threadsSlice'
import { asyncReceiveUsers } from '../states/usersSlice'
import { selectThreadsWithUsernames } from '../states/shared'
import ThreadCard from './ThreadCard'
import { FaGears } from 'react-icons/fa6'

const ThreadsList = ({ filter = '' }) => {
  const threads = useSelector(selectThreadsWithUsernames)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveThreads())
    dispatch(asyncReceiveUsers())
  }, [])

  if (threads.loading) {
    return (
      <div className="loading-spin">
        <FaGears />
      </div>
    )
  }

  if (threads.error.error) return <div>{threads.error.message}</div>

  if (threads.value.length === 0) <div>Tidak ada threads</div>

  return (
    <div className="thread-list">
      {threads.value
        .filter((thread) => thread.category.includes(filter))
        .map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
    </div>
  )
}

ThreadsList.propTypes = {
  filter: PropTypes.string
}

export default ThreadsList
