import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectLeaderboards, asyncReceiveLeaderboards } from '../states/leaderboardSlice'
import { FaGears } from 'react-icons/fa6'

const LeaderboardPage = () => {
  const leaderboard = useSelector(selectLeaderboards)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards())
  }, [])

  if (leaderboard.loading) {
    return (
      <div className="loading-spin">
        <FaGears />
      </div>
    )
  }

  if (leaderboard.error.error) return <div>{leaderboard.error.message}</div>

  if (leaderboard.value.length === 0) <div>Papan peringkat masih kosong...</div>

  return (
    <>
      <h2>Papan Peringkat</h2>
      <table className="leaderboard">
        <thead className="leaderboard-header">
          <tr>
            <th className="leaderboard-user">User</th>
            <th className="leaderboard-score">Skor</th>
          </tr>
        </thead>
        <tbody className="leaderboard-body">
          {leaderboard.value.map((rank) => (
            <tr key={rank.user.id} className="rank">
              <td className="rank-user">
                <img src={rank.user.avatar} alt="User avatar" />
                <span>{rank.user.name}</span>
              </td>
              <td className="rank-score">{rank.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default LeaderboardPage
