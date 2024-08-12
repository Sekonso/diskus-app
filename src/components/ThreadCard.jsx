import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../states/authSlice'
import {
  asyncUpvoteThread,
  asyncDownvoteThread,
  asyncNeutralVoteThread
} from '../states/threadsSlice'
import { BiUpvote, BiSolidUpvote, BiDownvote, BiSolidDownvote, BiComment } from 'react-icons/bi'
import { convertToTimeAgoID } from '../utils/timeConverter'
import { motion } from 'framer-motion'

const ThreadCard = ({ thread = {} }) => {
  const { me } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function upvoteHandler() {
    if (Object.keys(me).length === 0) navigate('/user/login')
    else dispatch(asyncUpvoteThread(thread.id, me.id))
  }

  function downvoteHandler() {
    if (Object.keys(me).length === 0) navigate('/user/login')
    else dispatch(asyncDownvoteThread(thread.id, me.id))
  }

  function neutralizeVoteHandler() {
    dispatch(asyncNeutralVoteThread(thread.id, me.id))
  }

  function hasUpvoted() {
    return me && me.id && thread.upVotesBy.find((vote) => vote === me.id)
  }

  function hasDownvoted() {
    return me && me.id && thread.downVotesBy.find((vote) => vote === me.id)
  }

  if (
    !thread ||
    !thread.id ||
    !thread.title ||
    !thread.ownerId ||
    !thread.ownerName ||
    !thread.createdAt ||
    !thread.body ||
    !thread.upVotesBy ||
    !thread.downVotesBy
  ) {
    return null
  }

  return (
    <motion.div
      className="thread-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <Link to={`/threads/${thread.id}`} className="thread-card-upper">
        <h3 className="thread-card-title">{thread.title}</h3>
        <p className="thread-card-creator passive">
          Dibuat oleh {thread.ownerName} - {convertToTimeAgoID(thread.createdAt)}
        </p>
        <p className="thread-card-desc" dangerouslySetInnerHTML={{ __html: thread.body }} />
      </Link>

      <div className="thread-card-lower">
        <div className="thread-card-buttons">
          {/* Upvote */}
          {hasUpvoted() ? (
            <motion.button
              className="upvoted"
              onClick={neutralizeVoteHandler}
              initial={{ scale: 2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <BiSolidUpvote />
            </motion.button>
          ) : (
            <button className="upvote" onClick={upvoteHandler}>
              <BiUpvote />
            </button>
          )}
          <span>{thread.upVotesBy.length}</span>

          {/* Downvote */}
          {hasDownvoted() ? (
            <motion.button
              className="downvoted"
              onClick={neutralizeVoteHandler}
              initial={{ scale: 2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <BiSolidDownvote />
            </motion.button>
          ) : (
            <button className="downvoted" onClick={downvoteHandler}>
              <BiDownvote />
            </button>
          )}
          <span>{thread.downVotesBy.length}</span>

          {/* Comment */}
          <button>
            <Link to={`/threads/${thread.id}`}>
              <BiComment />
            </Link>
          </button>
          <span>{thread.totalComments}</span>
        </div>
        <div className="thread-card-tag">#{thread.category}</div>
      </div>
    </motion.div>
  )
}

ThreadCard.propTypes = {
  thread: PropTypes.object.isRequired
}

export default ThreadCard
