// Representa uma ordem de serviço básica
export type OrdemServico = {
  id: string; // identificador único (UUID)
  cliente: string;
  veiculo: string;
  descricao: string;
  dataCriacao: string;
  placa: string;
  status: "aberta" | "em andamento" | "finalizada";
};
