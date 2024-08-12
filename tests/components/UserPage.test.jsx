import React from 'react'
import { describe, it, expect } from 'vitest'
import { screen, act } from '@testing-library/react'
import { renderWithProviders } from '../testUtil'
import UserPage from '../../src/pages/UserPage'

describe('UserPage component', () => {
  it("Should display login and register link if user data(auth.me) didn't exist", () => {
    // Arrange
    const preloadedState = {
      auth: {
        me: {},
        loading: false,
        error: { error: false, message: true }
      }
    }

    // Action
    renderWithProviders(<UserPage />, { preloadedState })
    const registerLink = screen.getByRole('link', { name: 'Register' })
    const loginLink = screen.getByRole('link', { name: 'Login' })

    // Assert
    expect(registerLink).toHaveAttribute('href', '/user/register')
    expect(loginLink).toHaveAttribute('href', '/user/login')
  })

  it('Should display user profile if user data(auth.me) already exist', () => {
    // Arrange
    const preloadedState = {
      auth: {
        me: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg'
        },
        loading: false,
        error: { error: false, message: true }
      }
    }

    // Action
    renderWithProviders(<UserPage />, { preloadedState })

    // Assert
    expect(screen.getByText('john_doe')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('Should delete the user data(auth.me) and navigate login if logout button is clicked', () => {
    // Arrange
    const preloadedState = {
      auth: {
        me: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg'
        },
        loading: false,
        error: { error: false, message: true }
      }
    }

    const { store } = renderWithProviders(<UserPage />, { preloadedState })

    // Action
    const logoutButton = screen.getByRole('button', { name: 'Logout' })
    act(() => {
      logoutButton.click()
    })

    // Assert
    expect(store.getState().auth.me).toEqual({})
  })
})
