import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { RootStackParamList } from "../types/navigation";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import OSListScreen from "../screens/OSListScreen";
import OSFormScreen from "../screens/OSFormScreen";
import OSDetailScreen from "../screens/OSDetailScreen";
import ChecklistEntradaScreen from "../screens/ChecklistEntradaScreen";
import ChecklistVisualScreen from "../screens/ChecklistVisualScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // Rotas autenticadas
          <>
            <Stack.Screen
              name="ListaOS"
              component={OSListScreen}
              options={{ title: "Ordens de Serviço" }}
            />
            <Stack.Screen
              name="NovaOS"
              component={OSFormScreen}
              options={{ title: "Nova OS" }}
            />
            <Stack.Screen
              name="OSDetail"
              component={OSDetailScreen}
              options={{ title: "Detalhes da OS" }}
            />
            <Stack.Screen
              name="ChecklistEntrada"
              component={ChecklistEntradaScreen}
              options={{ title: "Checklist de Entrada" }}
            />
            <Stack.Screen
              name="ChecklistVisual"
              component={ChecklistVisualScreen}
              options={{ title: "Visualizar Checklist" }}
            />
          </>
        ) : (
          // Rotas públicas (não autenticadas)
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
