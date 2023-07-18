import dayjs from 'dayjs';

const formatoDesejado = 'YYYY-MM-DD';

export const formatarDataInicio = (dataInicio) => {
  return dayjs(dataInicio).format(formatoDesejado);
};

export const formatarDataFinal = (dataFinal) => {
  return dayjs(dataFinal).format(formatoDesejado);
};
