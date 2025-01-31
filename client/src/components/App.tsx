import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { QueryClient, QueryClientProvider } from 'react-query'
import SignIn from './Auth/SignIn'
import Logout from './Auth/Logout'
import TodoList from './Tasks/TodoList'

function App() {
  const domain = 'dev-rgxgx08i1mi7kqfj.us.auth0.com'
  const clientId = '42wrmxKCyo7XBWluUOtrEdkKopJeZf9O'
  const redirectUri = 'http://localhost:5173/list'

  const queryClient = new QueryClient()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full rounded-lg">
        <Auth0Provider
          domain={domain}
          clientId={clientId}
          authorizationParams={{ redirect_uri: redirectUri }}
        >
          <QueryClientProvider client={queryClient}>
            <Router>
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/list" element={<TodoList />} />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </Router>
          </QueryClientProvider>
        </Auth0Provider>
      </div>
    </div>
  )
}

export default App
