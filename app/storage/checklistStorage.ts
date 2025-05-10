import AsyncStorage from '@react-native-async-storage/async-storage'
import { ChecklistEntrada } from '../types/checklist'

const STORAGE_KEY = '@checklists_entrada'

export async function getChecklists(): Promise<ChecklistEntrada[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY)
  return json ? JSON.parse(json) : []
}

export async function salvarChecklist(novo: ChecklistEntrada) {
  console.log('💾 Salvando checklist para OS:', novo.osId)
  const todos = await getChecklists()
  const atualizados = todos.filter(c => c.osId !== novo.osId)
  atualizados.push(novo)
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizados))
}


export async function getChecklistByOS(osId: string): Promise<ChecklistEntrada | null> {
  const json = await AsyncStorage.getItem(STORAGE_KEY)
  if (!json) return null

  const checklists: ChecklistEntrada[] = JSON.parse(json)
  console.log('📦 Buscando checklist para OS ID:', osId)
  console.log('🧾 Checklists disponíveis:', checklists.map(c => c.osId))

  const encontrado = checklists.find(c => c.osId === osId)
  if (!encontrado) console.warn('⚠️ Checklist não encontrado para:', osId)
  return encontrado || null
}
