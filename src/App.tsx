import Router from './Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.module.scss';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
