import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from '../contexts/AuthContext'
import { ActivityIndicator, View } from 'react-native'
import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import OSListScreen from '../screens/OSListScreen'
import OSFormScreen from '../screens/OSFormScreen' // próxima etapa
import OSDetailScreen from '../screens/OSDetailScreen'
import ChecklistEntradaScreen from '../screens/ChecklistEntradaScreen'
import ChecklistVisualScreen from '../screens/ChecklistVisualScreen'



const Stack = createNativeStackNavigator()

export default function Routes() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Home" component={OSListScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
        <Stack.Screen name="ListaOS" component={OSListScreen} />
        <Stack.Screen name="NovaOS" component={OSFormScreen} />
        <Stack.Screen name="OSDetail" component={OSDetailScreen} />
        <Stack.Screen name="ChecklistEntrada" component={ChecklistEntradaScreen} />
        <Stack.Screen name="ChecklistVisual" component={ChecklistVisualScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
