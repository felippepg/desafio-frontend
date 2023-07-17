import { api } from './api';

export const buscaTodasTransacoes = async () => {
  const response = await api.get('transacao');
  return response.data;
};
