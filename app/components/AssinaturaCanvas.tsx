import React, { useRef } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import SignatureScreen from 'react-native-signature-canvas'

type Props = {
  onSave: (assinatura: string) => void
  onClear?: () => void
}

export const AssinaturaCanvas = ({ onSave, onClear }: Props) => {
  const ref = useRef<any>()

  const handleOK = (signature: string) => {
    onSave(signature) // assinatura em base64
  }

  return (
    <View style={styles.container}>
      <SignatureScreen
        ref={ref}
        onOK={handleOK}
        onClear={onClear}
        descriptionText="Assine abaixo"
        clearText="Limpar"
        confirmText="Salvar"
        webStyle={`
          .m-signature-pad--footer {
            display: flex;
            justify-content: space-between;
          }
        `}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height * 0.5,
  },
})
