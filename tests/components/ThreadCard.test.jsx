import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../testUtil'
import ThreadCard from '../../src/components/ThreadCard'
import { convertToTimeAgoID } from '../../src/utils/timeConverter'

describe('ThreadCard component', () => {
  it('Should log an and display null if the thread prop is empty', () => {
    // Arrange
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const emptyThread = null

    // Action
    const { container } = renderWithProviders(<ThreadCard thread={emptyThread} />)

    // Assert
    expect(container.firstChild).toBeNull()
    expect(consoleError).toHaveBeenCalled()

    // Cleanup
    consoleError.mockRestore()
  })

  it('Should display null if the one of the thread key is empty', () => {
    // Arrange
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const threadData = { id: 1 }

    // Action
    const { container } = renderWithProviders(<ThreadCard thread={threadData} />)

    // Assert
    expect(container.firstChild).toBeNull()
    expect(consoleError).not.toHaveBeenCalled()

    // Cleanup
    consoleError.mockRestore()
  })

  it('Should display all necessary thread data if the props data is valid', () => {
    // Arrange
    const threadData = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      ownerName: 'John doe',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0
    }

    // Action
    renderWithProviders(<ThreadCard thread={threadData} />)
    const title = screen.getByRole('heading', { level: 3 })
    const creator = screen.getByText(
      `Dibuat oleh ${threadData.ownerName} - ${convertToTimeAgoID(threadData.createdAt)}`
    )
    const body = screen.getByText(threadData.body)

    // Assert
    expect(title).toHaveClass('thread-card-title')
    expect(title).toHaveTextContent(threadData.title)

    expect(creator).toHaveClass('thread-card-creator')
    expect(body).toHaveClass('thread-card-desc')
  })
})
