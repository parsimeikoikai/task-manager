import { useAuth0 } from '@auth0/auth0-react'

export default function SignIn() {
  const { loginWithRedirect } = useAuth0()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-xl border-2 border-gray-200 bg-white p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <h4 className="mb-2 text-xl font-extrabold text-gray-800">
            Welcome to Your To-Do List
          </h4>
          <p className="text-lg text-gray-600">Sign in to manage your tasks</p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="flex justify-center">
            <button
              className="mb-4 inline-flex items-center justify-center rounded-lg border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-500"
              onClick={() => loginWithRedirect()}
            >
              Sign In with Auth0
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
