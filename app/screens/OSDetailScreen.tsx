import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native'
import { OrdemServico } from '../types/os'
import { ChecklistEntrada } from '../types/checklist'
import { getOSList } from '../storage/osStorage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation'
import { getChecklistByOS } from '../storage/checklistStorage'

type ParamList = {
  OSDetail: {
    id: string
  }
}

export default function OSDetailScreen() {
  const route = useRoute<RouteProp<ParamList, 'OSDetail'>>()
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>() // <-- DEVE FICAR AQUI NO TOPO!

  const [os, setOS] = useState<OrdemServico | null>(null)
  const [checklist, setChecklist] = useState<ChecklistEntrada | null>(null)

  useEffect(() => {
    async function carregarDados() {
      const listaOS = await getOSList()
      const encontrada = listaOS.find(o => o.id === route.params.id)
      if (encontrada) setOS(encontrada)

      const checklistSalvo = await getChecklistByOS(route.params.id)
      if (checklistSalvo) setChecklist(checklistSalvo)
    }

    carregarDados()
  }, [])


  if (!os) return <Text style={{ padding: 20 }}>Carregando OS...</Text>

  const abrirChecklist = () => {
    if (checklist) {
      navigation.navigate('ChecklistVisual', { osId: os.id })
    } else {
      navigation.navigate('ChecklistEntrada', { osId: os.id })
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes da OS</Text>
      <Text><Text style={styles.label}>Cliente:</Text> {os.cliente}</Text>
      <Text><Text style={styles.label}>Veículo:</Text> {os.veiculo}</Text>
      <Text><Text style={styles.label}>Descrição:</Text> {os.descricao}</Text>
      <Text><Text style={styles.label}>Status:</Text> {os.status}</Text>
      <Text><Text style={styles.label}>Criada em:</Text> {new Date(os.dataCriacao).toLocaleString()}</Text>

      {checklist && (
        <View style={{ marginTop: 30 }}>
          <Text style={styles.titulo}>Checklist de Entrada</Text>
          {Object.entries(checklist.itens).map(([item, marcado]) => (
            <Text key={item}>• {item}: {marcado ? '✔️' : '❌'}</Text>
          ))}
          <Text style={{ marginTop: 10 }}>
            <Text style={styles.label}>Data/Hora:</Text> {new Date(checklist.dataHora).toLocaleString()}
          </Text>
          <Text style={{ marginTop: 10, fontStyle: 'italic', color: 'green' }}>
            Assinatura capturada ✔
          </Text>
        </View>
      )}

<View style={{ marginTop: 30 }}>
  {!checklist ? (
    <TouchableOpacity style={styles.botao} onPress={() =>
      navigation.navigate('ChecklistEntrada', { osId: os.id })
    }>
      <Text style={styles.botaoTexto}>Iniciar Checklist de Entrada</Text>
    </TouchableOpacity>
  ) : (
    <>
      <TouchableOpacity style={styles.botao} onPress={() =>
        navigation.navigate('ChecklistVisual', { osId: os.id })
      }>
        <Text style={styles.botaoTexto}>Visualizar Checklist</Text>
      </TouchableOpacity>

      {/* Futuramente podemos ativar esse botão também */}
      {/* 
      <TouchableOpacity style={[styles.botao, { backgroundColor: '#ff9500' }]} onPress={() =>
        navigation.navigate('ChecklistEntrada', { osId: os.id })
      }>
        <Text style={styles.botaoTexto}>Refazer Checklist</Text>
      </TouchableOpacity> 
      */}
    </>
  )}
</View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  label: { fontWeight: 'bold' },
  botao: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  botaoTexto: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
