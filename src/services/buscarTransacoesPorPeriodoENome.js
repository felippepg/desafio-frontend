import { api } from './api';

export const buscarTransacoesPorPeriodoENome = async (
  dataInicial,
  dataFinal,
  nome,
  pagina = false
) => {
  if (pagina !== false) {
    const response = await api.get(
      `/transacao/periodo-data-operador?data-inicial=${dataInicial}&data-final=${dataFinal}&operador=${nome}&page=${pagina}`
    );
    return response.data;
  } else {
    const response = await api.get(
      `/transacao/periodo-data-operador?data-inicial=${dataInicial}&data-final=${dataFinal}&operador=${nome}`
    );
    return response.data;
  }
};
