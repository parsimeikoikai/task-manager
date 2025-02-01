import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import { QueryClient, QueryClientProvider } from 'react-query'
import SignIn from './Auth/SignIn'
import Logout from './Auth/Logout'
import TodoList from './Tasks/TodoList'

function App() {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
  const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI
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
