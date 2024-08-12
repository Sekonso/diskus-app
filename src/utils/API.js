const baseURL = 'https://forum-api.dicoding.dev/v1/'

const fetchData = async (path, options) => {
  const res = await fetch(baseURL + path, options)
  const resJSON = await res.json()

  if (resJSON.status === 'fail') throw new Error(resJSON.message)

  return resJSON
}

// Auth
const register = async ({ name, email, password }) => {
  return fetchData('register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
}

const login = async ({ email, password }) => {
  return fetchData('login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
}

const getAllUsers = async () => {
  return fetchData('users')
}

const getUserMe = async () => {
  return fetchData('users/me', {
    headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
  })
}

// Threads
const createThread = async ({ title, body, category }) => {
  return fetchData('threads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ title, body, category })
  })
}

const getAllThreads = async () => {
  return fetchData('threads')
}

const getThread = async (id) => {
  return fetchData(`threads/${id}`)
}

const upvoteThread = async (id) => {
  return fetchData(`threads/${id}/up-vote`, {
    method: 'POST',
    headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
  })
}

const downvoteThread = async (id) => {
  return fetchData(`threads/${id}/down-vote`, {
    method: 'POST',
    headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
  })
}

const neutralizeVoteThread = async (id) => {
  return fetchData(`threads/${id}/neutral-vote`, {
    method: 'POST',
    headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
  })
}

// Comments
const createComment = async (threadId, content) => {
  return fetchData(`threads/${threadId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ content })
  })
}

const upvoteComment = async (threadId, commentId) => {
  return fetchData(`threads/${threadId}/comments/${commentId}/up-vote`, {
    method: 'POST',
    headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
  })
}

const downvoteComment = async (threadId, commentId) => {
  return fetchData(`threads/${threadId}/comments/${commentId}/down-vote`, {
    method: 'POST',
    headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
  })
}

const neutralizeVoteComment = async (threadId, commentId) => {
  return fetchData(`threads/${threadId}/comments/${commentId}/neutral-vote`, {
    method: 'POST',
    headers: { Authorization: `bearer ${localStorage.getItem('token')}` }
  })
}

// Leaderboards
const getLeaderboards = async () => {
  return fetchData('leaderboards')
}

export {
  register,
  login,
  createThread,
  getAllThreads,
  getThread,
  upvoteThread,
  downvoteThread,
  neutralizeVoteThread,
  createComment,
  upvoteComment,
  downvoteComment,
  neutralizeVoteComment,
  getAllUsers,
  getUserMe,
  getLeaderboards
}
