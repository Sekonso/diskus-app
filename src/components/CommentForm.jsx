import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../states/authSlice'
import { asyncCreateComment } from '../states/threadDetailSlice'
import { useInput } from '../utils/customHooks'

const CommentForm = ({ threadId }) => {
  const { me } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [content, setContent, resetContent] = useInput('')

  function submitHandler (event) {
    event.preventDefault()

    if (Object.keys(me).length === 0) navigate('/user/login')
    else {
      dispatch(asyncCreateComment({ threadId, content, me }))
      resetContent()
    }
  }

  return (
    <form className="comment-form" onSubmit={submitHandler}>
      <textarea
        type="text"
        value={content}
        onChange={setContent}
        placeholder="Masukkan komentar"
        required
      ></textarea>
      <button type="submit">Kirim</button>
    </form>
  )
}

CommentForm.propTypes = {
  threadId: PropTypes.string.isRequired
}

export default CommentForm
