import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'

// Page view
import HomePage from './pages/HomePage'
import ThreadDetailPage from './pages/ThreadDetailPage'
import AddPage from './pages/AddPage'
import LeaderboardPage from './pages/LeaderboardPage'
import UserPage from './pages/UserPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/404'

// States/
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth, asyncReceiveAuthMe } from './states/authSlice'

function App () {
  const [init, setInit] = useState(true)
  const auth = useSelector(selectAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveAuthMe())
  }, [])

  useEffect(() => {
    if (!auth.loading) {
      setInit(false)
    }
  }, [auth])

  if (init) return null

  return (
    <>
      <header>
        <LoadingBar className="loading-bar" />
        <h1 className="brand">DISKUS</h1>
      </header>

      <main>
        <aside>
          <Navbar />
        </aside>

        <section className="content">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/add" element={<AddPage />}></Route>
            <Route path="/threads/:id" element={<ThreadDetailPage />}></Route>
            <Route path="/leaderboard" element={<LeaderboardPage />}></Route>
            <Route path="/user" element={<UserPage />}></Route>
            <Route path="/user/register" element={<RegisterPage />}></Route>
            <Route path="/user/login" element={<LoginPage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </section>
      </main>

      <footer>
        <Navbar />
      </footer>
    </>
  )
}

export default App
