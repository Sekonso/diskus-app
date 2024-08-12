import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import threadsReducer from '../src/states/threadsSlice'
import threadDetailReducer from '../src/states/threadDetailSlice'
import usersReducer from '../src/states/usersSlice'
import authReducer from '../src/states/authSlice'
import leaderboardReducer from '../src/states/leaderboardSlice'
import { loadingBarReducer } from 'react-redux-loading-bar'

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        threads: threadsReducer,
        threadDetail: threadDetailReducer,
        users: usersReducer,
        auth: authReducer,
        leaderboard: leaderboardReducer,
        loadingBar: loadingBarReducer
      },
      preloadedState
    }),
    ...renderOptions
  } = {}
) {
  // eslint-disable-next-line react/prop-types
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    )
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
