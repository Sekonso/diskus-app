import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../states/authSlice'
import {
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncNeutralVoteComment
} from '../states/threadDetailSlice'
import { convertToTimeAgoID } from '../utils/timeConverter'
import { BiUpvote, BiSolidUpvote, BiDownvote, BiSolidDownvote } from 'react-icons/bi'
import { motion } from 'framer-motion'

const Comment = ({ threadId, comment }) => {
  const { me } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function upvoteHandler() {
    if (Object.keys(me).length === 0) navigate('/user/login')
    else dispatch(asyncUpvoteComment(threadId, comment.id, me.id))
  }

  function downvoteHandler() {
    if (Object.keys(me).length === 0) navigate('/user/login')
    else dispatch(asyncDownvoteComment(threadId, comment.id, me.id))
  }

  function neutralizeVoteHandler() {
    dispatch(asyncNeutralVoteComment(threadId, comment.id, me.id))
  }

  function hasUpvoted() {
    return me && me.id && comment.upVotesBy.find((vote) => vote === me.id)
  }
  function hasDownvoted() {
    return me && me.id && comment.downVotesBy.find((vote) => vote === me.id)
  }

  return (
    <div className="comment">
      <div className="comment-user">
        <img src={comment.owner.avatar} alt="user avatar" />

        <p>
          {comment.owner.name} - {convertToTimeAgoID(comment.owner.createdAt)}
        </p>
      </div>

      <p className="comment-content" dangerouslySetInnerHTML={{ __html: comment.content }} />

      <div className="comment-votes">
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
        <span>{comment.upVotesBy.length}</span>

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
        <span>{comment.downVotesBy.length}</span>
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  threadId: PropTypes.string.isRequired
}

export default Comment
