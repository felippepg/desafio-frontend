/* eslint-disable react/prop-types */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import dayjs from 'dayjs';

export default function BasicTable({ transacoes }) {
  function formatDate(dateString) {
    const parsedDate = dayjs(dateString, 'YYYY-MM-DDTHH:mm:ss');
    const formattedDate = parsedDate.format('DD/MM/YYYY');
    return formattedDate;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dados</TableCell>
            <TableCell align="right">Valencia</TableCell>
            <TableCell align="right">Tipo</TableCell>
            <TableCell align="right">Nome do operador transacionado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transacoes.content.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {formatDate(row.dataTransferencia)}
              </TableCell>
              <TableCell align="right">{row.valor}</TableCell>
              <TableCell align="right">{row.tipo}</TableCell>
              <TableCell align="right">{row.nomeOperadorTransacao}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
