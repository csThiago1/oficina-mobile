import { View, Text, Button } from 'react-native'
import { useAuth } from '../contexts/AuthContext'

export default function HomeScreen() {
  const { logout, user } = useAuth()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bem-vindo, {user?.nome}!</Text>
      <Button title="Sair" onPress={logout} />
    </View>
  )
}
