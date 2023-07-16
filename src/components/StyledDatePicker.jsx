import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers';

const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
  '& .MuiInputBase-root': {
    marginBottom: '2px',
    // height: '36px',
    marginRight: '3px',
    [theme.breakpoints.up('md')]: {
      marginBottom: '0',
    },
  },
}));

export default StyledDatePicker;
