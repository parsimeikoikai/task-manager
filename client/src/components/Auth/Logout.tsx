import { useAuth0 } from '@auth0/auth0-react'
export default function Logout() {
  const { logout } = useAuth0()
  return (
    <div className="w-full max-w-md space-y-8">
      <button
        className="mb-4 inline-flex items-center justify-center rounded-lg border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 transition-all duration-300 ease-in-out hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-500"
        onClick={() => logout()}
      >
        Log Out
      </button>
    </div>
  )
}
