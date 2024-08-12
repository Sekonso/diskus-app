import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../states/authSlice'
import {
  selectThreadDetail,
  asyncReceiveThread,
  asyncUpvoteThread,
  asyncDownvoteThread,
  asyncNeutralVoteThread
} from '../states/threadDetailSlice'
import { convertToTimeAgoID } from '../utils/timeConverter'
import { BiUpvote, BiSolidUpvote, BiDownvote, BiSolidDownvote } from 'react-icons/bi'
import { FaGears } from 'react-icons/fa6'
import CommentsList from '../components/CommentsList'
import CommentForm from '../components/CommentForm'
import { motion } from 'framer-motion'

const ThreadDetailPage = () => {
  const { id } = useParams()
  const { me } = useSelector(selectAuth)
  const thread = useSelector(selectThreadDetail)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function upvoteHandler() {
    if (Object.keys(me).length === 0) navigate('/user/login')
    else dispatch(asyncUpvoteThread(thread.value.id, me.id))
  }

  function downvoteHandler() {
    if (Object.keys(me).length === 0) navigate('/user/login')
    else dispatch(asyncDownvoteThread(thread.value.id, me.id))
  }

  function neutralizeVoteHandler() {
    dispatch(asyncNeutralVoteThread(thread.value.id, me.id))
  }

  function hasUpvoted() {
    return me && me.id && thread.value.upVotesBy.find((vote) => vote === me.id)
  }
  function hasDownvoted() {
    return me && me.id && thread.value.downVotesBy.find((vote) => vote === me.id)
  }

  useEffect(() => {
    dispatch(asyncReceiveThread(id))
  }, [])

  if (thread.loading) {
    return (
      <div className="loading-spin">
        <FaGears />
      </div>
    )
  }

  if (thread.error.error) return <h2 style={{ textAlign: 'center' }}>{thread.error.message}</h2>

  if (Object.keys(thread.value).length === 0) return null

  return (
    <div className="thread-detail">
      <div className="thread-detail-content">
        <div className="upper">
          <div className="owner">
            <img src={thread.value.owner.avatar} alt="user avatar" />
            <span>
              {thread.value.owner.name} - {convertToTimeAgoID(thread.value.createdAt)}
            </span>
          </div>
          <h2 className="title">{thread.value.title}</h2>
          <p className="body" dangerouslySetInnerHTML={{ __html: thread.value.body }} />
        </div>

        <div className="lower">
          <div className="buttons">
            {hasUpvoted() ? (
              <motion.button
                onClick={neutralizeVoteHandler}
                initial={{ scale: 2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <BiSolidUpvote />
              </motion.button>
            ) : (
              <button onClick={upvoteHandler}>
                <BiUpvote />
              </button>
            )}
            <span>{thread.value.upVotesBy.length}</span>

            {hasDownvoted() ? (
              <motion.button
                onClick={neutralizeVoteHandler}
                initial={{ scale: 2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <BiSolidDownvote />
              </motion.button>
            ) : (
              <button onClick={downvoteHandler}>
                <BiDownvote />
              </button>
            )}
            <span>{thread.value.downVotesBy.length}</span>
          </div>
          <div className="tag">#{thread.value.category}</div>
        </div>
      </div>

      <CommentForm threadId={thread.value.id} />

      <CommentsList threadId={thread.value.id} />
    </div>
  )
}

export default ThreadDetailPage
