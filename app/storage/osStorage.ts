import AsyncStorage from '@react-native-async-storage/async-storage'
import { OrdemServico } from '../types/os'

// Chave que vamos usar no AsyncStorage
const STORAGE_KEY = '@ordens_servico'

// Salva a lista completa de OSs
export async function saveOSList(osList: OrdemServico[]) {
  const json = JSON.stringify(osList)
  await AsyncStorage.setItem(STORAGE_KEY, json)
}

// Busca a lista completa de OSs
export async function getOSList(): Promise<OrdemServico[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY)
  return json ? JSON.parse(json) : []
}

// Adiciona uma nova OS à lista existente
export async function addOS(novaOS: OrdemServico) {
  const lista = await getOSList()
  lista.push(novaOS)
  await saveOSList(lista)
}

// Remove uma OS por ID
export async function deleteOS(id: string) {
  const lista = await getOSList()
  const novaLista = lista.filter(os => os.id !== id)
  await saveOSList(novaLista)
}
