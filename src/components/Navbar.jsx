import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaChartSimple } from 'react-icons/fa6'
import { LuMessagesSquare } from 'react-icons/lu'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { IconContext } from 'react-icons'

const Navbar = () => {
  const { pathname } = useLocation()

  return (
    <IconContext.Provider value={{ className: 'contactIcon' }}>
      <div className="navbar">
        <Link to="/" className="navlink">
          <LuMessagesSquare
            className={`icon ${pathname === '/' ? 'active' : ''}`}
          ></LuMessagesSquare>
        </Link>

        <Link to="/leaderboard" className="navlink">
          <FaChartSimple className={`icon ${pathname === '/leaderboard' ? 'active' : ''}`} />
        </Link>

        <Link to="/user" className="navlink">
          <IoPersonCircleOutline className={`icon ${pathname === '/user' ? 'active' : ''}`} />
        </Link>
      </div>
    </IconContext.Provider>
  )
}

export default Navbar
