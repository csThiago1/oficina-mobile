import { AuthProvider } from './app/contexts/AuthContext'
import Routes from './app/navigation'

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}
