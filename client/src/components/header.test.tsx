import { render, screen, fireEvent } from '@testing-library/react'
import { useAuth0 } from '@auth0/auth0-react'
import Header from './Header'
import { QueryClient, QueryClientProvider } from 'react-query'
import { vi } from 'vitest'

vi.mock('@auth0/auth0-react', () => ({
  useAuth0: vi.fn().mockReturnValue({ logout: vi.fn() })
}))

describe('<Header />', () => {
  const mockSetSearchQuery = vi.fn()

  const renderHeader = () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <Header setSearchQuery={mockSetSearchQuery} />
      </QueryClientProvider>
    )
  }

  it('should render the header with search input and buttons', () => {
    renderHeader()

    // Test for search input
    expect(screen.getByPlaceholderText(/search task/i)).toBeInTheDocument()

    // Test for Add Task button
    expect(
      screen.getByRole('button', { name: /add task/i })
    ).toBeInTheDocument()

    // Test for Logout button
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
  })

  it('should call setSearchQuery when search input changes', () => {
    renderHeader()

    const searchInput = screen.getByPlaceholderText(/search task/i)
    fireEvent.change(searchInput, { target: { value: 'new search term' } })

    expect(mockSetSearchQuery).toHaveBeenCalledWith('new search term')
  })

  it('should open the modal when Add Task button is clicked', () => {
    renderHeader()

    const addButton = screen.getByRole('button', { name: /add task/i })
    fireEvent.click(addButton)

    // Assuming that the modal opens after clicking the button
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should call logout when logout button is clicked', () => {
    renderHeader()

    const logoutButton = screen.getByRole('button', { name: /logout/i })
    fireEvent.click(logoutButton)

    // Ensure the logout function is called
    expect(useAuth0().logout).toHaveBeenCalledTimes(1)
  })
})
