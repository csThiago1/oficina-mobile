import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type User = {
  id: string
  nome: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem('@user')
      if (stored) setUser(JSON.parse(stored))
      setLoading(false)
    }
    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    // Mock de autenticação
    if (email === 'admin@teste.com' && password === '1234') {
      const userData = { id: '1', nome: 'Admin', email }
      setUser(userData)
      await AsyncStorage.setItem('@user', JSON.stringify(userData))
    } else {
      throw new Error('Usuário ou senha inválidos')
    }
  }

  const logout = async () => {
    await AsyncStorage.removeItem('@user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
