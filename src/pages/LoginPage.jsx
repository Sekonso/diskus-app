import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../utils/customHooks'
import { selectAuth, asyncLogin, setAuthError } from '../states/authSlice'

const LoginPage = () => {
  const { loading, error } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useInput('')
  const [password, setPassword] = useInput('')

  function submitHandler(event) {
    event.preventDefault()

    if (!email || !password) {
      dispatch(setAuthError({ error: true, message: 'Please fill all the required fields' }))
      return
    }

    dispatch(asyncLogin({ email, password }, navigate))
  }

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <h2>Login</h2>

      <div className="form-control">
        <input
          type="email"
          id="email"
          value={email}
          onChange={setEmail}
          placeholder="Masukkan alamat email"
        />
      </div>
      <div className="form-control">
        <input
          type="password"
          id="password"
          value={password}
          onChange={setPassword}
          placeholder="Masukkan password"
        />
      </div>

      {error.error && <div className="warning">{error.message}</div>}
      <button type="submit">{loading ? '...' : 'Submit'}</button>
      <div>
        Belum punya akun? <Link to="/user/register">Register</Link>
      </div>
    </form>
  )
}

export default LoginPage
