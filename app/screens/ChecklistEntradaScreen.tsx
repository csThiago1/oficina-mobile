import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import SignatureScreen, {
  SignatureViewRef,
} from "react-native-signature-canvas";
import { ChecklistEntrada } from "../types/checklist";
import { salvarChecklist } from "../storage/checklistStorage";

const ITENS_PADRAO = [
  "Farol OK",
  "Lanterna OK",
  "Retrovisor OK",
  "Portas OK",
  "Vidros OK",
  "Pneus OK",
  "Interior OK",
];

type ParamList = {
  ChecklistEntrada: {
    osId: string;
  };
};

export default function ChecklistEntradaScreen() {
  const route = useRoute<RouteProp<ParamList, "ChecklistEntrada">>();
  const navigation = useNavigation();
  const osId = route.params.osId;

  const [itens, setItens] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(ITENS_PADRAO.map((item) => [item, false]))
  );
  const [assinatura, setAssinatura] = useState<string | null>(null);
  const [scrollHabilitado, setScrollHabilitado] = useState(true);
  const signatureRef = useRef<SignatureViewRef>(null);

  const handleToggle = (item: string) => {
    setItens((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleSalvarChecklist = async () => {
    const novoChecklist: ChecklistEntrada = {
      osId,
      itens,
      dataHora: new Date().toISOString(),
    };

    await salvarChecklist(novoChecklist);
    Alert.alert("Checklist salvo com sucesso!");
    navigation.goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={scrollHabilitado}
    >
      <Text style={styles.titulo}>Checklist de Entrada</Text>

      {ITENS_PADRAO.map((item) => (
        <View key={item} style={styles.item}>
          <Text>{item}</Text>
          <Switch
            value={itens[item]}
            onValueChange={() => handleToggle(item)}
          />
        </View>
      ))}

      <View style={styles.assinaturaContainer}>
        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
          Assinatura do Cliente:
        </Text>

        <SignatureScreen
          ref={signatureRef}
          onBegin={() => setScrollHabilitado(false)}
          onEnd={() => setScrollHabilitado(true)}
          onOK={(sig) => setAssinatura(sig)}
          onEmpty={() => Alert.alert("Assinatura vazia")}
          webStyle={`.m-signature-pad--footer { display: none; }`}
          autoClear={false}
        />

        <View style={styles.botoesAssinatura}>
          <Button
            title="Limpar"
            onPress={() => signatureRef.current?.clearSignature()}
          />
          <Button
            title="Salvar Assinatura"
            onPress={() => signatureRef.current?.readSignature()}
          />
        </View>
      </View>

      <Button title="Salvar Checklist" onPress={handleSalvarChecklist} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  assinaturaContainer: {
    marginVertical: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    height: 250,
    backgroundColor: "white",
  },
  botoesAssinatura: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});
