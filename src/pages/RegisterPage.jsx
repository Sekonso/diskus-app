import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../utils/customHooks'
import { selectAuth, setAuthError, asyncRegister } from '../states/authSlice'

const RegisterPage = () => {
  const { loading, error } = useSelector(selectAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useInput('')
  const [password, setPassword] = useInput('')
  const [passwordConfirm, setPasswordConfirm] = useInput('')
  const [email, setEmail] = useInput('')

  function submitHandler (event) {
    event.preventDefault()

    if (!confirmPassword()) {
      dispatch(setAuthError({ error: true, message: 'Konfirmasi password tidak cocok' }))
      return
    }

    dispatch(asyncRegister({ name, email, password }, navigate))
  }

  function confirmPassword () {
    return passwordConfirm === password
  }

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <h2>Register</h2>

      <div className="form-control">
        <input
          type="text"
          id="name"
          value={name}
          onChange={setName}
          placeholder="Masukkan nama"
          required
        />
      </div>
      <div className="form-control">
        <input
          type="email"
          id="email"
          value={email}
          onChange={setEmail}
          placeholder="Masukkan alamat email"
          required
        />
      </div>
      <div className="form-control">
        <input
          type="password"
          id="password"
          value={password}
          onChange={setPassword}
          placeholder="Masukkan password"
          required
        />
      </div>
      <div className="form-control">
        <input
          type="password"
          id="passwordConfirm"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
          placeholder="Masukkan konfirmasi password"
          required
        />
      </div>

      {error.error && <div className="warning">{error.message}</div>}
      <button type="submit">{loading ? '...' : 'Submit'}</button>
      <div>
        Sudah punya akun? <Link to="/user/login">Login</Link>
      </div>
    </form>
  )
}

export default RegisterPage
