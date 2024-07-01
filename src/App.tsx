import Router from './Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import './App.module.scss';

const queryClient = new QueryClient();

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Freesentation, Arial, sans-serif',
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
