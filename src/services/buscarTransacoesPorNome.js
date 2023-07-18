import { api } from './api';

export const buscaTodasTransacoesPorNome = async (nome, pagina = false) => {
  if (pagina !== false) {
    const response = await api.get(
      `/transacao/nome-operador?nome-operador=${nome}}&page=${pagina}`
    );
    return response.data;
  } else {
    const response = await api.get(
      `/transacao/nome-operador?nome-operador=${nome}`
    );
    return response.data;
  }
};
