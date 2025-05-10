import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

interface AssinaturaVisualProps {
  assinatura: string // base64
  nomeCliente: string
}

export const AssinaturaVisual = ({ assinatura, nomeCliente }: AssinaturaVisualProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.areaAssinatura}>
        <Image
          source={{ uri: assinatura }}
          style={styles.imagemAssinatura}
          resizeMode="contain"
        />
        <View style={styles.linha} />
        <Text style={styles.nome}>{nomeCliente}</Text>
        <Text style={styles.cargo}>Cliente</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  areaAssinatura: {
    width: 300,
    height: 180,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'flex-end',
    padding: 10,
    position: 'relative',
    backgroundColor: '#fff',
  },
  imagemAssinatura: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 40,
  },
  linha: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 10,
  },
  nome: {
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
  },
  cargo: {
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
  },
})
