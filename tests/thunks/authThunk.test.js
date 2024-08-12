import { describe, it, expect, vi, beforeAll } from 'vitest'
import { login, register, getUserMe } from '../../src/utils/API'
import {
  asyncReceiveAuthMe,
  asyncRegister,
  asyncLogin,
  setAuthMe,
  setAuthLoading,
  setAuthError
} from '../../src/states/authSlice'

vi.mock('../../src/utils/API', () => ({
  getUserMe: vi.fn(),
  register: vi.fn(),
  login: vi.fn()
}))

console.error = vi.fn()

beforeAll(() => {
  // Mock localStorage
  global.localStorage = {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
  }
})

describe('Authentication async thunk', () => {
  const fakeUserMeSuccessRes = {
    status: 'success',
    message: 'ok',
    data: {
      user: {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg'
      }
    }
  }

  const fakeRegisterSuccessRes = {
    status: 'success',
    message: 'User created',
    data: {
      user: {
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg'
      }
    }
  }

  const fakeLoginSuccessRes = {
    status: 'success',
    message: 'ok',
    data: {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw'
    }
  }

  const fakeFailRes = new Error('Error test')

  it('Should dispatch correct set of actions when userMe fetching is successful', async () => {
    // Arrange
    getUserMe.mockResolvedValue(fakeUserMeSuccessRes)
    const dispatch = vi.fn()

    // Action
    await asyncReceiveAuthMe()(dispatch)

    // Assert
    expect(dispatch).toHaveBeenNthCalledWith(1, setAuthLoading(true))
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthError({ error: false, message: '' }))
    expect(dispatch).toHaveBeenNthCalledWith(3, setAuthMe(fakeUserMeSuccessRes.data.user))
    expect(dispatch).toHaveBeenNthCalledWith(4, setAuthLoading(false))
  })

  it('Should dispatch correct set of actions when userMe fetching is failed', async () => {
    // Arrange
    getUserMe.mockRejectedValue(fakeFailRes)
    const dispatch = vi.fn()

    // Action
    await asyncReceiveAuthMe()(dispatch)

    // Assert
    expect(dispatch).toHaveBeenNthCalledWith(1, setAuthLoading(true))
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthError({ error: false, message: '' }))
    expect(dispatch).toHaveBeenNthCalledWith(3, setAuthLoading(false))
  })

  it('Should dispatch correct set of actions when register is successful', async () => {
    // Arrange
    const registerData = {
      name: 'name',
      email: 'name@gmail.com',
      password: 'password'
    }
    const navigate = vi.fn()

    register.mockResolvedValue(fakeRegisterSuccessRes)
    const dispatch = vi.fn()

    // Action
    await asyncRegister(registerData, navigate)(dispatch)

    // Assert
    expect(dispatch).toHaveBeenNthCalledWith(1, setAuthLoading(true))
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthError({ error: false, message: '' }))
    expect(dispatch).toHaveBeenNthCalledWith(3, setAuthLoading(false))
    expect(navigate).toHaveBeenCalledWith('/user/login')
  })

  it('Should dispatch correct set of actions when register is failed', async () => {
    // Arrange
    const registerData = {
      name: 'name',
      email: 'name@gmail.com',
      password: 'password'
    }

    register.mockRejectedValue(fakeFailRes)
    const dispatch = vi.fn()

    // Action
    await asyncRegister(registerData)(dispatch)

    // Assert
    expect(dispatch).toHaveBeenNthCalledWith(1, setAuthLoading(true))
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthError({ error: false, message: '' }))
    expect(dispatch).toHaveBeenNthCalledWith(
      3,
      setAuthError({ error: true, message: fakeFailRes.message })
    )
    expect(dispatch).toHaveBeenNthCalledWith(4, setAuthLoading(false))
  })

  it('Should dispatch correct set of actions when login is successful', async () => {
    // Arrange
    const loginData = {
      email: 'name@gmail.com',
      password: 'password'
    }
    const navigate = vi.fn()
    const localStorageSpy = vi.spyOn(global.localStorage, 'setItem')

    login.mockResolvedValue(fakeLoginSuccessRes)
    getUserMe.mockResolvedValue(fakeUserMeSuccessRes)
    const dispatch = vi.fn()

    // Action
    await asyncLogin(loginData, navigate)(dispatch)

    // Assert
    expect(dispatch).toHaveBeenNthCalledWith(1, setAuthLoading(true))
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthError({ error: false, message: '' }))
    expect(dispatch).toHaveBeenNthCalledWith(3, setAuthMe(fakeUserMeSuccessRes.data.user))
    expect(dispatch).toHaveBeenNthCalledWith(4, setAuthLoading(false))
    expect(localStorageSpy).toHaveBeenCalledWith('token', fakeLoginSuccessRes.data.token)
    expect(navigate).toHaveBeenCalledWith('/user')
  })

  it('Should dispatch correct set of actions when login is failed', async () => {
    // Arrange
    const loginData = {
      email: 'name@gmail.com',
      password: 'password'
    }

    login.mockRejectedValue(fakeFailRes)
    const dispatch = vi.fn()

    // Action
    await asyncLogin(loginData)(dispatch)

    // Assert
    expect(dispatch).toHaveBeenNthCalledWith(1, setAuthLoading(true))
    expect(dispatch).toHaveBeenNthCalledWith(2, setAuthError({ error: false, message: '' }))
    expect(dispatch).toHaveBeenNthCalledWith(
      3,
      setAuthError({ error: true, message: fakeFailRes.message })
    )
    expect(dispatch).toHaveBeenNthCalledWith(4, setAuthLoading(false))
  })
})
