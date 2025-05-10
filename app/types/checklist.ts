export type ChecklistEntrada = {
    osId: string
    itens: { [nome: string]: boolean }
    dataHora: string
    assinatura?: string // base64 da assinatura
  }
  