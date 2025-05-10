import React, { useRef } from 'react'
import { View, Button, StyleSheet, Alert } from 'react-native'
import SignatureCanvas from 'react-native-signature-canvas'

export default function AssinaturaScreen() {
  const ref = useRef<any>()

  const handleOK = (signature: string) => {
    // Aqui você pode salvar a assinatura base64 em uma OS, AsyncStorage, etc
    Alert.alert('Assinatura capturada com sucesso!')
    console.log('assinatura:', signature.slice(0, 30)) // base64 preview
  }

  const handleClear = () => {
    ref.current.clearSignature()
  }

  return (
    <View style={styles.container}>
      <SignatureCanvas
        ref={ref}
        onOK={handleOK}
        autoClear={false}
        descriptionText="Assine abaixo"
        webStyle={`
          .m-signature-pad {
            box-shadow: none; border: none;
          }
          .m-signature-pad--footer {
            display: none;
          }
        `}
      />
      <Button title="Limpar" onPress={handleClear} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
