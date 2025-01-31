import { useAuth0 } from '@auth0/auth0-react'
export default function Logout() {
  const { logout } = useAuth0()
  return (
    <div className="w-full max-w-md space-y-8">
      <button className="btn" onClick={() => logout()}>
        Log Out
      </button>
    </div>
  )
}
