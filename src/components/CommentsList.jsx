import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectThreadDetail } from '../states/threadDetailSlice'
import Comment from './Comment'

const CommentsList = ({ threadId }) => {
  const thread = useSelector(selectThreadDetail)

  if (thread.comments.length === 0) {
    return (
      <div className="comments-list">
        <h3>{`Komentar (${thread.comments.length})`}</h3>
        <div>Belum ada komentar</div>
      </div>
    )
  }

  return (
    <div className="comments-list">
      <h3>{`Komentar (${thread.comments.length})`}</h3>
      {thread.comments.map((comment) => (
        <Comment key={comment.id} threadId={threadId} comment={comment} />
      ))}
    </div>
  )
}

CommentsList.propTypes = {
  threadId: PropTypes.string.isRequired
}

export default CommentsList
