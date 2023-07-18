import { api } from './api';

export const buscaTodasTransacoesPorPeriodo = async (
  dataInicial,
  dataFinal,
  pagina = false
) => {
  if (pagina !== false) {
    const response = await api.get(
      `/transacao/periodo-data?data-inicial=${dataInicial}&data-final=${dataFinal}&page=${pagina}`
    );
    return response.data;
  } else {
    const response = await api.get(
      `/transacao/periodo-data?data-inicial=${dataInicial}&data-final=${dataFinal}`
    );
    return response.data;
  }
};
