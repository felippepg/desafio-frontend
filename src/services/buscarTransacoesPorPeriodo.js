import { api } from './api';

export const buscaTodasTransacoesPorPeriodo = async (
  dataInicial,
  dataFinal
) => {
  const response = await api.get(
    `/transacao/periodo-data?data-inicial=${dataInicial}&data-final=${dataFinal}`
  );
  return response.data;
};
