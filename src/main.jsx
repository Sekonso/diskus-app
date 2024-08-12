import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import store from './states'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import './styles/threads.css'
import './styles/threadDetail.css'
import './styles/comments.css'
import './styles/leaderboard.css'
import './styles/auth.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
)
