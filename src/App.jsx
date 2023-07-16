// import { useEffect } from 'react';
// import { api } from './services/api';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './main.css';
import StyledDatePicker from './components/StyledDatePicker';
import { TextField } from '@mui/material';
import Table from './components/Table';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

dayjs.locale('pt-br');

// eslint-disable-next-line react/prop-types
function App({ children }) {
  // useEffect(() => {
  //   api
  //     .get('transacao')
  //     .then((response) => console.log(response.data))
  //     .catch((error) => console.log(error));
  // });
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="bg-white flex flex-col w-3/4 h-3/4">
          <div className="flex flex-col justify-between p-4 md:flex-row">
            <StyledDatePicker locale="pt-BR" label="Data de inicio" />
            <StyledDatePicker locale="pt-BR" label="Data final" />
            <TextField
              InputProps={{
                className: 'lg:w-80', // Defina a altura desejada aqui, como 'h-12'
              }}
            />
          </div>

          <div className="flex justify-center md:justify-end pr-4 pl-4">
            <input
              className="bg-red-500 w-3/5 md:w-1/5 mt-2 mb-2 p-1 rounded text-white"
              type="button"
              value="Pesquisar"
            />
          </div>

          <div className="w-full h-full p-4">
            <div className="bg-red-500 w-full flex justify-around h-10 p-1 text-white text-xs md:text-sm">
              <span>Saldo Total: R$ 500, 00</span>
              <span>Saldo no período $R$ 50, 00</span>
            </div>
            <Table />
            <div className="bg-red-500 w-full flex justify-around h-10 p-1 text-white">
              <FirstPageIcon />
              <KeyboardArrowLeft />
              <KeyboardArrowRight />
              <LastPageIcon />
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default App;
