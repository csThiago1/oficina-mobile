import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { OrdemServico } from '../types/os'
import { getOSList } from '../storage/osStorage'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'ListaOS'>


export default function OSListScreen() {
  const [ordens, setOrdens] = useState<OrdemServico[]>([])
  const navigation = useNavigation<NavigationProps>()

  // Carrega as OSs ao abrir a tela
  useEffect(() => {
    carregarOrdens()
    // Recarrega ao voltar para a tela
    const unsubscribe = navigation.addListener('focus', carregarOrdens)
    return unsubscribe
  }, [])

  async function carregarOrdens() {
    const lista = await getOSList()
    setOrdens(lista)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ordens de Serviço</Text>

      <FlatList
        data={ordens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('OSDetail', { id: item.id })}
                >
              <Text style={styles.cliente}>{item.cliente}</Text>
              <Text>{item.veiculo}</Text>
              <Text>Status: {item.status}</Text>
            </TouchableOpacity>
          )}
          
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('NovaOS')}
              >
        <Text style={styles.botaoTexto}>+ Nova OS</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  card: { backgroundColor: '#eee', padding: 15, marginBottom: 10, borderRadius: 8 },
  cliente: { fontSize: 16, fontWeight: 'bold' },
  botao: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: { color: 'white', fontWeight: 'bold' },
})
