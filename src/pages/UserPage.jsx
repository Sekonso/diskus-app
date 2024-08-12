import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAuth, asyncReceiveAuthMe, authLogout } from '../states/authSlice'
import { FaGears } from 'react-icons/fa6'

const UserPage = () => {
  const auth = useSelector(selectAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function logoutHandler() {
    dispatch(authLogout())
    navigate('/user/login')
  }

  useEffect(() => {
    if (Object.keys(auth.me).length === 0) dispatch(asyncReceiveAuthMe)
  }, [])

  if (auth.loading) {
    return (
      <div className="loading-spin">
        <FaGears />
      </div>
    )
  }

  if (auth.error.error || Object.keys(auth.me).length === 0) {
    return (
      <div className="user-profile-fail">
        <h3>{auth.error.message}</h3>
        <Link to="/user/login" className="login-link">
          Login
        </Link>
        <Link to="/user/register" className="register-link">
          Register
        </Link>
      </div>
    )
  }

  return (
    <div className="user-profile">
      <img src={auth.me.avatar} id="me-avatar" alt="User avatar" />

      <table>
        <tbody>
          <tr>
            <th>ID </th>
            <td>:</td>
            <td id="me-id">{auth.me.id}</td>
          </tr>
          <tr>
            <th>Username </th>
            <td>:</td>
            <td id="me-name">{auth.me.name}</td>
          </tr>
          <tr>
            <th>Email </th>
            <td>:</td>
            <td id="me-email">{auth.me.email}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default UserPage
