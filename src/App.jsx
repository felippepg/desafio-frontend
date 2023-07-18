import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './main.css';
import StyledDatePicker from './components/StyledDatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { buscaTodasTransacoes } from './services/buscaTodasTransacoes';
import BasicTable from './components/Table';
import { api } from './services/api';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { formatarDataFinal, formatarDataInicio } from './services/formatarData';

dayjs.locale('pt-br');

// eslint-disable-next-line react/prop-types
function App({ children }) {
  const [transacoes, setTransacoes] = useState();
  const [page, setPage] = useState(0);
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);
  const [nome, setNome] = useState('');

  useEffect(() => {
    (async () => {
      setTransacoes(await buscaTodasTransacoes());
    })();
  }, []);

  async function handleLastPage() {
    const response = await api.get(
      `/transacao?page=${transacoes.totalPages - 1}`
    );
    setTransacoes(response.data);
  }

  async function handleFirstPage() {
    setPage(0);
    const response = await api.get(`/transacao?page=${page}`);
    setTransacoes(response.data);
  }

  async function nextPage() {
    const nextPageValue = page + 1;

    if (nextPageValue < transacoes.totalPages) {
      setPage(nextPageValue);
      const response = await api.get(`/transacao?page=${nextPageValue}`);
      setTransacoes(response.data);
    }
  }

  async function prevPage() {
    if (page > 0) {
      const prevPageValue = page - 1;
      setPage(prevPageValue);
      const response = await api.get(`/transacao?page=${prevPageValue}`);
      setTransacoes(response.data);
    }
  }

  async function handleSubmit() {
    if (dataInicio === null && dataFinal === null && nome.trim() === '') {
      if (transacoes == undefined || transacoes.content.length === 0) {
        const response = await api.get(`/transacao`);
        setTransacoes(response.data);
      }
    }

    const dataInicioFormatada = formatarDataInicio(dataInicio);
    const dataFinalFormatada = formatarDataFinal(dataFinal);

    if (dataInicio !== null && dataFinal !== null) {
      if (dataFinal < dataInicio) {
        console.log('Data final é menor que a data inicial');
      } else {
        const response = await api.get(
          `/transacao/periodo-data?data-inicial=${dataInicioFormatada}&data-final=${dataFinalFormatada}`
        );
        setTransacoes(response.data);
      }
    }

    if (nome.trim().length > 3) {
      if (dataInicio == null && dataFinal == null) {
        const response = await api.get(
          `/transacao/nome-operador?nome-operador=${nome}`
        );
        setTransacoes(response.data);
      }
      if (dataInicio !== null && dataFinal !== null) {
        if (dataInicio < dataFinal) {
          const response = await api.get(
            `/transacao/periodo-data-operador?data-inicial=${dataInicioFormatada}&data-final=${dataFinalFormatada}&operador=${nome}`
          );
          console.log(response.data);
          setTransacoes(response.data);
        }
      }
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="bg-white flex flex-col w-3/4 h-3/4">
          <div className="flex flex-col justify-between p-4 md:flex-row">
            <StyledDatePicker
              locale="pt-BR"
              label="Data de inicio"
              value={dataInicio}
              onChange={(newValue) => setDataInicio(newValue)}
            />
            <StyledDatePicker
              locale="pt-BR"
              label="Data final"
              value={dataFinal}
              onChange={(newValue) => setDataFinal(newValue)}
            />
            <TextField
              onChange={(event) => setNome(event.target.value)}
              InputProps={{
                className: 'lg:w-80',
              }}
            />
          </div>

          <div className="flex justify-center md:justify-end pr-4 pl-4">
            <input
              className="bg-red-500 w-3/5 md:w-1/5 mt-2 mb-2 p-1 rounded text-white"
              type="button"
              value="Pesquisar"
              onClick={() => handleSubmit()}
            />
          </div>

          {transacoes == undefined ? (
            <div className="w-full flex justify-center mt-10">
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            </div>
          ) : (
            <div className="w-full h-full p-4">
              {transacoes.content.length <= 0 ? (
                <p
                  className="w-2/3 bg-red-400 p-2 text-center cursor-pointer"
                  onClick={() => window.location.reload()}
                >
                  Não há registros, clique aqui para visualizar todos
                </p>
              ) : (
                <>
                  <div className="bg-red-500 w-full flex justify-around h-10 p-1 text-white text-xs md:text-sm">
                    <span>
                      Saldo Total: R$ {transacoes.content[0]?.saldoTotal}
                    </span>
                    <span>
                      Saldo no período $R${' '}
                      {transacoes.content[0]?.saldoTotalPeriodo}
                    </span>
                  </div>
                  <BasicTable transacoes={transacoes} />
                  <div className="bg-red-500 w-full flex justify-around h-10 p-1 text-white">
                    <FirstPageIcon
                      className="cursor-pointer"
                      onClick={() => handleFirstPage()}
                    />
                    <KeyboardArrowLeft
                      className="cursor-pointer"
                      onClick={() => prevPage()}
                    />
                    <KeyboardArrowRight
                      className="cursor-pointer"
                      onClick={() => nextPage()}
                    />
                    <LastPageIcon
                      className="cursor-pointer"
                      onClick={() => handleLastPage()}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default App;
