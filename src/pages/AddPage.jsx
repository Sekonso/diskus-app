import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectThreads, asyncCreateThread } from '../states/threadsSlice'
import { useInput } from '../utils/customHooks'

const AddPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector(selectThreads)
  const [title, setTitle] = useInput('')
  const [category, setCategory] = useInput('')
  const [body, setBody] = useInput('')

  function submitHandler (event) {
    event.preventDefault()

    dispatch(asyncCreateThread({ title, body, category }, navigate))
  }

  return (
    <form className="thread-form" onSubmit={submitHandler}>
      <h2>Buat thread</h2>
      <input type="text" value={title} onChange={setTitle} placeholder="Judul" required />
      <input type="text" value={category} onChange={setCategory} placeholder="Kategori" required />
      <textarea value={body} onChange={setBody} placeholder="Mau bahas apa?" required></textarea>
      {error.error && <div className="warning">{error.message}</div>}
      <button type="submit">{loading ? '...' : 'Submit'}</button>
    </form>
  )
}

export default AddPage
