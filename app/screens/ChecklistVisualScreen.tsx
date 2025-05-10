import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { OrdemServico } from '../types/os'
import { ChecklistEntrada } from '../types/checklist'
import { getOSList } from '../storage/osStorage'
import { getChecklistByOS } from '../storage/checklistStorage'

type ParamList = {
  ChecklistVisual: {
    osId: string
  }
}

export default function ChecklistVisualScreen() {
  const route = useRoute<RouteProp<ParamList, 'ChecklistVisual'>>()
  const [os, setOS] = useState<OrdemServico | null>(null)
  const [checklist, setChecklist] = useState<ChecklistEntrada | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const listaOS = await getOSList()
        const encontrada = listaOS.find(o => o.id === route.params.osId)

        if (!encontrada) {
          console.warn('❌ OS não encontrada:', route.params.osId)
        } else {
          setOS(encontrada)
        }

        const checklistSalvo = await getChecklistByOS(route.params.osId)

        if (!checklistSalvo) {
          console.warn('⚠️ Checklist não encontrado para:', route.params.osId)
        } else {
          setChecklist(checklistSalvo)
        }
      } catch (error) {
        console.error('Erro ao carregar dados do checklist:', error)
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [route.params.osId])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Carregando informações...</Text>
      </View>
    )
  }

  if (!os || !checklist) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: 'red', textAlign: 'center' }}>
          Dados não encontrados. Certifique-se de que o checklist foi salvo corretamente.
        </Text>
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>📋 Checklist de Entrada</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Cliente:</Text>
        <Text>{os.cliente}</Text>

        <Text style={styles.label}>Veículo:</Text>
        <Text>{os.veiculo}</Text>

        <Text style={styles.label}>Descrição:</Text>
        <Text>{os.descricao}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text>{os.status}</Text>

        <Text style={styles.label}>Criada em:</Text>
        <Text>{new Date(os.dataCriacao).toLocaleString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Itens do Checklist:</Text>
        {Object.entries(checklist.itens).map(([item, marcado]) => (
          <Text key={item}>
            • {item}: {marcado ? '✔️' : '❌'}
          </Text>
        ))}

        <Text style={styles.label}>Data/Hora da Captura:</Text>
        <Text>{new Date(checklist.dataHora).toLocaleString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Assinatura do Cliente:</Text>
        {checklist.assinatura ? (
          <>
            <Image
              source={{ uri: checklist.assinatura }}
              style={styles.assinatura}
              resizeMode="contain"
            />
            <Text style={styles.nomeClienteBarra}>{os.cliente}</Text>
          </>
        ) : (
          <Text style={{ fontStyle: 'italic', color: 'gray' }}>
            Assinatura não capturada.
          </Text>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  assinatura: {
    width: '100%',
    height: 180,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
  nomeClienteBarra: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginTop: -10,
  },
})
