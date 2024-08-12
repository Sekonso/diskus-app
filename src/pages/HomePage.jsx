import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectThreads } from '../states/threadsSlice'
import { FaChevronDown, FaChevronUp, FaPlusCircle } from 'react-icons/fa'
import ThreadsList from '../components/ThreadsList'

const HomePage = () => {
  const { categories } = useSelector(selectThreads)
  const [toggleFilter, setToggleFilter] = useState(false)
  const [filterValue, setFilterValue] = useState('')

  function toggleFilterHandler() {
    setToggleFilter((prevState) => !prevState)
  }

  function filterChangeHandler(event) {
    event.target.classList.contains('active')
      ? setFilterValue('')
      : setFilterValue(event.target.innerText)
  }

  return (
    <>
      <div className="thread-content-header">
        <h2>Diskusi Tersedia</h2>
        <button onClick={toggleFilterHandler}>
          {toggleFilter ? <FaChevronUp /> : <FaChevronDown />} Kategori
        </button>
      </div>

      <div className={`thread-content-tags ${toggleFilter ? 'active' : ''}`}>
        {categories.map((category) => (
          <button
            key={category}
            className={filterValue === category ? 'active' : null}
            onClick={filterChangeHandler}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="thread-content-body">
        <ThreadsList filter={filterValue} />
      </div>

      <Link to="/add" className="thread-add-button">
        <FaPlusCircle />
      </Link>
    </>
  )
}

export default HomePage
