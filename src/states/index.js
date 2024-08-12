import { configureStore } from '@reduxjs/toolkit'
import threadsReducer from './threadsSlice'
import threadDetailReducer from './threadDetailSlice'
import usersReducer from './usersSlice'
import authReducer from './authSlice'
import leaderboardReducer from './leaderboardSlice'
import { loadingBarReducer } from 'react-redux-loading-bar'

const store = configureStore({
  reducer: {
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    users: usersReducer,
    auth: authReducer,
    leaderboard: leaderboardReducer,
    loadingBar: loadingBarReducer
  }
})

export default store
