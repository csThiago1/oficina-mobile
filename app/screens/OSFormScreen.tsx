import React, { useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native'
import { OrdemServico } from '../types/os'
import { addOS } from '../storage/osStorage'
import { useNavigation } from '@react-navigation/native'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

export default function OSFormScreen() {
  const navigation = useNavigation()
  const [cliente, setCliente] = useState('')
  const [veiculo, setVeiculo] = useState('')
  const [descricao, setDescricao] = useState('')

  const handleSalvar = async () => {
    if (!cliente || !veiculo || !descricao) {
      Alert.alert('Preencha todos os campos!')
      return
    }

    const novaOS: OrdemServico = {
      id: uuidv4(), // gera ID único
      cliente,
      veiculo,
      descricao,
      dataCriacao: new Date().toISOString(),
      status: 'aberta',
    }

    await addOS(novaOS)
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova Ordem de Serviço</Text>

      <TextInput
        placeholder="Nome do Cliente"
        value={cliente}
        onChangeText={setCliente}
        style={styles.input}
      />
      <TextInput
        placeholder="Veículo"
        value={veiculo}
        onChangeText={setVeiculo}
        style={styles.input}
      />
      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        style={[styles.input, { height: 80 }]}
      />

      <Button title="Salvar OS" onPress={handleSalvar} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
})
