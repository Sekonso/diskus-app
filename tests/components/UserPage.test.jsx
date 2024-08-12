import React from 'react'
import { describe, it, expect } from 'vitest'
import { screen, act } from '@testing-library/react'
import { renderWithProviders } from '../testUtil'
import UserPage from '../../src/pages/UserPage'

describe('UserPage component', () => {
  it("Should display login and register link if user data(auth.me) didn't exist", () => {
    /* SCENARIO
        - Preload auth.me state to be empty
        - Render UserPage component
        - Get Register and login Link
        - Assert UserPage if it has register and login Link
    */

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
    /* SCENARIO
        - Preload auth.me state with all the necesssary data
        - Render UserPage component
        - Get Register and login Link
        - Assert UserPage if the data from auth.me is displayed
    */

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
    expect(screen.getByText(preloadedState.auth.me.id)).toBeInTheDocument()
    expect(screen.getByText(preloadedState.auth.me.name)).toBeInTheDocument()
    expect(screen.getByText(preloadedState.auth.me.email)).toBeInTheDocument()
  })

  it('Should delete the user data(auth.me) and navigate login if logout button is clicked', () => {
    /* SCENARIO
        - Preload auth.me state with all the necesssary data
        - Render UserPage component and get the store
        - Get the logout butotn
        - Click the logout button
        - Assert current store if the auth.me state is empty
    */

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
